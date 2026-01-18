import { useState, useRef, TouchEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Image, Calendar, MapPin, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";

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
  media_type?: string;
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
    display_order: 0,
    media_type: "image"
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
    display_order: 1,
    media_type: "image"
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
    display_order: 2,
    media_type: "image"
  }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Swipe gesture state
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

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

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
    } else {
      setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
    }
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - go to next
        navigateLightbox('next');
      } else {
        // Swiped right - go to prev
        navigateLightbox('prev');
      }
    }
    
    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const currentItem = filteredItems[lightboxIndex];

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
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="bg-portfolio-bg border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow cursor-pointer group overflow-hidden"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-video bg-portfolio-surface relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-portfolio-bg/80 to-transparent z-10 pointer-events-none" />
                  {item.image_url && item.image_url !== "/placeholder.svg" ? (
                    item.media_type === 'video' ? (
                      <video 
                        src={item.image_url}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        muted
                        loop
                        autoPlay
                        playsInline
                      />
                    ) : (
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )
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

      {/* Fullscreen Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none flex items-center justify-center">
          {currentItem && (
            <>
              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Previous Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('prev');
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="h-8 w-8 text-white" />
                </button>
              )}

              {/* Media Content */}
              <div 
                className="flex flex-col items-center justify-center w-full h-full p-8"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative max-w-full max-h-[75vh] flex items-center justify-center">
                  {currentItem.media_type === 'video' ? (
                    <video
                      key={currentItem.id}
                      src={currentItem.image_url}
                      className="max-w-full max-h-[75vh] object-contain rounded-lg"
                      controls
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={currentItem.image_url}
                      alt={currentItem.title}
                      className="max-w-full max-h-[75vh] object-contain rounded-lg"
                    />
                  )}
                </div>

                {/* Caption */}
                <div className="mt-4 text-center max-w-2xl">
                  <h3 className="text-xl font-semibold text-white mb-2">{currentItem.title}</h3>
                  <div className="flex items-center justify-center text-gray-400 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{currentItem.date}</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{currentItem.location}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{currentItem.description}</p>
                </div>

                {/* Item Counter */}
                <div className="mt-4 text-gray-500 text-sm">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>

              {/* Next Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('next');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="h-8 w-8 text-white" />
                </button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}