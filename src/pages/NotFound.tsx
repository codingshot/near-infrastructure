import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import NEARNavbar from "@/components/near/NEARNavbar";
import NEARFooter from "@/components/near/NEARFooter";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Auto-redirect to home page after 10 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Page Not Found | NEAR Infrastructure Committee"
        description="The page you're looking for doesn't exist. Return to the NEAR Infrastructure Committee homepage to explore our projects, team, and focus areas."
        noIndex={true}
      />
      <NEARNavbar />
      <main className="pt-20 pb-16 flex items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="text-center max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated 404 with metallic effect */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 md:mb-6 metallic-gradient text-center">
            404
          </h1>
          
          {/* Error message */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 md:mb-6 text-center">
            Page Not Found
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-4 md:mb-6 max-w-md mx-auto leading-relaxed text-center">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
          
          <p className="text-sm text-muted-foreground/70 mb-6 md:mb-8 text-center">
            You'll be automatically redirected to the home page in 10 seconds.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-sm mx-auto">
            <Button 
              onClick={() => window.history.back()} 
              variant="outline" 
              className="w-full sm:w-auto"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            
            <Button 
              onClick={() => navigate("/")} 
              className="w-full sm:w-auto logo-glow"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="mt-8 md:mt-12 text-muted-foreground/50 flex justify-center">
            <Search className="w-12 h-12 sm:w-16 sm:h-16 animate-pulse" />
          </div>
        </div>
      </main>
      <NEARFooter />
    </div>
  );
};

export default NotFound;
