import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Calendar, Users, Vote, MessageSquare } from 'lucide-react';

const ProposalProcessTooltip = () => {
  const steps = [
    {
      number: 1,
      title: 'Submit Your Proposal',
      description: 'Submit your proposal on nearn.io/infra-committee',
      icon: ExternalLink,
      link: 'https://nearn.io/infra-committee/7/1'
    },
    {
      number: 2,
      title: 'Engage with Community',
      description: 'Reach out to working group members on Twitter to discuss your submission',
      icon: MessageSquare
    },
    {
      number: 3,
      title: 'Rolling Acceptance',
      description: 'Applications are accepted on a rolling basis',
      icon: Calendar
    },
    {
      number: 4,
      title: 'Weekly Presentation',
      description: 'Proposals are presented during our weekly Monday Infrastructure Committee meetings',
      icon: Users
    },
    {
      number: 5,
      title: 'Committee Vote',
      description: 'Decisions are voted on during these Monday meetings',
      icon: Vote
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Card 
              key={step.number} 
              className="bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover-scale"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-primary">{step.number}</span>
                  </div>
                  <Icon className="w-6 h-6 text-primary mx-auto" />
                </div>
                <h4 className="font-grotesk font-semibold text-foreground mb-2 text-sm">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {step.link && (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-primary hover:text-primary/80 transition-colors"
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