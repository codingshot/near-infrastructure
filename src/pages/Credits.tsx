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
    "name": "NEAR Infrastructure Credits",
    "description": "Get free infrastructure credits for NEAR builders from our partner providers.",
    "url": "https://nearinfra.com/credits"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="NEAR Infrastructure Credits | Free Credits for Builders"
        description="Get free infrastructure credits if you are a serious NEAR builder. Choose from our partner providers including Lava RPC and FastNEAR RPC."
        keywords="NEAR credits, infrastructure credits, NEAR builders, RPC credits, blockchain infrastructure"
        canonical="https://nearinfra.com/credits"
        structuredData={structuredData}
      />
      <NEARNavbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-grotesk font-bold mb-6">
              Get <span className="near-infra-highlight">near infra</span> Credits
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get free infrastructure credits if you are a serious builder. Choose from our partner providers below to accelerate your NEAR development.
            </p>
          </div>

          {/* Credits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {credits.map((credit, idx) => (
              <Card key={idx} className="h-full border-2 hover:border-primary/20 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-grotesk group-hover:text-primary transition-colors">
                    {credit.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
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
          <div className="bg-muted/30 rounded-2xl p-8 border-2 border-muted">
            <div className="text-center max-w-3xl mx-auto">
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