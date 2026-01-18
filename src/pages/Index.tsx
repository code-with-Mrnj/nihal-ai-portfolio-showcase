import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { CodingProof } from "@/components/CodingProof";
import { Certifications } from "@/components/Certifications";
import { Gallery } from "@/components/Gallery";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "certifications", "gallery", "blog", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-bg">
      <Sidebar activeSection={activeSection} />
      
      {/* Main content */}
      <main className="md:ml-64">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <CodingProof />
        <Certifications />
        <Gallery />
        <Blog />
        <Contact />
      </main>

      {/* ElevenLabs ConvAI Widget */}
      <div 
        dangerouslySetInnerHTML={{
          __html: '<elevenlabs-convai agent-id="agent_9001k36j0yxwfc29wdfss5wv58fa"></elevenlabs-convai>'
        }}
      />
    </div>
  );
};

export default Index;
