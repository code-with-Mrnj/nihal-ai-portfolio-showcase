import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Data Analyst Agent",
    description: "LangChain + PandasAI for CSV data insights. An intelligent agent that can analyze and provide insights from CSV data using natural language processing.",
    technologies: ["LangChain", "PandasAI", "Python", "Data Analysis"],
    github: "https://github.com/Nihal108-bi/Data_Analyst_Agent",
    featured: true
  },
  {
    title: "Sign Language Detection System",
    description: "OpenCV + Random Forest for gesture classification. Real-time sign language detection system for Indian Sign Language (ISL) with high accuracy.",
    technologies: ["OpenCV", "Random Forest", "Python", "Computer Vision"],
    github: "https://github.com/Nihal108-bi/ISL-Sign-Language-Detection",
    featured: true
  },
  {
    title: "Generative AI File Q&A ChatBot",
    description: "LangChain-based QA on uploaded documents. Upload any document and ask questions to get intelligent answers powered by LLMs.",
    technologies: ["LangChain", "RAG", "Python", "NLP"],
    github: "https://github.com/Nihal108-bi/File-Query-Bot-using-LangChain",
    featured: true
  },
  {
    title: "Pneumonia Detection with CNN",
    description: "TensorFlow, Keras, TensorBoard visualizations. Deep learning model for medical image analysis to detect pneumonia from chest X-rays.",
    technologies: ["TensorFlow", "Keras", "CNN", "Medical AI"],
    github: "https://github.com/Nihal108-bi/Pneumonia-detection-using-CNN",
    featured: false
  },
  {
    title: "Myntra Review Sentiment Analyzer",
    description: "NLP on product reviews. Analyze customer sentiment from Myntra product reviews using advanced natural language processing techniques.",
    technologies: ["NLP", "Sentiment Analysis", "Python", "Web Scraping"],
    github: "https://github.com/Nihal108-bi/Myntra-review-sentiment",
    featured: false
  },
  {
    title: "Agrotech Weather Predictor",
    description: "Random Forest model to forecast rainfall. Agricultural technology solution for weather prediction to help farmers make informed decisions.",
    technologies: ["Random Forest", "Agriculture", "Machine Learning", "Python"],
    github: "https://github.com/Nihal108-bi/agrotech",
    featured: false
  },
  {
    title: "CalmDown Mental Wellness App",
    description: "Music, yoga, laughter therapy + doctor booking. Comprehensive mental health platform with multiple wellness features and healthcare integration.",
    technologies: ["Flask", "Healthcare", "UI/UX", "Wellness"],
    github: "https://github.com/Nihal108-bi/CalmDown",
    featured: false
  },
  {
    title: "Virtual Try-On Platform",
    description: "Image transformation for clothing simulation. AI-powered platform that allows users to virtually try on clothes using computer vision.",
    technologies: ["Computer Vision", "Image Processing", "AI", "Fashion Tech"],
    github: "https://github.com/Nihal108-bi/Virtual-Tryon",
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
