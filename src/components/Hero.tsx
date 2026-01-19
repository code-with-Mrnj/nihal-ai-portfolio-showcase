import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypewriterText } from "./TypewriterText";
const roles = ["AI/ML Engineer", "Data Scientist", "LLM Developer", "GenAI Enthusiast"];
export function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      const cvUrl = "https://drive.google.com/uc?export=download&id=1t00Hoh9e6xwZpQ4zCasIio0pUdCrrenI";
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'Nihal_Jaiswal_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CV:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fallback gradient - lowest layer */}
      <div className="absolute inset-0 bg-gradient-hero" style={{
      zIndex: 0
    }} />

      {/* Video Background Layer - slowed down */}
      {!prefersReducedMotion && <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover" style={{
      zIndex: 1,
      filter: 'brightness(0.7)'
    }} ref={(el) => { if (el) el.playbackRate = 0.5; }} onError={e => {
      console.error('Video failed to load:', e);
    }}>
          <source src="/videos/neural-network-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>}

      {/* Dark Overlay - more transparent for better video visibility */}
      <div className="absolute inset-0" style={{
      zIndex: 2,
      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)'
    }} />

      {/* Bottom fade transition to neural network background */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
      zIndex: 3,
      background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--portfolio-bg)) 100%)'
    }} />

      {/* Content Layer - topmost */}
      <div className="relative container mx-auto px-6 py-20 text-center" style={{
      zIndex: 10
    }}>
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <motion.div initial={{
          scale: 0,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }} className="mb-8">
            <img alt="Nihal Jaiswal" className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-portfolio-accent shadow-glow object-cover" src="/lovable-uploads/8d8b410f-0848-4750-9d22-74a861dd488b.jpg" />
          </motion.div>

          {/* Greeting */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-4xl md:text-6xl lg:text-7xl font-bold text-portfolio-text mb-4 drop-shadow-lg">
            Hi, I'm{" "}
            <span className="text-portfolio-accent">Nihal Jaiswal</span>
          </motion.h1>

          {/* Role with Typewriter */}
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="text-xl md:text-2xl lg:text-3xl text-portfolio-accent font-medium mb-6 h-10 drop-shadow-md">
            <TypewriterText texts={roles} typingSpeed={80} deletingSpeed={40} pauseDuration={2500} />
          </motion.h2>

          {/* Bio */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.6
        }} className="text-lg md:text-xl text-portfolio-text-muted max-w-3xl mx-auto mb-8 leading-relaxed drop-shadow-sm">
            Information Technology undergraduate specializing in AI, machine learning, and data science. 
            Passionate about building intelligent solutions with cutting-edge technologies like LangChain, 
            TensorFlow, and OpenCV.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.8
        }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <Button variant="outline" size="lg" onClick={handleContactClick} className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-bg transition-all duration-300 font-semibold px-8 py-3 backdrop-blur-sm">
              <Mail className="mr-2 h-5 w-5" />
              Hire Me
            </Button>
          </motion.div>
        </div>
      </div>
    </section>;
}