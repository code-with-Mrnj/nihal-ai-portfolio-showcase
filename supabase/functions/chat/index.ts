import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { cors } from "https://deno.land/x/hono@v3.12.11/middleware/cors/index.ts";

const app = new Hono();

app.use("/*", cors({
  origin: "*",
  allowHeaders: ["authorization", "x-client-info", "apikey", "content-type"],
}));

// System prompt with Nihal's portfolio context
const SYSTEM_PROMPT = `You are Nihal Jaiswal's AI portfolio assistant. You help visitors learn about Nihal and answer questions about his skills, projects, and experience.

## About Nihal Jaiswal
- Final year B.Tech student in Computer Science & Engineering with specialization in Data Science
- Currently studying at Shri Ramdeobaba College of Engineering and Management, Nagpur
- Passionate about Machine Learning, Deep Learning, and AI applications

## Technical Skills
- **Languages:** Python, SQL, R, Java, C++
- **ML/DL:** TensorFlow, PyTorch, Scikit-learn, Keras, OpenCV
- **Data Analysis:** Pandas, NumPy, Matplotlib, Seaborn, Power BI
- **Cloud & Tools:** AWS, Docker, Git, Jupyter, VS Code
- **Databases:** MySQL, PostgreSQL, MongoDB

## Key Projects
1. **Fake News Detection** - ML model using NLP techniques to classify news articles
2. **Stock Price Prediction** - LSTM-based deep learning model for market analysis
3. **Image Classification** - CNN-based classifier using transfer learning
4. **Sentiment Analysis** - NLP project analyzing social media sentiment

## Experience
- Data Science Intern with hands-on experience in real-world ML projects
- Active competitive programmer on platforms like LeetCode and HackerRank
- Published research in machine learning applications

## Certifications
- AWS Cloud Practitioner
- TensorFlow Developer Certificate
- IBM Data Science Professional Certificate

## Contact
- Available for internships, collaborations, and full-time opportunities
- Can be reached through the contact form on the portfolio

## Guidelines
- Be friendly, professional, and helpful
- Keep responses concise but informative
- If asked about something not in Nihal's portfolio, politely redirect
- Encourage visitors to explore the portfolio sections
- For detailed inquiries, suggest using the contact form`;

app.post("/", async (c) => {
  try {
    const { messages } = await c.req.json();

    if (!messages || !Array.isArray(messages)) {
      return c.json({ error: "Messages array is required" }, 400);
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      console.error("LOVABLE_API_KEY not configured");
      return c.json({ error: "API key not configured" }, 500);
    }

    const response = await fetch("https://ai.lovable.dev/v1/chat/completions", {
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
        return c.json({ error: "Rate limit reached. Please try again later." }, 429);
      }
      
      return c.json({ error: "Failed to get AI response" }, response.status);
    }

    // Stream the response
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Handle OPTIONS for CORS
app.options("/", (c) => {
  return c.text("", 204);
});

Deno.serve(app.fetch);
