import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const ProposalProcessTooltip = () => {
  const steps = [
    {
      number: 1,
      title: 'Respond to RFP or Submit Proposal',
      description: 'Submit your proposal on nearn.io/infra-committee',
      link: 'https://nearn.io/infra-committee/7/1'
    },
    {
      number: 2,
      title: 'Contact WG',
      description: 'Reach out to working group members on Twitter to discuss your submission'
    },
    {
      number: 3,
      title: 'Rolling Acceptance',
      description: 'Applications are accepted on a rolling basis'
    },
    {
      number: 4,
      title: 'Weekly Presentation',
      description: 'Proposals are presented during our weekly Monday Infrastructure Committee meetings'
    },
    {
      number: 5,
      title: 'Committee Vote',
      description: 'Decisions are voted on during these Monday meetings'
    }
  ];

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="mb-8 text-center">
        <h3 className="text-2xl md:text-3xl font-grotesk font-semibold text-foreground mb-4">
          How to Submit and Track Your Proposal
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow these steps to submit your proposal and participate in our decision-making process
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {steps.map((step) => {
          return (
            <Card 
              key={step.number} 
              className="bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-primary">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-grotesk font-bold text-foreground mb-1 text-base">
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {step.link && (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                  >
                    Visit <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Note:</strong> The NF Working Group meets on Wednesdays to prepare strategy, administrative work, and workflows.
        </p>
      </div>
    </div>
  );
};

export default ProposalProcessTooltip;