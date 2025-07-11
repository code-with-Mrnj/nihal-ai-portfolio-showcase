import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import nihalProfile from "../assets/nihal-profile.jpg";

const skills = [
  "Python", "FastAPI", "Flask", "LangChain", "Pandas", "NumPy", "Matplotlib", 
  "OpenCV", "TensorFlow", "Keras", "MongoDB", "GitHub", "Streamlit", 
  "HuggingFace", "Prompt Engineering", "SQL", "Linux CLI"
];

const education = [
  {
    institution: "Rajkiya Engineering College, Banda",
    degree: "B.Tech – Information Technology",
    period: "2022–2026",
    grade: "CGPA: 6.8",
    website: "https://recbanda.ac.in/"
  },
  {
    institution: "TN Inter College, Ghazipur (UP Board)",
    degree: "Senior Secondary (XII) – Science",
    period: "2021",
    grade: "Percentage: 81%"
  },
  {
    institution: "TN Inter College, Ghazipur (UP Board)",
    degree: "Secondary (X) – All Subjects",
    period: "2019",
    grade: "Percentage: 87%"
  }
];

export function About() {
  return (
    <section id="about" className="py-20 bg-portfolio-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-portfolio-text mb-4 text-center">
            About <span className="text-portfolio-accent">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* About Text */}
            <div>
              <p className="text-lg text-portfolio-text-muted leading-relaxed mb-6">
                I'm Nihal Jaiswal, an Information Technology undergraduate at Rajkiya Engineering College, Banda (2022–2026). 
                I specialize in data science, machine learning, deep learning, and LLM-based AI agent development.
              </p>
              <p className="text-lg text-portfolio-text-muted leading-relaxed mb-6">
                With hands-on experience in tools like Python, Flask, MongoDB, LangChain, TensorFlow, and OpenCV, 
                I've built real-world applications such as sign language detection systems, generative AI bots, 
                and NLP-based review analyzers.
              </p>
              <p className="text-lg text-portfolio-text-muted leading-relaxed">
                I am passionate about solving real-world problems with cutting-edge AI technologies and constantly 
                learning new methodologies to stay at the forefront of technological innovation.
              </p>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <img
                  src={nihalProfile}
                  alt="Nihal Jaiswal"
                  className="w-80 h-96 rounded-2xl object-cover border border-portfolio-border shadow-card"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-portfolio-bg/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-portfolio-text mb-6">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm font-medium bg-portfolio-surface border border-portfolio-border hover:border-portfolio-accent transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-portfolio-text mb-6">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="bg-portfolio-surface border-portfolio-border hover:border-portfolio-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-lg font-semibold text-portfolio-text">{edu.institution}</h4>
                      <div className="flex items-center text-portfolio-text-muted">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{edu.period}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-portfolio-accent mb-2">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      <span className="font-medium">{edu.degree}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-portfolio-text-muted">{edu.grade}</span>
                      {edu.website && (
                        <a 
                          href={edu.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-portfolio-accent hover:underline text-sm"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}