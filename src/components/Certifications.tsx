import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Award, Calendar } from "lucide-react";

const certifications = [
  {
    title: "Data Science with Generative AI",
    provider: "PW Skills",
    date: "2024",
    status: "Completed",
    description: "Comprehensive course covering data science fundamentals with advanced generative AI techniques and practical applications.",
    link: "https://www.linkedin.com/posts/nihal-jaiswal-908b52257_datascience-generativeai-pwskills-activity-7193257387590369280-nwBv",
    featured: true
  },
  {
    title: "IR4.0 Foundation Certification",
    provider: "TechSaksham (Microsoft & SAP)",
    date: "2024",
    status: "Completed",
    description: "Industry 4.0 foundation course covering digital transformation, IoT, and enterprise technologies from Microsoft and SAP.",
    link: "https://www.linkedin.com/posts/nihal-jaiswal-908b52257_techsaksham-microsoft-sap-activity-7193257387590369280-nwBv",
    featured: true
  },
  {
    title: "Data Skills Certificate",
    provider: "YBI Foundation",
    date: "2024",
    status: "Completed",
    description: "Practical data skills certification covering data analysis, visualization, and statistical methods for real-world applications.",
    link: "https://www.linkedin.com/posts/nihal-jaiswal-908b52257_dataskills-ybifoundation-activity-7242261879013810177-aAxT",
    featured: false
  },
  {
    title: "RHCSA Rapid Track (RH199)",
    provider: "Red Hat",
    date: "2024",
    status: "Completed",
    description: "Red Hat Certified System Administrator rapid track course covering Linux system administration and enterprise operations.",
    link: "https://www.linkedin.com/posts/nihal-jaiswal-908b52257_rhcsa-rapid-track-course-rh199-ver-93-activity-7251823061006458883-NWCL",
    featured: true
  },
  {
    title: "AI & Prompt Engineering",
    provider: "Self-Directed Learning",
    date: "Ongoing",
    status: "In Progress",
    description: "Advanced study in artificial intelligence and prompt engineering techniques through practical projects and research.",
    link: "https://github.com/Nihal108-bi",
    featured: false
  }
];

export function Certifications() {
  const featuredCerts = certifications.filter(cert => cert.featured);
  const otherCerts = certifications.filter(cert => !cert.featured);

  return (
    <section id="certifications" className="py-20 bg-portfolio-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-portfolio-text mb-4 text-center">
            <span className="text-portfolio-accent">Certifications</span> & Learning
          </h2>
          <p className="text-lg text-portfolio-text-muted text-center mb-12 max-w-3xl mx-auto">
            Continuous learning and professional development through industry-recognized certifications 
            and specialized training programs in AI, data science, and technology.
          </p>

          {/* Featured Certifications */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-portfolio-text mb-8">Featured Certifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCerts.map((cert, index) => (
                <Card key={index} className="bg-portfolio-surface border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Award className="h-8 w-8 text-portfolio-accent flex-shrink-0" />
                      <Badge 
                        variant={cert.status === "Completed" ? "default" : "secondary"}
                        className={cert.status === "Completed" 
                          ? "bg-portfolio-accent text-portfolio-bg" 
                          : "bg-portfolio-bg text-portfolio-accent border border-portfolio-accent"
                        }
                      >
                        {cert.status}
                      </Badge>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-portfolio-text mb-2 group-hover:text-portfolio-accent transition-colors">
                      {cert.title}
                    </h4>
                    
                    <div className="flex items-center text-portfolio-accent mb-2">
                      <span className="font-medium">{cert.provider}</span>
                    </div>
                    
                    <div className="flex items-center text-portfolio-text-muted mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{cert.date}</span>
                    </div>
                    
                    <p className="text-portfolio-text-muted text-sm leading-relaxed mb-4">
                      {cert.description}
                    </p>
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      asChild
                    >
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Certificate
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Other Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-portfolio-text mb-8">Additional Learning</h3>
            <div className="space-y-4">
              {otherCerts.map((cert, index) => (
                <Card key={index} className="bg-portfolio-surface border-portfolio-border hover:border-portfolio-accent transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Award className="h-5 w-5 text-portfolio-accent mr-2" />
                          <h4 className="text-lg font-semibold text-portfolio-text">{cert.title}</h4>
                          <Badge 
                            variant="secondary" 
                            className="ml-3 bg-portfolio-bg text-portfolio-accent border border-portfolio-accent"
                          >
                            {cert.status}
                          </Badge>
                        </div>
                        <p className="text-portfolio-accent font-medium mb-1">{cert.provider}</p>
                        <p className="text-portfolio-text-muted text-sm mb-2">{cert.description}</p>
                        <div className="flex items-center text-portfolio-text-muted">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">{cert.date}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-bg"
                          asChild
                        >
                          <a href={cert.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="mt-16 text-center">
            <div className="bg-portfolio-surface border border-portfolio-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-portfolio-text mb-4">Continuous Learning Philosophy</h3>
              <p className="text-portfolio-text-muted leading-relaxed max-w-3xl mx-auto">
                I believe in lifelong learning and staying updated with the latest technologies in AI, machine learning, 
                and data science. These certifications represent my commitment to professional growth and mastery of 
                cutting-edge tools and methodologies in the rapidly evolving tech landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
