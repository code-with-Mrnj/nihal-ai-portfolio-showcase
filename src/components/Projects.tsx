import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github, FileText, LayoutDashboard, Play, Box } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

type ExtraLink = { label: "Paper" | "Dashboard" | "Live Demo" | "Model"; url: string };
type Project = {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  featured?: boolean;
  research?: boolean;
  tagline?: string;
  problem?: string;
  approach?: string;
  outcome?: string;
  extraLinks?: ExtraLink[];
};

const projects: Project[] = [
  {
    title: "Agrotech (Rain Prediction Model)",
    description: "Random Forest model to forecast rainfall. Agricultural technology solution for weather prediction to help farmers make informed decisions.",
    technologies: ["Random Forest", "Agriculture", "Machine Learning", "Python"],
    github: "https://github.com/Nihal108-bi/agrotech",
    featured: true
  },
  {
    title: "Ask Me Anything (LangChain QA Bot)",
    description: "LangChain-based QA on uploaded documents. Upload any document and ask questions to get intelligent answers powered by LLMs.",
    technologies: ["LangChain", "RAG", "Python", "NLP"],
    github: "https://github.com/Nihal108-bi/Ask-me-Anything",
    featured: true
  },
  {
    title: "Data Analyst Agent (LLM)",
    description: "LangChain + PandasAI for CSV data insights. An intelligent agent that can analyze and provide insights from CSV data using natural language processing.",
    technologies: ["LangChain", "PandasAI", "Python", "Data Analysis"],
    github: "https://github.com/Nihal108-bi/Data_Analyst_Agent",
    featured: true
  },
  {
    title: "Binance Futures Trading Bot",
    description: "Automated trading bot for Binance futures market with risk management and strategy implementation.",
    technologies: ["Python", "Trading", "API", "Finance"],
    github: "https://github.com/Nihal108-bi/Binance-Futures-Trading-Bot---Python-Developer-Assignment",
    featured: false
  },
  {
    title: "Cryptocurrency Prediction Model",
    description: "Machine learning model for predicting cryptocurrency price movements using historical data and technical indicators.",
    technologies: ["Machine Learning", "Crypto", "Python", "Data Analysis"],
    github: "https://github.com/Nihal108-bi/CriptoCurrancy_prediction-_model",
    featured: false
  },
  {
    title: "Cross-Lingual NLP System",
    description: "Natural language processing system that works across multiple languages for text analysis and translation.",
    technologies: ["NLP", "Multilingual", "Python", "AI"],
    github: "https://github.com/Nihal108-bi/Cross-lingual-NLP-System",
    featured: false
  },
  {
    title: "Customized Chatbot for Data Science",
    description: "Specialized chatbot designed to answer data science related questions with domain-specific knowledge.",
    technologies: ["Chatbot", "Data Science", "NLP", "Python"],
    github: "https://github.com/Nihal108-bi/customized-chatbot-for-datascience-related-questions",
    featured: false
  },
  {
    title: "Diamond Price Prediction",
    description: "Machine learning model to predict diamond prices based on various characteristics and market factors.",
    technologies: ["Machine Learning", "Regression", "Python", "Data Analysis"],
    github: "https://github.com/Nihal108-bi/DiamondPricePrediction2",
    featured: false
  },
  {
    title: "Hate Speech Detection in Social Media",
    description: "AI system to detect and classify hate speech in social media posts using advanced NLP techniques.",
    technologies: ["NLP", "Classification", "Social Media", "Python"],
    github: "https://github.com/Nihal108-bi/Hate-Speech-Detection-in-Social-Media-using-Python",
    featured: false
  },
  {
    title: "Myntra Review Sentiment Analysis",
    description: "NLP system to analyze customer sentiment from Myntra product reviews for business insights.",
    technologies: ["NLP", "Sentiment Analysis", "Python", "Web Scraping"],
    github: "https://github.com/Nihal108-bi/Myntra_review",
    featured: false
  },
  {
    title: "NER-Powered Sports Certificate Analyzer",
    description: "Named Entity Recognition system for analyzing and extracting information from sports certificates.",
    technologies: ["NER", "Document Analysis", "Python", "Sports"],
    github: "https://github.com/Nihal108-bi/NER-powered-Sports-Certificate-Analyzer",
    featured: false
  },
  {
    title: "Number Plate Detection",
    description: "Computer vision system for automatic number plate detection and recognition using OpenCV.",
    technologies: ["Computer Vision", "OpenCV", "Python", "Detection"],
    github: "https://github.com/Nihal108-bi/Number-Plate-detection",
    featured: false
  },
  {
    title: "Offline MCP Educational Server",
    description: "Educational server implementation for offline learning and content management platform.",
    technologies: ["Server", "Education", "Python", "Backend"],
    github: "https://github.com/Nihal108-bi/offline-mcp-educational-server",
    featured: false
  },
  {
    title: "Pneumonia Detection using Deep Learning",
    description: "Deep learning model for medical image analysis to detect pneumonia from chest X-rays with high accuracy.",
    technologies: ["Deep Learning", "Medical AI", "TensorFlow", "Healthcare"],
    github: "https://github.com/Nihal108-bi/Pneumonia-Detection_using_DL",
    featured: false
  },
  {
    title: "Sensor Fault Detection",
    description: "Machine learning system for detecting faults and anomalies in sensor data for predictive maintenance.",
    technologies: ["Machine Learning", "IoT", "Anomaly Detection", "Python"],
    github: "https://github.com/Nihal108-bi/sensorfault-detection",
    featured: false
  },
  {
    title: "Sign Language Detection with Random Forest",
    description: "Computer vision system for detecting sign language gestures using Random Forest classification.",
    technologies: ["Computer Vision", "Random Forest", "OpenCV", "Python"],
    github: "https://github.com/Nihal108-bi/Sign-language-detection-using-random-forest",
    featured: false
  },
  {
    title: "Soccer Player Re-identification",
    description: "AI system for re-identifying soccer players from single video feed using computer vision techniques.",
    technologies: ["Computer Vision", "Sports Analytics", "Video Processing", "AI"],
    github: "https://github.com/Nihal108-bi/Soccer-Player-Re-Identification-from-Single-Video-Feed",
    featured: false
  },
  // ---------------- NEW PROJECTS ----------------
  {
    title: "T2I-BiasBench: AI Fairness Auditing Framework",
    tagline: "Research framework for auditing bias in text-to-image diffusion models.",
    problem: "Diffusion models inherit and amplify societal biases (beauty, gender, race), but standardized fairness benchmarks for text-to-image systems are scarce.",
    approach: "Built a reproducible fairness auditing framework evaluating 4 diffusion models across 1,574 generated images and 13 metrics — including 6 novel measures such as a Hallucination Score. Comparative dashboards visualize bias dimensions side-by-side.",
    outcome: "Surfaced a 12× reduction in beauty bias under RLHF-aligned models; published as a research paper with public dashboard and reproducible evaluation pipeline.",
    description: "Research framework for auditing bias in text-to-image diffusion models.",
    technologies: ["LLMs", "Diffusion Models", "Computer Vision", "AI Fairness", "RLHF"],
    github: "https://github.com/Nihal108-bi/T2I-BiasBench-A-Multi-Metric-Framework-for-Auditing-Demographic-and-Cultural-Bias-in-Text-to-Image-",
    research: true,
    extraLinks: [
      { label: "Dashboard", url: "https://nihal108-bi.github.io/T2I-BiasBench-A-Multi-Metric-Framework-for-Auditing-Demographic-and-Cultural-Bias-in-Text-to-Image-/" },
      { label: "Paper", url: "https://arxiv.org/abs/2604.12481" },
    ],
  },
  {
    title: "Real-Time Voice AI Agent with RAG",
    tagline: "Sub-2s end-to-end voice assistant unifying speech, retrieval, and reasoning.",
    problem: "Most voice assistants either lack grounding in custom knowledge or suffer from multi-second latency that breaks conversational flow.",
    approach: "Architected a streaming pipeline combining Deepgram (STT), MongoDB Atlas Vector Search with semantic chunking, function calling, Groq LLM inference, and ElevenLabs (TTS) — orchestrated over FastAPI WebSockets and Pipecat streaming.",
    outcome: "Delivered sub-2-second voice round-trips with grounded retrieval over technical docs; production-ready architecture.",
    description: "Sub-2s end-to-end voice assistant unifying speech, retrieval, and reasoning.",
    technologies: ["FastAPI", "Deepgram", "ElevenLabs", "MongoDB Atlas", "Pipecat"],
    github: "https://github.com/Nihal108-bi/Realtime-Voice-Ai-agent-with-RAG",
    featured: true,
  },
  {
    title: "CrewAI Financial Analyst Agent",
    tagline: "Multi-agent system for autonomous financial research and investment signaling.",
    problem: "Manual financial research is slow, fragmented, and hard to scale across hundreds of daily market events.",
    approach: "Built a CrewAI multi-agent pipeline processing 500+ daily market records, generating sentiment-driven investment signals. Persistence via Azure Blob Storage, reporting through PostgreSQL, visualization via Streamlit, and APIs through FastAPI.",
    outcome: "Reduced manual research effort by 80% with end-to-end autonomous market analysis.",
    description: "Multi-agent system for autonomous financial research and investment signaling.",
    technologies: ["CrewAI", "FastAPI", "Azure", "PostgreSQL", "Multi-Agent"],
    github: "https://github.com/Nihal108-bi/creawai-agent-azure",
    featured: true,
  },
  {
    title: "HR Policy RAG Chatbot",
    tagline: "Enterprise HR knowledge assistant with grounded retrieval.",
    problem: "HR teams spend significant time answering repeat policy questions; generic LLMs hallucinate on company-specific policies.",
    approach: "Built with LangChain and FAISS, with refined chunking and re-ranking strategies to elevate grounding across policy corpora. Containerized with Docker and deployed on Hugging Face Spaces.",
    outcome: "Live, low-latency policy chatbot aligned with enterprise knowledge-assistant use cases.",
    description: "Enterprise HR knowledge assistant with grounded retrieval.",
    technologies: ["LangChain", "FAISS", "Hugging Face", "Docker", "RAG"],
    github: "https://github.com/Nihal108-bi/HR-Policy-RAG-Chatbot",
    extraLinks: [
      { label: "Live Demo", url: "https://huggingface.co/spaces/Nihal108-bi/HR-Policy-RAG-Chatbot" },
    ],
  },
  {
    title: "Whisper Hindi ASR (Fine-Tuned)",
    tagline: "Fine-tuned multilingual speech-to-text model for noisy Hindi audio.",
    problem: "Off-the-shelf ASR models struggle with noisy, accented Hindi audio — a major gap for Indian users.",
    approach: "Fine-tuned OpenAI Whisper on the Hindi FLEURS dataset with a WER-driven error taxonomy. Released publicly on Hugging Face with a Gradio demo for real-time inference.",
    outcome: "Published Hugging Face model with 44+ downloads; live Gradio Space delivering real-time Hindi speech-to-text.",
    description: "Fine-tuned multilingual speech-to-text model for noisy Hindi audio.",
    technologies: ["Whisper", "Hugging Face", "PyTorch", "Gradio", "ASR"],
    github: "https://github.com/Nihal108-bi/Hindi-ASR-Whisper-Pipeline",
    extraLinks: [
      { label: "Model", url: "https://huggingface.co/Nihal108-bi/whisper-hindi-noisy" },
    ],
  },
  {
    title: "Network Security Phishing Detection — MLOps",
    tagline: "Production-grade MLOps pipeline for phishing URL detection.",
    problem: "ML models drift in production; phishing patterns evolve fast, and most projects lack monitoring or retraining discipline.",
    approach: "Built an MLflow-tracked detection pipeline with KS-test drift monitoring across retraining cycles. CI/CD on GitHub Actions; containerized with Docker and deployed to AWS ECR/EC2 with audit-ready production discipline.",
    outcome: "Stable inference with automated drift detection, retraining triggers, and reproducible deployments.",
    description: "Production-grade MLOps pipeline for phishing URL detection.",
    technologies: ["AWS", "MLflow", "Docker", "FastAPI", "MLOps"],
    github: "https://github.com/Nihal108-bi/AI-Powered-Network-Security-Detection-Pipeline-End-to-End-MLOps-",
  },
];

const extraLinkIcon = (label: ExtraLink["label"]) => {
  switch (label) {
    case "Paper": return <FileText className="h-4 w-4 mr-1" />;
    case "Dashboard": return <LayoutDashboard className="h-4 w-4 mr-1" />;
    case "Live Demo": return <Play className="h-4 w-4 mr-1" />;
    case "Model": return <Box className="h-4 w-4 mr-1" />;
  }
};

function RichProjectCard({ project, accent = "accent" }: { project: Project; accent?: "accent" | "research" }) {
  const borderHover = accent === "research"
    ? "hover:border-purple-400"
    : "hover:border-portfolio-accent";
  const titleHover = accent === "research"
    ? "group-hover:text-purple-400"
    : "group-hover:text-portfolio-accent";

  return (
    <Card className={`bg-portfolio-bg border-portfolio-border ${borderHover} transition-all duration-300 hover:shadow-glow group h-full flex flex-col`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className={`text-portfolio-text ${titleHover} transition-colors font-bold`}>
            {project.title}
          </CardTitle>
          {project.research && (
            <Badge className="bg-purple-500/15 text-purple-300 border border-purple-400/40 shrink-0">
              Research
            </Badge>
          )}
        </div>
        {project.tagline && (
          <p className="text-sm text-portfolio-text-muted italic mt-1">{project.tagline}</p>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {project.problem && (
          <p className="text-sm text-portfolio-text-muted mb-2 leading-relaxed">
            <span className="font-semibold text-portfolio-text">Problem: </span>{project.problem}
          </p>
        )}
        {project.approach && (
          <p className="text-sm text-portfolio-text-muted mb-2 leading-relaxed">
            <span className="font-semibold text-portfolio-text">Approach: </span>{project.approach}
          </p>
        )}
        {project.outcome && (
          <p className="text-sm text-portfolio-text-muted mb-4 leading-relaxed">
            <span className="font-semibold text-portfolio-text">Outcome: </span>{project.outcome}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <Badge key={i} variant="secondary" className="text-xs bg-portfolio-surface border border-portfolio-border">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-1" />Code
            </a>
          </Button>
          <Button variant="outline" size="sm" className="border-portfolio-border hover:border-portfolio-accent" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />View
            </a>
          </Button>
          {project.extraLinks?.map((link, i) => (
            <Button key={i} variant="outline" size="sm" className="border-portfolio-border hover:border-portfolio-accent" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {extraLinkIcon(link.label)}{link.label}
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function Projects() {
  const researchProjects = projects.filter(p => p.research);
  const featuredProjects = projects.filter(p => p.featured && !p.research);
  const otherProjects = projects.filter(p => !p.featured && !p.research);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-portfolio-text mb-4 text-center">
              My <span className="text-portfolio-accent">Portfolio</span>
            </h2>
            <p className="text-lg text-portfolio-text-muted text-center mb-12 max-w-3xl mx-auto">
              Explore my collection of AI/ML projects, from data analysis agents to computer vision applications.
              Each project demonstrates practical applications of cutting-edge technologies.
            </p>
          </AnimatedSection>

          {/* Research */}
          {researchProjects.length > 0 && (
            <AnimatedSection delay={0.05}>
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-2xl font-bold text-portfolio-text">Research</h3>
                  <Badge className="bg-purple-500/15 text-purple-300 border border-purple-400/40">
                    Published
                  </Badge>
                </div>
                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {researchProjects.map((project, index) => (
                    <StaggerItem key={index}>
                      <RichProjectCard project={project} accent="research" />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimatedSection>
          )}

          {/* Featured Projects */}
          <AnimatedSection delay={0.1}>
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-portfolio-text mb-8">Featured Projects</h3>
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <StaggerItem key={index}>
                    <RichProjectCard project={project} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* Other Projects */}
          <AnimatedSection delay={0.2}>
            <div>
              <h3 className="text-2xl font-bold text-portfolio-text mb-8">Other Projects</h3>
              <StaggerContainer className="grid md:grid-cols-2 gap-6">
                {otherProjects.map((project, index) => (
                  <StaggerItem key={index}>
                    <Card className="bg-portfolio-bg border-portfolio-border hover:border-portfolio-accent transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-portfolio-text">{project.title}</h4>
                          <div className="flex items-center gap-2 shrink-0">
                            {project.extraLinks?.map((link, i) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={link.label}
                                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                              >
                                {extraLinkIcon(link.label)}
                              </a>
                            ))}
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                            >
                              <Github className="h-5 w-5" />
                            </a>
                          </div>
                        </div>
                        {project.tagline && (
                          <p className="text-sm text-portfolio-text-muted italic mb-2">{project.tagline}</p>
                        )}
                        {project.problem ? (
                          <div className="text-sm text-portfolio-text-muted mb-3 space-y-1 leading-relaxed">
                            <p><span className="font-semibold text-portfolio-text">Problem: </span>{project.problem}</p>
                            <p><span className="font-semibold text-portfolio-text">Approach: </span>{project.approach}</p>
                            <p><span className="font-semibold text-portfolio-text">Outcome: </span>{project.outcome}</p>
                          </div>
                        ) : (
                        <p className="text-portfolio-text-muted mb-3 text-sm leading-relaxed">
                          {project.description}
                        </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex} 
                              variant="secondary" 
                              className="text-xs bg-portfolio-surface border border-portfolio-border"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* GitHub CTA */}
          <AnimatedSection delay={0.3}>
            <div className="text-center mt-12">
              <p className="text-portfolio-text-muted mb-4">Want to see more of my work?</p>
              <Button 
                size="lg" 
                variant="outline"
                className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-bg transition-all duration-300"
                asChild
              >
                <a href="https://github.com/Nihal108-bi" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  View All Projects on GitHub
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
