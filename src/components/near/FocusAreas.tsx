import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Twitter } from 'lucide-react';

interface Example {
  name: string;
  url: string;
  description: string;
  twitter?: string;
  recommended?: boolean;
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

  useEffect(() => {
    fetch('/data/focus-areas.json')
      .then(response => response.json())
      .then(data => setFocusAreas(data))
      .catch(error => console.error('Error loading focus areas:', error));
  }, []);

  return (
    <section id="focus-areas" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Our Focus Areas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The Infrastructure Committee will consider any proposal that helps make the NEAR ecosystem 
            a more compelling place for web3 builders and users. That includes, but is not limited to, these key areas:
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area) => (
            <Card key={area.id} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                  {area.title}
                  {area.categoryUrl && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-near-500 hover:text-near-600"
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
                <CardDescription className="text-gray-600">
                  {area.description}
                </CardDescription>
              </CardHeader>
              
              {area.examples.length > 0 && (
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700 text-sm uppercase tracking-wide">
                      Examples on NEAR
                    </h4>
                    {area.examples.map((example, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <a
                                href={example.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-near-600 hover:text-near-700 transition-colors"
                              >
                                {example.name}
                              </a>
                              {example.recommended && (
                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-near-100 text-near-700 rounded-full">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {example.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            {example.twitter && (
                              <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="p-1 h-auto"
                              >
                                <a
                                  href={example.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Twitter className="w-3 h-3 text-blue-500" />
                                </a>
                              </Button>
                            )}
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="p-1 h-auto"
                            >
                              <a
                                href={example.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-3 h-3 text-gray-400" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;