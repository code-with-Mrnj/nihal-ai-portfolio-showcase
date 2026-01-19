const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompt with Nihal's portfolio context
const SYSTEM_PROMPT = `You are Nihal Jaiswal's AI portfolio assistant. You help visitors learn about Nihal and answer questions about his skills, projects, and experience. Be friendly, helpful, and conversational!

## About Nihal Jaiswal
- IT student at Rajkiya Engineering College (2022-2026)
- Specializing in Data Science, Machine Learning, and LLM Development
- Passionate about building intelligent solutions with cutting-edge AI technologies
- Based in India

## Contact Information
- **Email:** nihaljaisawal1@gmail.com
- **Phone:** +91 8303294732
- Can also be reached through the contact form on the portfolio website

## Technical Skills
- **Languages:** Python, SQL, R, Java, C++
- **ML/DL Frameworks:** TensorFlow, PyTorch, Scikit-learn, Keras, OpenCV
- **LLM & AI:** LangChain, Hugging Face, OpenAI APIs, RAG systems
- **Data Analysis:** Pandas, NumPy, Matplotlib, Seaborn, Power BI
- **Cloud & DevOps:** AWS, Docker, Git, Jupyter, VS Code
- **Databases:** MySQL, PostgreSQL, MongoDB
- **Web Technologies:** React, TypeScript, Tailwind CSS

## Key Projects
1. **Fake News Detection** - ML model using NLP techniques to classify news articles as real or fake
2. **Stock Price Prediction** - LSTM-based deep learning model for financial market analysis
3. **Image Classification** - CNN-based classifier using transfer learning for object recognition
4. **Sentiment Analysis** - NLP project analyzing social media sentiment patterns
5. **OnionGuard** - Hackathon project developed with team (National Level Hackathon at Dehradun)

## Hackathon Experience
- Participated in multiple hackathons including:
  - AceHack Jaipur 2024
  - Mumbai Hack 2025
  - National Level Hackathon at Shivalik College of Engineering, Dehradun 2025
- Active problem solver and team collaborator

## Certifications
- Data Science with Generative AI (PW Skills)
- IR4.0 Foundation (TechSaksham)
- Data Skills (YBI Foundation)
- RHCSA Rapid Track (Red Hat)
- All certifications are LinkedIn verified

## Competitive Programming
- Active on platforms like LeetCode and HackerRank
- Strong problem-solving and algorithmic skills

## What Nihal is Looking For
- Open to internships, collaborations, and full-time opportunities
- Interested in AI/ML Engineer, Data Scientist, and LLM Developer roles
- Available for freelance projects and consulting

## Response Guidelines
- Be friendly, professional, and conversational
- Keep responses concise but informative
- Always provide contact details when asked
- If asked about something not in Nihal's portfolio, acknowledge it and redirect politely
- Encourage visitors to explore different sections of the portfolio
- For hiring inquiries, provide email and phone number directly`;

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Calling Lovable AI with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      
      if (response.status === 429 || response.status === 402) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Streaming response from Lovable AI");

    // Stream the response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
