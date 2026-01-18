import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CoreSkill {
  name: string;
  proficiency: number;
  icon: string;
}

interface SupportingTool {
  name: string;
  proficiency: number;
}

const coreSkills: CoreSkill[] = [
  { name: "Python", proficiency: 90, icon: "🐍" },
  { name: "Machine Learning", proficiency: 85, icon: "🤖" },
  { name: "Deep Learning", proficiency: 80, icon: "🧠" },
  { name: "LangChain / LLMs", proficiency: 85, icon: "🔗" },
  { name: "OpenCV / CV", proficiency: 75, icon: "👁️" },
];

const supportingTools: SupportingTool[] = [
  { name: "TensorFlow", proficiency: 85 },
  { name: "PyTorch", proficiency: 80 },
  { name: "FastAPI", proficiency: 75 },
  { name: "MongoDB", proficiency: 70 },
  { name: "SQL", proficiency: 75 },
  { name: "Linux", proficiency: 80 },
];

function RadialProgress({ 
  skill, 
  index, 
  isInView 
}: { 
  skill: CoreSkill; 
  index: number; 
  isInView: boolean;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
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
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center group"
    >
      <div className="relative">
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ 
            background: `radial-gradient(circle, hsl(var(--portfolio-accent)) 0%, transparent 70%)` 
          }}
        />
        
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--portfolio-border))"
            strokeWidth={strokeWidth}
            className="opacity-30"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-100 drop-shadow-[0_0_8px_hsl(var(--portfolio-accent)/0.5)]"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(48, 96%, 53%)" />
              <stop offset="100%" stopColor="hsl(187, 71%, 55%)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl mb-1">{skill.icon}</span>
          <span className="text-lg font-bold text-foreground tabular-nums">
            {Math.round(animatedValue)}%
          </span>
        </div>
      </div>
      
      <p className="mt-3 text-sm font-medium text-foreground text-center group-hover:text-portfolio-accent transition-colors">
        {skill.name}
      </p>
    </motion.div>
  );
}

function HorizontalBar({ 
  tool, 
  index, 
  isInView 
}: { 
  tool: SupportingTool; 
  index: number; 
  isInView: boolean;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 1200;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(tool.proficiency * eased);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 300 + index * 100);
    
    return () => clearTimeout(timeout);
  }, [isInView, tool.proficiency, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground group-hover:text-portfolio-accent transition-colors">
          {tool.name}
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {Math.round(animatedValue)}%
        </span>
      </div>
      
      <div className="relative h-2 bg-portfolio-border/30 rounded-full overflow-hidden">
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
          style={{ 
            background: `linear-gradient(90deg, hsl(48, 96%, 53%, 0.3) 0%, hsl(187, 71%, 55%, 0.3) ${animatedValue}%, transparent ${animatedValue}%)` 
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

export function SkillsVisualization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Skills & <span className="text-portfolio-accent">Expertise</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Core competencies in AI/ML engineering and modern development tools
            </p>
          </motion.div>

          {/* Core Skills - Radial Progress */}
          <div className="mb-16">
            <motion.h4
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
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

          {/* Supporting Tools - Horizontal Bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8"
          >
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 text-center">
              Tools & Technologies
            </h4>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-5">
              {supportingTools.map((tool, index) => (
                <HorizontalBar 
                  key={tool.name} 
                  tool={tool} 
                  index={index} 
                  isInView={isInView} 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
