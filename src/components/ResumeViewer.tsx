import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, FileText, ExternalLink, ChevronDown, ChevronUp, GraduationCap, Briefcase, Award, Code } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedSection } from "./AnimatedSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: "education" | "work" | "certification" | "project";
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "2022",
    title: "Started B.Tech in Information Technology",
    subtitle: "Rajkiya Engineering College, Banda",
    description: "Began my undergraduate journey specializing in IT with focus on AI/ML",
    icon: "education",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    year: "2023",
    title: "Data Science Trainee",
    subtitle: "PW Skills",
    description: "Completed intensive training in ML, Deep Learning, NLP with 10+ hands-on projects",
    icon: "work",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    year: "2024",
    title: "Multiple Certifications Earned",
    subtitle: "Microsoft, Red Hat, PW Skills",
    description: "Data Science with Generative AI, RHCSA, IR4.0 Foundation certifications",
    icon: "certification",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    year: "2025",
    title: "AI & Automation Intern",
    subtitle: "Mirai School",
    description: "Designed AI-driven learning tools, automating 80% of student Q&A interactions",
    icon: "work",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 5,
    year: "2025",
    title: "AI Engineering Intern",
    subtitle: "Meghaminds IT Services",
    description: "Built student performance prediction system with 99.23% accuracy",
    icon: "work",
    color: "from-red-500 to-pink-500",
  },
  {
    id: 6,
    year: "2026",
    title: "B.Tech Graduation (Expected)",
    subtitle: "Rajkiya Engineering College, Banda",
    description: "Completing degree with expertise in AI, ML, and Data Science",
    icon: "education",
    color: "from-cyan-500 to-blue-500",
  },
];

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
  project: Code,
};

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[event.icon];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center mb-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      {/* Content card */}
      <div className={`ml-16 md:ml-0 md:w-[45%] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
        <div className="bg-portfolio-surface/80 backdrop-blur-sm border border-portfolio-border rounded-xl p-5 hover:border-portfolio-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-portfolio-accent/10">
          <span className="text-portfolio-accent font-bold text-lg">{event.year}</span>
          <h4 className="text-portfolio-text font-semibold mt-1">{event.title}</h4>
          <p className="text-portfolio-accent/80 text-sm">{event.subtitle}</p>
          <p className="text-portfolio-text-muted text-sm mt-2">{event.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ResumeViewer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="py-20 relative">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-portfolio-text mb-4">
              My <span className="text-portfolio-accent">Journey</span>
            </h2>
            <p className="text-portfolio-text-muted max-w-2xl mx-auto mb-8">
              A visual timeline of my education, work experience, and achievements
            </p>

            {/* Resume Actions */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-portfolio-accent hover:bg-portfolio-accent/90 text-portfolio-bg gap-2">
                    <FileText className="w-4 h-4" />
                    View Resume
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[85vh] bg-portfolio-surface border-portfolio-border">
                  <DialogHeader>
                    <DialogTitle className="text-portfolio-text flex items-center gap-2">
                      <FileText className="w-5 h-5 text-portfolio-accent" />
                      Nihal Jaiswal - Resume
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 h-full min-h-0">
                    <iframe
                      src="/resume/NihalJaiswal_DS.pdf"
                      className="w-full h-[calc(85vh-80px)] rounded-lg border border-portfolio-border"
                      title="Resume PDF"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <a
                href="/resume/NihalJaiswal_DS.pdf"
                download="Nihal_Jaiswal_Resume.pdf"
              >
                <Button variant="outline" className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent/10 gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </a>

              <a
                href="/resume/NihalJaiswal_DS.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-portfolio-border text-portfolio-text-muted hover:border-portfolio-accent hover:text-portfolio-accent gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </Button>
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Visual Timeline */}
        <div ref={sectionRef} className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-portfolio-accent via-portfolio-accent/50 to-transparent" />

          {/* Show limited or all events */}
          {(isExpanded ? timelineEvents : timelineEvents.slice(0, 4)).map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}

          {/* Expand/Collapse button */}
          {timelineEvents.length > 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex justify-center mt-8"
            >
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-portfolio-accent hover:bg-portfolio-accent/10 gap-2"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show More
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
