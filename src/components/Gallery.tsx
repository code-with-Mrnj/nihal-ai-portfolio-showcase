import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Image, Calendar, MapPin, Users } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "AI/ML Hackathon Winner",
    category: "Hackathon",
    date: "2024",
    location: "Tech Conference Delhi",
    description: "First place in AI/ML hackathon with innovative cryptocurrency prediction model",
    image: "/placeholder.svg",
    tags: ["AI", "Machine Learning", "Winner"]
  },
  {
    id: 2,
    title: "Data Science Project Showcase",
    category: "Project",
    date: "2024",
    location: "University Campus",
    description: "Presenting diamond price prediction model at university tech expo",
    image: "/placeholder.svg",
    tags: ["Data Science", "Presentation", "University"]
  },
  {
    id: 3,
    title: "Tech Team Collaboration",
    category: "Team",
    date: "2024",
    location: "Remote",
    description: "Working with development team on cross-lingual NLP system",
    image: "/placeholder.svg",
    tags: ["NLP", "Team Work", "Development"]
  },
  {
    id: 4,
    title: "Certificate Achievement",
    category: "Achievement",
    date: "2024",
    location: "Online",
    description: "Receiving Data Science with Generative AI certification from PW Skills",
    image: "/placeholder.svg",
    tags: ["Certificate", "Learning", "Achievement"]
  },
  {
    id: 5,
    title: "Open Source Contribution",
    category: "Project",
    date: "2024",
    location: "GitHub",
    description: "Contributing to open source projects in AI and machine learning",
    image: "/placeholder.svg",
    tags: ["Open Source", "GitHub", "Contribution"]
  },
  {
    id: 6,
    title: "Tech Workshop Participation",
    category: "Learning",
    date: "2024",
    location: "Tech Hub",
    description: "Attending advanced machine learning workshop with industry experts",
    image: "/placeholder.svg",
    tags: ["Workshop", "Learning", "Networking"]
  }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Hackathon", "Project", "Team", "Achievement", "Learning"];

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-portfolio-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-portfolio-text mb-4 text-center">
            <span className="text-portfolio-accent">Gallery</span> & Highlights
          </h2>
          <p className="text-lg text-portfolio-text-muted text-center mb-12 max-w-3xl mx-auto">
            A visual journey through my professional experiences, hackathon victories, 
            project showcases, and learning milestones in AI and data science.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-portfolio-accent text-portfolio-bg font-medium"
                    : "bg-portfolio-bg text-portfolio-text-muted hover:text-portfolio-accent border border-portfolio-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="bg-portfolio-bg border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow cursor-pointer group overflow-hidden">
                    <div className="aspect-video bg-portfolio-surface relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-portfolio-bg/80 to-transparent z-10" />
                      <div className="absolute inset-0 flex items-center justify-center bg-portfolio-surface">
                        <Image className="h-16 w-16 text-portfolio-text-muted" />
                      </div>
                      <div className="absolute bottom-4 left-4 z-20">
                        <Badge className="bg-portfolio-accent text-portfolio-bg">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-portfolio-text mb-2 group-hover:text-portfolio-accent transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-portfolio-text-muted text-sm mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{item.date}</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{item.location}</span>
                      </div>
                      <p className="text-portfolio-text-muted text-sm line-clamp-2">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-portfolio-surface border-portfolio-border">
                  <div className="space-y-4">
                    <div className="aspect-video bg-portfolio-bg rounded-lg flex items-center justify-center">
                      <Image className="h-24 w-24 text-portfolio-text-muted" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-portfolio-text">{item.title}</h3>
                        <Badge className="bg-portfolio-accent text-portfolio-bg">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="flex items-center text-portfolio-text-muted mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{item.date}</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{item.location}</span>
                      </div>
                      <p className="text-portfolio-text-muted mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-portfolio-accent text-portfolio-accent">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}