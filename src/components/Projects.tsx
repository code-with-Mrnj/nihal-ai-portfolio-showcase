import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
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
  }
];

export function Projects() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-portfolio-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-portfolio-text mb-4 text-center">
            My <span className="text-portfolio-accent">Portfolio</span>
          </h2>
          <p className="text-lg text-portfolio-text-muted text-center mb-12 max-w-3xl mx-auto">
            Explore my collection of AI/ML projects, from data analysis agents to computer vision applications.
            Each project demonstrates practical applications of cutting-edge technologies.
          </p>

          {/* Featured Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-portfolio-text mb-8">Featured Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <Card key={index} className="bg-portfolio-bg border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow group">
                  <CardHeader>
                    <CardTitle className="text-portfolio-text group-hover:text-portfolio-accent transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-portfolio-text-muted mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
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
                    <div className="flex gap-3">
                      <Button 
                        size="sm" 
                        className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-portfolio-border hover:border-portfolio-accent"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Other Projects */}
          <div>
            <h3 className="text-2xl font-bold text-portfolio-text mb-8">Other Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <Card key={index} className="bg-portfolio-bg border-portfolio-border hover:border-portfolio-accent transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-portfolio-text">{project.title}</h4>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                    <p className="text-portfolio-text-muted mb-3 text-sm leading-relaxed">
                      {project.description}
                    </p>
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
              ))}
            </div>
          </div>

          {/* GitHub CTA */}
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
        </div>
      </div>
    </section>
  );
}
