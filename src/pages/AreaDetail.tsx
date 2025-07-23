import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Twitter } from 'lucide-react';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import { findItemBySlug } from '@/utils/slugs';
import SEO from '@/components/SEO';

interface Example {
  name: string;
  url: string;
  description: string;
  twitter?: string;
  recommended?: boolean;
  funded?: boolean;
  logo?: string;
}

interface FocusArea {
  id: string;
  title: string;
  description: string;
  categoryUrl?: string;
  examples: Example[];
}

const AreaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [area, setArea] = useState<FocusArea | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadArea = async () => {
      try {
        const response = await fetch('/data/focus-areas.json');
        const data = await response.json();
        const foundArea = findItemBySlug(data.map((area: FocusArea) => ({ ...area, name: area.title })), slug || '');
        setArea(foundArea ? data.find((area: FocusArea) => area.title === foundArea.name) || null : null);
      } catch (error) {
        console.error('Error loading focus area:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArea();
  }, [slug]);

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NEARNavbar />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </main>
        <NEARFooter />
      </div>
    );
  }

  if (!area) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="Focus Area Not Found | NEAR Infrastructure Committee"
          description="The requested focus area could not be found. Explore other NEAR infrastructure focus areas and development priorities."
          noIndex={true}
        />
        <NEARNavbar />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              onClick={() => navigate('/areas')}
              variant="ghost"
              className="mb-8 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Focus Areas
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-grotesk font-semibold text-foreground mb-4">
                Focus Area Not Found
              </h1>
              <p className="text-muted-foreground">
                The focus area you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </main>
        <NEARFooter />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${area.title} - NEAR Infrastructure Focus Area`,
    "description": area.description,
    "url": `https://nearinfra.com/areas/${slug}`,
    "about": {
      "@type": "Thing",
      "name": area.title,
      "description": area.description
    },
    "publisher": {
      "@type": "Organization",
      "name": "NEAR Infrastructure Committee",
      "url": "https://nearinfra.com"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${area.title} | NEAR Infrastructure Focus Area`}
        description={`${area.description} Explore ${area.title} projects, examples, and development opportunities in the NEAR Protocol ecosystem.`}
        keywords={`${area.title}, NEAR infrastructure, blockchain development, Web3 focus area, NEAR Protocol, infrastructure development`}
        canonical={`https://nearinfra.com/areas/${slug}`}
        structuredData={structuredData}
      />
      <NEARNavbar />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={() => navigate('/areas')}
            variant="ghost"
            className="mb-8 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Focus Areas
          </Button>

          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-grotesk font-semibold text-foreground">
                  {area.title}
                </CardTitle>
                {area.categoryUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <a
                      href={area.categoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Category
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
              <CardDescription className="text-lg leading-relaxed">
                {area.description}
              </CardDescription>
            </CardHeader>
          </Card>

          {area.examples.length > 0 && (
            <div>
              <h2 className="text-2xl font-grotesk font-semibold text-foreground mb-6">
                Examples on NEAR
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {area.examples.map((example, index) => (
                  <Card key={index} className="bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        {example.logo && !imageErrors.has(example.logo) && (
                          <div className="flex-shrink-0">
                            <img 
                              src={example.logo} 
                              alt={`${example.name} logo`}
                              className="w-10 h-10 rounded-full object-cover"
                              onError={() => handleImageError(example.logo!)}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-lg font-grotesk font-semibold text-foreground">
                            {example.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {example.recommended && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                Recommended
                              </span>
                            )}
                            {example.funded && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                                Funded
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                        {example.description}
                      </CardDescription>
                      <div className="flex items-center gap-2">
                        {example.url && example.url !== '#' && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <a
                              href={example.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit Project
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                        {example.twitter && (
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <a
                              href={example.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Twitter className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <NEARFooter />
    </div>
  );
};

export default AreaDetail;