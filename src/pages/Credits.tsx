import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import SEO from '@/components/SEO';

interface Credit {
  name: string;
  description: string;
  link: string;
}

const Credits = () => {
  const [credits, setCredits] = useState<Credit[]>([]);

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const response = await fetch('/data/credits.json');
        const data = await response.json();
        setCredits(data);
      } catch (error) {
        console.error('Error loading credits:', error);
      }
    };
    loadCredits();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free NEAR Infrastructure Credits",
    "description": "Get free infrastructure credits for NEAR blockchain development. Access discounted RPC services from Lava RPC and FastNEAR RPC.",
    "url": "https://nearinfra.com/credits",
    "provider": {
      "@type": "Organization", 
      "name": "NEAR Infrastructure Committee"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Lava RPC Credits",
        "description": "Decentralized RPC offering $200 worth of monthly credits to qualified founders"
      },
      {
        "@type": "Offer", 
        "name": "FastNEAR RPC Credits",
        "description": "FastNear RPC sponsorship for NEAR builders with multiple monthly plans"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free NEAR Infrastructure Credits | Lava RPC & FastNEAR RPC"
        description="Get free infrastructure credits for NEAR blockchain development. Access discounted RPC services from Lava RPC ($200/month) and FastNEAR RPC. Apply now for developer credits."
        keywords="NEAR credits, free RPC credits, NEAR infrastructure, blockchain development, Lava RPC, FastNEAR RPC, NEAR blockchain, developer credits, infrastructure providers"
        canonical="https://nearinfra.com/credits"
        ogImage="https://nearinfra.com/new-og-image.png"
        structuredData={structuredData}
      />
      <NEARNavbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="hero-text max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-grotesk font-semibold text-foreground mb-4 md:mb-6 leading-tight text-center">
          Get <span className="near-infra-highlight">near infra</span> Credits
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl leading-relaxed mx-auto text-center">
          Get free infrastructure credits if you are a serious builder. Choose from our partner providers below to accelerate your NEAR development.
        </p>
      </div>

      {/* Credits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {credits.map((credit, idx) => (
          <Card key={idx} className="h-full border-2 hover:border-primary/20 transition-all duration-300 group hover:translate-y-[-2px]">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl font-grotesk font-semibold group-hover:text-primary transition-colors">
                {credit.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full p-6 pt-0">
              <p className="text-muted-foreground mb-6 flex-grow leading-relaxed text-sm md:text-base">
                {credit.description}
              </p>
              <Button 
                asChild 
                size="lg" 
                className="w-full group-hover:bg-primary/90 transition-all duration-300"
              >
                <a 
                  href={credit.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Get Credits
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Provider Application Section */}
      <div className="bg-muted/30 rounded-2xl p-6 border-2 border-muted mt-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-grotesk font-semibold mb-4">
            Are you an Infrastructure Provider?
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Want your clients subsidized? Apply for your own credit program and help support the NEAR ecosystem of builders.
          </p>
          <Button asChild size="lg" variant="outline" className="border-2">
            <a 
              href="https://nearn.io/infra-committee/5/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Apply for Credit Program
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
        </div>
      </main>

      <NEARFooter />
    </div>
  );
};

export default Credits;