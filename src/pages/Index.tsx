import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { StatsCounter } from "@/components/StatsCounter";
import { TechStack } from "@/components/TechStack";
import { ResumeViewer } from "@/components/ResumeViewer";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { CodingProof } from "@/components/CodingProof";
import { Certifications } from "@/components/Certifications";
import { Gallery } from "@/components/Gallery";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { NeuralNetworkBackground } from "@/components/NeuralNetworkBackground";
import BackgroundMusic from "@/components/BackgroundMusic";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "resume", "experience", "projects", "coding-proof", "certifications", "gallery", "blog", "contact"];
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
      
      {/* Background Music */}
      <BackgroundMusic />
      
      {/* Main content */}
      <main className="md:ml-64">
        {/* Hero section with video background */}
        <Hero />
        
        {/* All sections below hero wrapped with neural network background */}
        <NeuralNetworkBackground>
          <About />
          <StatsCounter />
          <TechStack />
          <ResumeViewer />
          <Experience />
          <Projects />
          <CodingProof />
          <Certifications />
          <Gallery />
          <Blog />
          <Contact />
        </NeuralNetworkBackground>
      </main>

      {/* ElevenLabs ConvAI Widget */}
      <ElevenLabsWidget />
    </div>
  );
};

export default Index;
