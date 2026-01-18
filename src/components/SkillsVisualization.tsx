import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
  name: string;
  proficiency: number;
  icon?: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Core competencies shown as radial progress
const coreSkills: Skill[] = [
  { name: "Python", proficiency: 90, icon: "🐍" },
  { name: "Machine Learning", proficiency: 85, icon: "🤖" },
  { name: "Deep Learning", proficiency: 80, icon: "🧠" },
  { name: "LLM & Gen AI", proficiency: 85, icon: "✨" },
  { name: "Computer Vision", proficiency: 75, icon: "👁️" },
];

// Skill categories for horizontal bars
const skillCategories: SkillCategory[] = [
  {
    title: "Generative AI & LLMs",
    skills: [
      { name: "LLM Building & Fine-tuning", proficiency: 85 },
      { name: "RAG (Retrieval-Augmented Gen)", proficiency: 85 },
      { name: "LangChain", proficiency: 85 },
      { name: "Prompt Engineering", proficiency: 80 },
      { name: "Vector DBs (FAISS/Chroma)", proficiency: 75 },
    ],
  },
  {
    title: "Core Programming & ML",
    skills: [
      { name: "Data Structures & Algorithms", proficiency: 80 },
      { name: "Feature Engineering", proficiency: 80 },
      { name: "Model Evaluation & Metrics", proficiency: 80 },
      { name: "NumPy & Pandas", proficiency: 85 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "TensorFlow", proficiency: 80 },
      { name: "PyTorch", proficiency: 75 },
      { name: "Hugging Face", proficiency: 80 },
      { name: "OpenCV", proficiency: 75 },
    ],
  },
  {
    title: "MLOps & Deployment",
    skills: [
      { name: "MLOps Fundamentals", proficiency: 70 },
      { name: "Model Deployment", proficiency: 75 },
      { name: "Experiment Tracking", proficiency: 70 },
      { name: "Docker", proficiency: 65 },
      { name: "CI/CD Basics", proficiency: 65 },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "FastAPI", proficiency: 75 },
      { name: "Flask", proficiency: 75 },
      { name: "REST API Development", proficiency: 80 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", proficiency: 75 },
      { name: "SQL", proficiency: 70 },
      { name: "Vector Databases", proficiency: 75 },
    ],
  },
  {
    title: "Cloud & Platforms",
    skills: [
      { name: "AWS", proficiency: 70 },
      { name: "Google Cloud (GCP)", proficiency: 65 },
      { name: "Azure", proficiency: 65 },
      { name: "Firebase", proficiency: 70 },
    ],
  },
  {
    title: "Tools & Systems",
    skills: [
      { name: "Git & GitHub", proficiency: 85 },
      { name: "Linux", proficiency: 70 },
      { name: "Jupyter / Colab", proficiency: 85 },
    ],
  },
];

function RadialProgress({ 
  skill, 
  index, 
  isInView 
}: { 
  skill: Skill; 
  index: number; 
  isInView: boolean;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;
  
  // Unique gradient ID for each skill
  const gradientId = `gradient-${skill.name.replace(/\s+/g, '-').toLowerCase()}`;

  useEffect(() => {
    if (!isInView) {
      setAnimatedValue(0);
      return;
    }
    
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(skill.proficiency * eased);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, index * 150);
    
    return () => clearTimeout(timeout);
  }, [isInView, skill.proficiency, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center group"
    >
      <div className="relative">
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ 
            background: `radial-gradient(circle, hsl(48, 96%, 53%) 0%, transparent 70%)` 
          }}
        />
        
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(48, 96%, 53%)" />
              <stop offset="100%" stopColor="hsl(187, 71%, 55%)" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
            className="opacity-30"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              filter: 'drop-shadow(0 0 8px hsla(48, 96%, 53%, 0.5))'
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl mb-1">{skill.icon}</span>
          <span className="text-lg font-bold text-foreground tabular-nums">
            {Math.round(animatedValue)}%
          </span>
        </div>
      </div>
      
      <p className="mt-3 text-sm font-medium text-foreground text-center group-hover:text-yellow-400 transition-colors">
        {skill.name}
      </p>
    </motion.div>
  );
}

function HorizontalBar({ 
  skill, 
  index, 
  isInView 
}: { 
  skill: Skill; 
  index: number; 
  isInView: boolean;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setAnimatedValue(0);
      return;
    }
    
    const duration = 1200;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(skill.proficiency * eased);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100 + index * 80);
    
    return () => clearTimeout(timeout);
  }, [isInView, skill.proficiency, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-foreground group-hover:text-yellow-400 transition-colors">
          {skill.name}
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {Math.round(animatedValue)}%
        </span>
      </div>
      
      <div className="relative h-2 bg-border/30 rounded-full overflow-hidden">
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
          style={{ 
            background: `linear-gradient(90deg, hsla(48, 96%, 53%, 0.3) 0%, hsla(187, 71%, 55%, 0.3) ${animatedValue}%, transparent ${animatedValue}%)` 
          }}
        />
        
        {/* Progress bar */}
        <div 
          className="h-full rounded-full transition-all duration-100"
          style={{ 
            width: `${animatedValue}%`,
            background: `linear-gradient(90deg, hsl(48, 96%, 53%) 0%, hsl(187, 71%, 55%) 100%)`
          }}
        />
      </div>
    </motion.div>
  );
}

function SkillCategoryCard({ 
  category, 
  index,
  isInView 
}: { 
  category: SkillCategory; 
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-5"
    >
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        {category.title}
      </h4>
      
      <div className="space-y-3">
        {category.skills.map((skill, skillIndex) => (
          <HorizontalBar 
            key={skill.name} 
            skill={skill} 
            index={skillIndex} 
            isInView={isInView} 
          />
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsVisualization() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Skills & <span className="text-yellow-400">Expertise</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Core competencies in AI/ML engineering and modern development tools
            </p>
          </motion.div>

          {/* Core Skills - Radial Progress */}
          <div className="mb-12">
            <motion.h4
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8 text-center"
            >
              Core Competencies
            </motion.h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
              {coreSkills.map((skill, index) => (
                <RadialProgress 
                  key={skill.name} 
                  skill={skill} 
                  index={index} 
                  isInView={isInView} 
                />
              ))}
            </div>
          </div>

          {/* Skill Categories - Horizontal Bars in Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skillCategories.map((category, index) => (
              <SkillCategoryCard
                key={category.title}
                category={category}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
