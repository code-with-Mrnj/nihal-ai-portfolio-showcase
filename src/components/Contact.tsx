import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Instagram, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "nihaljaisawal1@gmail.com",
    href: "mailto:nihaljaisawal1@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8303294732",
    href: "tel:+918303294732"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Banda, Uttar Pradesh, India",
    href: null
  }
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Nihal108-bi",
    username: "@Nihal108-bi"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nihal-jaiswal-908b52257",
    username: "@nihal-jaiswal"
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/nihaljaiswal867/",
    username: "@nihaljaiswal867"
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    href: "https://x.com/JaiswalNih143",
    username: "@JaiswalNih143"
  }
];

// Custom icons for platforms not in lucide-react
const DockerIcon = () => (
  <svg className="h-6 w-6 text-portfolio-accent" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185M0 10.3v1.5c0 .8.3 1.6.9 2.1 5.1 6.1 15.1 6.1 20.3 0 .6-.5.9-1.3.9-2.1v-1.5z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="h-6 w-6 text-portfolio-accent" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
  </svg>
);

const KaggleIcon = () => (
  <svg className="h-6 w-6 text-portfolio-accent" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.28.18.046.149.013.27-.093.381l-6.596 6.576 6.915 8.156c.093.116.116.234.055.349z"/>
  </svg>
);

const customSocialLinks = [
  {
    icon: DockerIcon,
    label: "DockerHub",
    href: "https://hub.docker.com/u/nihal108bi",
    username: "@nihal108bi"
  },
  {
    icon: DiscordIcon,
    label: "Discord",
    href: "https://discord.com/users/nihaljasiwal_24391",
    username: "@nihaljasiwal_24391"
  },
  {
    icon: KaggleIcon,
    label: "Kaggle",
    href: "https://www.kaggle.com/nobiniyan",
    username: "@nobiniyan"
  }
];

export function Contact() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await emailjs.send(
        'service_hclbwdf',
        'template_0f4q2e2',
        formData,
        'VWJX_TjSp1oqoAtAr'
      );

      if (result.status === 200) {
        toast({
          title: "Message sent successfully!",
          description: "Your message has been sent! I'll get back to you soon.",
        });
        
        // Reset form
        setFormData({
          user_name: '',
          user_email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again or contact me directly.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-portfolio-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-portfolio-text mb-4 text-center">
            Get In <span className="text-portfolio-accent">Touch</span>
          </h2>
          <p className="text-lg text-portfolio-text-muted text-center mb-12 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about 
            AI, machine learning, and technology. Feel free to reach out!
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-portfolio-text mb-8">Let's Connect</h3>
              
              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 bg-portfolio-accent rounded-lg flex items-center justify-center mr-4">
                      <info.icon className="h-6 w-6 text-portfolio-bg" />
                    </div>
                    <div>
                      <p className="text-portfolio-text-muted text-sm">{info.label}</p>
                      {info.href ? (
                        <a 
                          href={info.href} 
                          className="text-portfolio-text hover:text-portfolio-accent transition-colors font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-portfolio-text font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-portfolio-text mb-4">Follow Me</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {socialLinks.map((social, index) => (
                    <Card key={index} className="bg-portfolio-bg border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow">
                      <CardContent className="p-3">
                        <a 
                          href={social.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 group"
                        >
                          <social.icon className="h-5 w-5 text-portfolio-accent" />
                          <div className="min-w-0">
                            <p className="text-portfolio-text font-medium group-hover:text-portfolio-accent transition-colors text-sm">
                              {social.label}
                            </p>
                            <p className="text-portfolio-text-muted text-xs truncate">{social.username}</p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                  {customSocialLinks.map((social, index) => (
                    <Card key={`custom-${index}`} className="bg-portfolio-bg border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow">
                      <CardContent className="p-3">
                        <a 
                          href={social.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 group"
                        >
                          <social.icon />
                          <div className="min-w-0">
                            <p className="text-portfolio-text font-medium group-hover:text-portfolio-accent transition-colors text-sm">
                              {social.label}
                            </p>
                            <p className="text-portfolio-text-muted text-xs truncate">{social.username}</p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 p-6 bg-portfolio-bg border border-portfolio-border rounded-xl">
                <h4 className="text-lg font-semibold text-portfolio-text mb-2">Ready to collaborate?</h4>
                <p className="text-portfolio-text-muted mb-4">
                  Whether you have a project in mind, want to discuss AI/ML solutions, or just want to connect, 
                  I'd love to hear from you.
                </p>
                <Button 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  asChild
                >
                  <a href="mailto:nihaljaisawal1@gmail.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-portfolio-bg border-portfolio-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-portfolio-text mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="user_name" className="block text-sm font-medium text-portfolio-text mb-2">
                          Name *
                        </label>
                        <Input
                          id="user_name"
                          name="user_name"
                          value={formData.user_name}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="bg-portfolio-surface border-portfolio-border focus:border-portfolio-accent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="user_email" className="block text-sm font-medium text-portfolio-text mb-2">
                          Email *
                        </label>
                        <Input
                          id="user_email"
                          name="user_email"
                          type="email"
                          value={formData.user_email}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="bg-portfolio-surface border-portfolio-border focus:border-portfolio-accent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                     </div>
                     
                     <div>
                       <label htmlFor="subject" className="block text-sm font-medium text-portfolio-text mb-2">
                         Subject *
                       </label>
                       <Input
                         id="subject"
                         name="subject"
                         value={formData.subject}
                         onChange={handleInputChange}
                         required
                         disabled={isLoading}
                         className="bg-portfolio-surface border-portfolio-border focus:border-portfolio-accent"
                         placeholder="What's this about?"
                       />
                     </div>
                     
                     <div>
                      <label htmlFor="message" className="block text-sm font-medium text-portfolio-text mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        disabled={isLoading}
                        className="bg-portfolio-surface border-portfolio-border focus:border-portfolio-accent resize-none"
                        placeholder="Tell me about your project, idea, or just say hello!"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      size="lg"
                      disabled={isLoading}
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                  
                  <p className="text-sm text-portfolio-text-muted mt-4 text-center">
                    Your message will be sent directly to my email.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}