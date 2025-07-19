import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Twitter, Eye, EyeOff } from 'lucide-react';

interface Example {
  name: string;
  url: string;
  description: string;
  twitter?: string;
  recommended?: boolean;
  logo?: string;
}


interface FocusArea {
  id: string;
  title: string;
  description: string;
  categoryUrl?: string;
  examples: Example[];
}

const FocusAreas = () => {
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    fetch('/data/focus-areas.json')
      .then(response => response.json())
      .then(data => setFocusAreas(data))
      .catch(error => console.error('Error loading focus areas:', error));
  }, []);

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <section id="focus-areas" className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-grotesk font-semibold text-foreground">
              Our Focus Areas
            </h2>
            <Button
              onClick={() => setShowExamples(!showExamples)}
              variant="outline"
              className="flex items-center gap-2 border-border text-foreground hover:bg-muted"
            >
              {showExamples ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showExamples ? 'Hide Examples' : 'Show Examples'}
            </Button>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            The Infrastructure Committee will consider any proposal that helps make the network 
            a more compelling place for web3 builders and users. That includes, but is not limited to, these key areas:
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {focusAreas.map((area) => {
            const isExpanded = expandedCards.has(area.id);
            return (
            <Card key={area.id} className="bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => toggleCard(area.id)}>
              <CardHeader>
                <CardTitle className="text-xl font-grotesk font-semibold text-foreground mb-3 flex items-center justify-between">
                  {area.title}
                  {area.categoryUrl && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                      onClick={(e) => e.stopPropagation()}
                    >
                       <a
                         href={area.categoryUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                       >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {area.description}
                </CardDescription>
              </CardHeader>
              
              {area.examples.length > 0 && (showExamples || isExpanded) && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <h4 className="font-grotesk font-medium text-foreground text-sm uppercase tracking-wide">
                      Examples on NEAR
                    </h4>
                     {area.examples.map((example, index) => {
                       return (
                       <div key={index} 
                            className="flex items-start justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors group">
                         <div className="flex items-start gap-3 flex-grow">
                            {example.logo && (
                              <div className="flex-shrink-0">
                                <img 
                                  src={example.logo} 
                                  alt={`${example.name} logo`}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              </div>
                            )}
                           <div className="flex-grow min-w-0">
                           <div className="flex items-center gap-2 mb-1">
                             {example.url && example.url !== '#' ? (
                                <a
                                  href={example.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-grotesk font-medium text-foreground group-hover:text-primary transition-colors"
                                >
                                 {example.name}
                               </a>
                             ) : (
                               <span className="font-grotesk font-medium text-foreground">
                                 {example.name}
                               </span>
                             )}
                            {example.recommended && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                Recommended
                              </span>
                            )}
                          </div>
                             <p className="text-sm text-muted-foreground leading-relaxed">
                               {example.description}
                             </p>
                           </div>
                         </div>
                         <div className="flex items-center gap-2 ml-3">
                           {example.twitter && (
                             <Button
                               asChild
                               variant="ghost"
                               size="sm"
                               className="p-1 h-auto text-muted-foreground hover:text-primary"
                               onClick={(e) => e.stopPropagation()}
                             >
                                <a
                                  href={example.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${example.name} Twitter`}
                                >
                                 <Twitter className="w-3 h-3" />
                               </a>
                             </Button>
                           )}
                           {example.url && example.url !== '#' && (
                             <Button
                               asChild
                               variant="ghost"
                               size="sm"
                               className="p-1 h-auto text-muted-foreground hover:text-primary"
                               onClick={(e) => e.stopPropagation()}
                             >
                                <a
                                  href={example.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Visit ${example.name}`}
                                >
                                 <ExternalLink className="w-3 h-3" />
                               </a>
                             </Button>
                           )}
                        </div>
                         </div>
                       );
                     })}
                  </div>
                  {area.categoryUrl && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-border text-foreground hover:bg-muted"
                        onClick={(e) => e.stopPropagation()}
                      >
                         <a 
                           href={area.categoryUrl} 
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2"
                         >
                          View All {area.title} Projects
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;