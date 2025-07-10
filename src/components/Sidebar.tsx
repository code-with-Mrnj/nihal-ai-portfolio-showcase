import { useState } from "react";
import { Home, User, FolderOpen, Award, Mail, Github, Linkedin, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navigation = [
  { name: "HOME", href: "#home", icon: Home },
  { name: "ABOUT ME", href: "#about", icon: User },
  { name: "PORTFOLIO", href: "#projects", icon: FolderOpen },
  { name: "CERTIFICATIONS", href: "#certifications", icon: Award },
  { name: "CONTACT", href: "#contact", icon: Mail },
];

interface SidebarProps {
  activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-portfolio-surface border border-portfolio-border"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-40 h-full w-64 bg-portfolio-surface border-r border-portfolio-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo/Name */}
          <div className="mb-12 mt-8 md:mt-0">
            <h1 className="text-2xl font-bold text-portfolio-accent">NIHAL</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      w-full flex items-center px-3 py-3 text-left rounded-lg transition-colors
                      ${activeSection === item.href.slice(1) 
                        ? 'bg-portfolio-accent text-portfolio-bg font-medium' 
                        : 'text-portfolio-text-muted hover:text-portfolio-text hover:bg-portfolio-bg'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="mt-auto pt-6">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/Nihal108-bi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/nihal-jaiswal-908b52257"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <p className="text-sm text-portfolio-text-muted">
              © 2024 Nihal Jaiswal
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}