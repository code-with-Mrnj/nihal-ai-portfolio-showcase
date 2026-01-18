import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Image, Calendar, MapPin } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  tags: string[];
  display_order: number;
}

// Fallback items for when database is empty
const fallbackItems: GalleryItem[] = [
  {
    id: "1",
    title: "AI/ML Hackathon Winner",
    category: "Hackathon",
    date: "2024",
    location: "Tech Conference Delhi",
    description: "First place in AI/ML hackathon with innovative cryptocurrency prediction model",
    image_url: "/placeholder.svg",
    tags: ["AI", "Machine Learning", "Winner"],
    display_order: 0
  },
  {
    id: "2",
    title: "Data Science Project Showcase",
    category: "Project",
    date: "2024",
    location: "University Campus",
    description: "Presenting diamond price prediction model at university tech expo",
    image_url: "/placeholder.svg",
    tags: ["Data Science", "Presentation", "University"],
    display_order: 1
  },
  {
    id: "3",
    title: "Tech Team Collaboration",
    category: "Team",
    date: "2024",
    location: "Remote",
    description: "Working with development team on cross-lingual NLP system",
    image_url: "/placeholder.svg",
    tags: ["NLP", "Team Work", "Development"],
    display_order: 2
  }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: galleryItems = [], isLoading } = useQuery({
    queryKey: ["gallery-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as GalleryItem[];
    },
  });

  // Use fallback items if database is empty
  const displayItems = galleryItems.length > 0 ? galleryItems : fallbackItems;
  const categories = ["All", "Hackathon", "Project", "Team", "Achievement", "Learning", "Event"];

  const filteredItems = selectedCategory === "All" 
    ? displayItems 
    : displayItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 relative">
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

          {/* Loading State */}
          {isLoading && (
            <div className="text-center text-portfolio-text-muted py-12">
              Loading gallery...
            </div>
          )}

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-portfolio-bg border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow cursor-pointer group overflow-hidden">
                <div className="aspect-video bg-portfolio-surface relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-portfolio-bg/80 to-transparent z-10" />
                  {item.image_url && item.image_url !== "/placeholder.svg" ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-portfolio-surface">
                      <Image className="h-16 w-16 text-portfolio-text-muted" />
                    </div>
                  )}
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
            ))}
          </div>

          {/* Empty state */}
          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center text-portfolio-text-muted py-12">
              No items in this category yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}