import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ExternalLink, FileText, MessageSquare, Target, Users, BookOpen } from 'lucide-react';
const NEARHero = () => {
  // Navigation items that were in the navbar
  const navItems = [{
    title: 'Get Funding',
    href: 'https://nearn.io/infra-committee/7',
    external: true,
    icon: FileText,
    description: 'Submit your proposal to get funding for infrastructure projects'
  }, {
    title: 'RFP',
    href: 'https://nearn.io/infra-committee/',
    external: true,
    icon: Target,
    description: 'Browse open requests for proposals and funding opportunities'
  }, {
    title: 'Feedback',
    href: 'https://nearn.io//listing/near-infrastructure-ecosystem-feedback-page-no-payment/',
    external: true,
    icon: MessageSquare,
    description: 'Share your thoughts on NEAR infrastructure ecosystem needs'
  }, {
    title: 'Focus',
    href: '#focus-areas',
    icon: Target,
    description: 'Explore our key focus areas and supported infrastructure types'
  }, {
    title: 'Team',
    href: '#team',
    icon: Users,
    description: 'Meet the committee members and working group'
  }, {
    title: 'Blog',
    href: '#blog',
    icon: BookOpen,
    description: 'Read the latest updates and announcements'
  }];
  return <section className="pt-20 md:pt-24 pb-12 md:pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-grotesk font-semibold text-foreground mb-6 md:mb-8 leading-tight">
            NEAR Infrastructure
            <br />
            <span className="text-primary">Committee</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl leading-relaxed">
            The NEAR Infrastructure Committee (IC) is{' '}
            <strong className="text-foreground">a group focused on strengthening the network's foundational infrastructure</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-16 md:mb-20">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg w-full sm:w-auto">
              <a href="https://nearn.io/infra-committee/7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Submit A Proposal
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-muted px-8 py-4 text-lg w-full sm:w-auto">
              <a href="https://nearn.io/infra-committee/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                See our RFPs
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div>
              <div className="text-3xl md:text-4xl font-grotesk font-semibold text-primary mb-2">$4M+</div>
              <div className="text-base md:text-lg text-muted-foreground">Funding Committed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-grotesk font-semibold text-primary mb-2">20</div>
              <div className="text-base md:text-lg text-muted-foreground">Projects Funded</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-grotesk font-semibold text-primary mb-2">8</div>
              <div className="text-base md:text-lg text-muted-foreground">Focus Areas</div>
            </div>
          </div>

          {/* Apply Credits Card */}
          <Card className="bg-card border-border mb-12 max-w-md">
            <CardHeader>
              <CardTitle className="text-xl font-grotesk font-semibold text-foreground">Apply for NEAR Infra Credits</CardTitle>
              <CardDescription className="text-muted-foreground">
                Get funding for your infrastructure project through our credit program.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <a 
                  href="https://nearn.io/infra-committee/5/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 justify-center"
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navItems.filter(item => !['Focus', 'Team', 'Blog'].includes(item.title)).map(item => {
              const IconComponent = item.icon;
              return <Card key={item.title} className="bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:translate-y-[-2px]" onClick={() => {
                if (item.external) {
                  window.open(item.href, '_blank', 'noopener,noreferrer');
                } else {
                  document.querySelector(item.href)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }
              }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                          <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <CardTitle className="text-lg font-grotesk font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                          {item.external && <ExternalLink className="w-4 h-4 inline ml-1" />}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-muted-foreground text-base leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>;
            })}
          </div>
        </div>
      </div>
    </section>;
};
export default NEARHero;