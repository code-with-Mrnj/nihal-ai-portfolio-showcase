import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GalleryAdmin } from "@/components/GalleryAdmin";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        navigate("/auth");
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-portfolio-bg flex items-center justify-center">
        <div className="text-portfolio-text">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-portfolio-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-portfolio-bg/95 backdrop-blur border-b border-portfolio-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-portfolio-text-muted hover:text-portfolio-text"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
              <div className="h-6 w-px bg-portfolio-border" />
              <h1 className="text-xl font-semibold text-portfolio-text flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-portfolio-accent" />
                Gallery Admin
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-portfolio-border text-portfolio-text-muted hover:text-portfolio-text"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <GalleryAdmin />
      </main>
    </div>
  );
}
