import { Button } from "./ui/button";
import { Download, Mail } from "lucide-react";
export function Hero() {
  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8">
            <img alt="Nihal Jaiswal" className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-portfolio-accent shadow-glow object-cover" src="/lovable-uploads/8d8b410f-0848-4750-9d22-74a861dd488b.jpg" />
          </div>

          {/* Greeting */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-portfolio-text mb-4">
            Hi, I'm{" "}
            <span className="text-portfolio-accent">Nihal Jaiswal</span>
          </h1>

          {/* Role */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-portfolio-accent font-medium mb-6">
            AI/ML Engineer & Data Scientist
          </h2>

          {/* Bio */}
          <p className="text-lg md:text-xl text-portfolio-text-muted max-w-3xl mx-auto mb-8 leading-relaxed">
            Information Technology undergraduate specializing in AI, machine learning, and data science. 
            Passionate about building intelligent solutions with cutting-edge technologies like LangChain, 
            TensorFlow, and OpenCV.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold px-8 py-3">
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
            <Button variant="outline" size="lg" onClick={handleContactClick} className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-bg transition-all duration-300 font-semibold px-8 py-3">
              <Mail className="mr-2 h-5 w-5" />
              Hire Me
            </Button>
          </div>
        </div>
      </div>
    </section>;
}