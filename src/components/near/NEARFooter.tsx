import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const NEARFooter = () => {
  const supportLinks = [
    { title: 'House of Stake', url: 'https://houseofstake.com' },
    { title: 'NEAR Founder Hub', url: 'https://www.near.org/founder-hub' },
    { title: 'NEAR Protocol Rewards', url: 'https://www.nearprotocolrewards.com/' },
    { title: 'Proximity.dev', url: 'https://proximity.dev' },
  ];

  const communityLinks = [
    { title: 'NEAR Tools Community', url: 'https://t.me/@NEAR_Tools_Community_Group' },
    { title: 'NEAR Dev Community', url: 'https://t.me/@neardev' },
  ];

  const resourceLinks = [
    { title: 'NEAR News', url: 'https://nearweek.com' },
    { title: 'NEAR Status', url: 'https://status.near.org' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src="/nearinfrastrcuturelogoblack.svg" 
                alt="near infrastructure Committee" 
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              NEAR is the user-owned AI stack, blockchain, chain abstraction, AI.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a
                href="https://nearn.io/infra-committee/7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit Proposal
              </a>
            </Button>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-grotesk font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1"
                  >
                    {link.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Networks */}
          <div>
            <h3 className="font-grotesk font-semibold text-foreground mb-4">Support Networks</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1"
                  >
                    {link.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-grotesk font-semibold text-foreground mb-4">Support Channels</h3>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1"
                  >
                    {link.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 <span className="near-infra-highlight">near infrastructure</span> Committee.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://near.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              NEAR.org
            </a>
            <a
              href="https://near.foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              NEAR Foundation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NEARFooter;