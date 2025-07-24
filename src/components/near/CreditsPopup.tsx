import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Gift } from 'lucide-react';

interface Credit {
  name: string;
  description: string;
  link: string;
}

interface CreditsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditsPopup = ({ isOpen, onClose }: CreditsPopupProps) => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetch('/data/credits.json')
        .then(response => response.json())
        .then(data => {
          setCredits(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading credits:', error);
          setLoading(false);
        });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-grotesk">
            <Gift className="w-6 h-6 text-primary" />
            Infrastructure Credits
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The NEAR Infrastructure Committee partners with leading service providers to offer exclusive credits and benefits to qualified founders building on NEAR.
          </p>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {credits.map((credit, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg font-grotesk">{credit.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                      {credit.description}
                    </CardDescription>
                    <Button
                      asChild
                      variant="outline"
                      className="border-border text-foreground hover:bg-muted"
                    >
                      <a
                        href={credit.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && credits.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No credits available at the moment.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditsPopup;