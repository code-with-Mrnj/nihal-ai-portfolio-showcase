import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-portfolio-bg">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-portfolio-accent mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-portfolio-text mb-2">Page Not Found</h2>
          <p className="text-portfolio-text-muted">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="portfolio" 
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
          <Button 
            variant="portfolio-outline" 
            size="lg"
            asChild
          >
            <a href="/">
              <Home className="h-5 w-5 mr-2" />
              Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
