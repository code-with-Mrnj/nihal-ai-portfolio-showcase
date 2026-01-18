const techStack = [
  {
    name: "Python",
    icon: "🐍",
    category: "Language"
  },
  {
    name: "TensorFlow",
    icon: "🧠",
    category: "ML Framework"
  },
  {
    name: "React",
    icon: "⚛️",
    category: "Frontend"
  },
  {
    name: "Flask",
    icon: "🌶️",
    category: "Backend"
  },
  {
    name: "MongoDB",
    icon: "🍃",
    category: "Database"
  },
  {
    name: "OpenCV",
    icon: "👁️",
    category: "Computer Vision"
  },
  {
    name: "LangChain",
    icon: "🔗",
    category: "AI Framework"
  },
  {
    name: "Git",
    icon: "📝",
    category: "Version Control"
  },
  {
    name: "Linux",
    icon: "🐧",
    category: "OS"
  },
  {
    name: "Docker",
    icon: "🐋",
    category: "DevOps"
  }
];

export function TechStack() {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-portfolio-text mb-8 text-center">
            My <span className="text-portfolio-accent">Tech Stack</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-4 bg-portfolio-surface border border-portfolio-border rounded-xl hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h4 className="text-portfolio-text font-medium text-center group-hover:text-portfolio-accent transition-colors">
                  {tech.name}
                </h4>
                <p className="text-portfolio-text-muted text-xs text-center mt-1">
                  {tech.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}