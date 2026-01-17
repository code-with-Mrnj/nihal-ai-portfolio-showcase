import { Briefcase, Calendar, MapPin } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  type: "internship" | "project" | "hackathon" | "freelance";
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "AI/ML Intern",
    company: "Tech Company",
    location: "Remote",
    duration: "Jan 2024 - Present",
    description: [
      "Developed machine learning models for natural language processing tasks",
      "Implemented LangChain-based chatbots for customer support automation",
      "Built data pipelines for processing and analyzing large datasets",
    ],
    type: "internship",
  },
  {
    id: 2,
    title: "Data Science Project Lead",
    company: "University Project",
    location: "India",
    duration: "Aug 2023 - Dec 2023",
    description: [
      "Led a team of 4 students in building a predictive analytics platform",
      "Implemented computer vision models using TensorFlow and OpenCV",
      "Presented findings at the annual tech symposium",
    ],
    type: "project",
  },
  {
    id: 3,
    title: "GenAI Hackathon Winner",
    company: "HackTech 2023",
    location: "Bangalore, India",
    duration: "Nov 2023",
    description: [
      "Built an AI-powered content generation tool in 48 hours",
      "Integrated multiple LLM APIs for diverse content types",
      "Won first place among 50+ participating teams",
    ],
    type: "hackathon",
  },
];

const typeColors: Record<string, string> = {
  internship: "bg-green-500/20 text-green-400 border-green-500/30",
  project: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  hackathon: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  freelance: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-portfolio-surface/30">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-portfolio-text mb-4">
              Experience & <span className="text-portfolio-accent">Journey</span>
            </h2>
            <p className="text-portfolio-text-muted max-w-2xl mx-auto">
              My professional journey through internships, projects, and hackathons
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <StaggerContainer className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-portfolio-border" />

            {experiences.map((exp, index) => (
              <StaggerItem key={exp.id}>
                <div
                  className={`relative flex items-start mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-portfolio-accent rounded-full border-4 border-portfolio-bg z-10" />

                  {/* Content card */}
                  <div
                    className={`ml-8 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-portfolio-surface border border-portfolio-border rounded-xl p-6 hover:border-portfolio-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-portfolio-accent/5">
                      {/* Type badge */}
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full border mb-4 capitalize ${
                          typeColors[exp.type]
                        }`}
                      >
                        {exp.type}
                      </span>

                      <h3 className="text-xl font-bold text-portfolio-text mb-1">
                        {exp.title}
                      </h3>

                      <div className="flex items-center gap-2 text-portfolio-accent font-medium mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-portfolio-text-muted mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="text-portfolio-text-muted text-sm flex items-start gap-2"
                          >
                            <span className="text-portfolio-accent mt-1.5">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
