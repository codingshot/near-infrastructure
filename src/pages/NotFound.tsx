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
      <div className="text-center max-w-md mx-auto px-4">
        {/* Animated 404 with metallic effect */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4 metallic-gradient">
          404
        </h1>
        
        {/* Error message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-muted-foreground mb-4 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved to a different location.
        </p>
        
        <p className="text-sm text-muted-foreground/70 mb-8">
          You'll be automatically redirected to the home page in 10 seconds.
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
            onClick={() => navigate("/")} 
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
      </main>
      <NEARFooter />
    </div>
  );
};

export default NotFound;
