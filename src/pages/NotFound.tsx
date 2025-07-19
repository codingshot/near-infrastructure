import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Animated 404 with metallic effect */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4 metallic-gradient">
          404
        </h1>
        
        {/* Error message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved to a different location.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline" 
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          
          <Button 
            onClick={() => window.location.href = "/"} 
            className="w-full sm:w-auto logo-glow"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 text-muted-foreground/50">
          <Search className="w-16 h-16 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
