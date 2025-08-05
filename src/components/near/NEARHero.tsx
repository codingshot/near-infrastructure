import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, FileText, MessageSquare, Target, Users, BookOpen, CreditCard } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import CountUp from 'react-countup';
import HeroBackground3D from '../HeroBackground3D';

const NEARHero = () => {
  const [showStats, setShowStats] = useState(false);
  const [credits, setCredits] = useState([]);

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
  
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      skipSnaps: false,
      dragFree: false,
      containScroll: false,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 1 },
        '(min-width: 1024px)': { slidesToScroll: 1 }
      }
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })]
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // All action cards including Apply Credits
  const actionCards = [

    {
      title: 'Get Funding',
      href: 'https://nearn.io/infra-committee/7',
      external: true,
      icon: FileText,
      description: 'Submit your proposal to get funding for infrastructure projects.',
      buttonText: 'Submit Proposal'
    },
    {
      title: 'RFPs',
      href: 'https://nearn.io/infra-committee/',
      external: true,
      icon: Target,
      description: 'Browse open requests for proposals and funding opportunities.',
      buttonText: 'View RFPs'
    },
    {
      title: 'Get near infra Credits',
      href: 'https://nearn.io/infra-committee/5/',
      external: true,
      icon: CreditCard,
      description: 'Get free infrastructure credits if you are a serious builder',
      buttonText: 'Get Credits',
      showPopup: true
    },
    {
      title: 'Feedback',
      href: 'https://nearn.io//listing/near-infrastructure-ecosystem-feedback-page-no-payment/',
      external: true,
      icon: MessageSquare,
      description: 'Share your thoughts on near infrastructure ecosystem needs.',
      buttonText: 'Give Feedback'
    }
  ];

  return (
    <section className="relative pt-20 md:pt-24 pb-12 md:pb-16 bg-background overflow-hidden">
      <HeroBackground3D />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="hero-text max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-grotesk font-semibold text-foreground mb-4 md:mb-6 leading-tight text-center">
            <span className="metallic-gradient">strengthening</span>
            <br />
            <span className="near-infra-highlight">near infrastructure</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl leading-relaxed mx-auto text-center">
            The <span className="near-infra-highlight">near infrastructure</span> Committee (IC) is{' '}
            <strong className="text-foreground">a group focused on strengthening the network's foundational infrastructure</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
            <Button 
              asChild 
              size="lg" 
              className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto"
            >
              <a href="https://nearn.io/infra-committee/7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                Submit A Proposal
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-muted px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
              <a href="https://nearn.io/infra-committee/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                See our RFPs
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-grotesk font-semibold mb-2">
                {showStats ? (
                  <CountUp 
                    end={4} 
                    duration={2.5} 
                    suffix="M+" 
                    preserveValue
                    className="metallic-gradient"
                  />
                ) : (
                  <span className="metallic-gradient">$0M+</span>
                )}
              </div>
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground">Funding Committed</div>
            </div>
            <div className="cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open('/projects', '_self')}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-grotesk font-semibold mb-2">
                {showStats ? (
                  <CountUp 
                    end={20} 
                    duration={2.5} 
                    suffix="+" 
                    preserveValue
                    className="metallic-gradient"
                  />
                ) : (
                  <span className="metallic-gradient">0+</span>
                )}
              </div>
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground">Projects Funded</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-grotesk font-semibold mb-2">
                {showStats ? (
                  <CountUp 
                    end={3} 
                    duration={2.5} 
                    preserveValue
                    className="metallic-gradient"
                  />
                ) : (
                  <span className="metallic-gradient">0</span>
                )}
              </div>
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground">Support Programs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards Carousel - Full Width */}
      <div className="mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-grotesk font-semibold text-foreground">Quick Actions</h2>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6 px-4 sm:px-6 lg:px-8">
            {actionCards.map((card, index) => {
              const IconComponent = card.icon;
              
              const CardComponent = (
                <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:translate-y-[-2px] h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                      </div>
                       <CardTitle className="text-lg md:text-xl font-grotesk font-semibold text-foreground group-hover:text-primary transition-colors">
                         {card.title === 'Get near infra Credits' ? (
                           <>Get <span className="near-infra-highlight">near infra</span> Credits</>
                         ) : (
                           card.title
                         )}
                       </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                     <CardDescription className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                       {card.description === 'Share your thoughts on near infrastructure ecosystem needs.' ? (
                         <>Share your thoughts on <span className="near-infra-highlight">near infrastructure</span> ecosystem needs.</>
                       ) : (
                         card.description
                       )}
                     </CardDescription>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground pointer-events-none"
                    >
                      {card.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              );

              return (
                <div key={index} className="flex-none w-[280px] sm:w-[320px] md:w-[350px]">
                  {card.showPopup ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        {CardComponent}
                      </DialogTrigger>
                       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                         <DialogHeader>
                           <DialogTitle className="text-xl sm:text-2xl font-grotesk font-semibold">
                             Get <span className="near-infra-highlight">near infra</span> Credits
                           </DialogTitle>
                         </DialogHeader>
                         <div className="space-y-4">
                           <p className="text-muted-foreground text-sm sm:text-base">
                             Get free infrastructure credits if you are a serious builder. Choose from our partner providers:
                           </p>
                           {credits.map((credit, idx) => (
                             <Card key={idx} className="p-3 sm:p-4">
                               <div className="flex items-start justify-between">
                                 <div className="flex-1">
                                   <div className="flex items-center gap-3 mb-2">
                                     <img 
                                       src={credit.logo} 
                                       alt={`${credit.name} logo`}
                                       className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded-full flex-shrink-0"
                                     />
                                     <div className="flex items-center gap-2 flex-wrap">
                                       <h3 className="font-semibold text-base sm:text-lg">{credit.name}</h3>
                                       {credit.status === 'soon' && (
                                         <Badge variant="secondary" className="text-xs">Soon</Badge>
                                       )}
                                     </div>
                                   </div>
                                   <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">{credit.description}</p>
                                 </div>
                               </div>
                               <Button 
                                 asChild={credit.status !== 'soon'} 
                                 className={`w-full ${credit.status === 'soon' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                 disabled={credit.status === 'soon'}
                               >
                                 {credit.status === 'soon' ? (
                                   <span className="flex items-center justify-center gap-2">
                                     Coming Soon
                                   </span>
                                 ) : (
                                   <a href={credit.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                     Get Credits <ExternalLink className="w-4 h-4" />
                                   </a>
                                 )}
                               </Button>
                             </Card>
                           ))}
                           <div className="mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg border">
                             <p className="text-xs sm:text-sm text-muted-foreground">
                               Are you a NEAR Infra provider and want your clients subsidized, apply for your own credit program{' '}
                               <a href="https://nearn.io/infra-committee/5/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                                 here
                               </a>
                             </p>
                           </div>
                         </div>
                       </DialogContent>
                    </Dialog>
                  ) : (
                    <div onClick={() => window.open(card.href, '_blank', 'noopener,noreferrer')}>
                      {CardComponent}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NEARHero;