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
    title: "AI Engineering Intern",
    company: "Meghaminds IT Services",
    location: "Remote",
    duration: "June 2025 – Ongoing",
    description: [
      "Engineered a student performance prediction system, boosting accuracy to 99.23% using ML models",
      "Built a big data recommendation engine on Movielens dataset, improving prediction efficiency by 25%",
      "Optimizing collaborative filtering pipelines for scalable AI solutions",
    ],
    type: "internship",
  },
  {
    id: 2,
    title: "AI & Automation Intern",
    company: "Mirai School",
    location: "Remote",
    duration: "July 2025 – August 2025",
    description: [
      "Designed and deployed AI-driven learning tools and NLP chatbots",
      "Automated 80% of student Q&A interactions using conversational AI",
      "Built n8n workflows to streamline data pipelines and reduce reporting time by 35%",
    ],
    type: "internship",
  },
  {
    id: 3,
    title: "Data Science Trainee",
    company: "PW Skills",
    location: "Virtual",
    duration: "2023",
    description: [
      "Completed intensive training in ML, Deep Learning, NLP, and Data Engineering with 10+ projects",
      "Applied TensorFlow, PyTorch, and Flask to build predictive, CV, and NLP models",
      "Worked with real-world datasets to solve practical data science challenges",
    ],
    type: "project",
  },
  {
    id: 4,
    title: "National Hackathon Participant",
    company: "5+ National Hackathons",
    location: "India",
    duration: "2023 – 2024",
    description: [
      "Directed teams across 5 national hackathons, securing 2nd place",
      "Built AI-powered solutions under time constraints",
      "Organized the college annual fest (AVATAR)",
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
    <section id="experience" className="py-20 relative">
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
