import { useState } from "react";
import { Home, User, FolderOpen, Award, Mail, Github, Linkedin, Menu, X, Instagram, Twitter, Image, BookOpen, LogIn, LogOut, Briefcase, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { name: "HOME", href: "#home", icon: Home },
  { name: "ABOUT ME", href: "#about", icon: User },
  { name: "EXPERIENCE", href: "#experience", icon: Briefcase },
  { name: "PORTFOLIO", href: "#projects", icon: FolderOpen },
  { name: "CODING PROOF", href: "#coding-proof", icon: Code2 },
  { name: "CERTIFICATIONS", href: "#certifications", icon: Award },
  { name: "GALLERY", href: "#gallery", icon: Image },
  { name: "BLOG", href: "#blog", icon: BookOpen },
  { name: "CONTACT", href: "#contact", icon: Mail },
];

interface SidebarProps {
  activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

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

          {/* Auth Button */}
          <div className="mb-4">
            {user ? (
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-portfolio-border hover:bg-portfolio-bg hover:text-portfolio-accent"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-portfolio-border hover:bg-portfolio-bg hover:text-portfolio-accent"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Social Links */}
          <div className="mt-auto pt-6">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <a
                href="https://github.com/Nihal108-bi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                title="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/nihal-jaiswal-908b52257"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/nihaljaiswal867/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                title="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/JaiswalNih143"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                title="X (Twitter)"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://hub.docker.com/u/nihal108bi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                title="DockerHub"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185M0 10.3v1.5c0 .8.3 1.6.9 2.1 5.1 6.1 15.1 6.1 20.3 0 .6-.5.9-1.3.9-2.1v-1.5z"/>
                </svg>
              </a>
              <a
                href="https://discord.com/users/nihaljasiwal_24391"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                title="Discord"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
            </div>
            <p className="text-sm text-portfolio-text-muted font-medium tracking-wide">
              ✨ © 2025 Nihal Jaiswal ✨
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