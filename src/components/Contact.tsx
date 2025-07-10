import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "nihaljaiswal108@gmail.com",
    href: "mailto:nihaljaiswal108@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9140xxxxx",
    href: "tel:+919140xxxxx"
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
  }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:nihaljaiswal108@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success toast
    toast({
      title: "Email client opened!",
      description: "Your default email client should open with the pre-filled message.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
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
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <Card key={index} className="bg-portfolio-bg border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow">
                      <CardContent className="p-4">
                        <a 
                          href={social.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 group"
                        >
                          <social.icon className="h-6 w-6 text-portfolio-accent" />
                          <div>
                            <p className="text-portfolio-text font-medium group-hover:text-portfolio-accent transition-colors">
                              {social.label}
                            </p>
                            <p className="text-portfolio-text-muted text-sm">{social.username}</p>
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
                  <a href="mailto:nihaljaiswal108@gmail.com">
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
                        <label htmlFor="name" className="block text-sm font-medium text-portfolio-text mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-portfolio-surface border-portfolio-border focus:border-portfolio-accent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-portfolio-text mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-portfolio-surface border-portfolio-border focus:border-portfolio-accent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-portfolio-text mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
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
                        className="bg-portfolio-surface border-portfolio-border focus:border-portfolio-accent resize-none"
                        placeholder="Tell me about your project, idea, or just say hello!"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      size="lg"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                  
                  <p className="text-sm text-portfolio-text-muted mt-4 text-center">
                    This will open your email client with a pre-filled message.
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