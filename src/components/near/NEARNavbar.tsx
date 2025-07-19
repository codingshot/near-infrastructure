import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NEARNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Simplified navbar - main navigation moved to hero cards
  const quickLinks = [
    { title: 'RFPs', href: 'https://nearn.io/infra-committee/', external: true },
    { title: 'Get Funding', href: 'https://nearn.io/infra-committee/7', external: true },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2 md:space-x-3">
              <img src="/favicon.ico" alt="NEAR" className="w-7 h-7 md:w-8 md:h-8 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-all duration-300" />
              <span className="font-grotesk font-semibold text-foreground text-sm md:text-lg lg:text-xl">
                <span className="hidden sm:inline">NEAR INFRA</span>
                <span className="sm:hidden">NEAR IC</span>
              </span>
            </a>
          </div>

          {/* Desktop Quick Links */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4 xl:space-x-6">
              {quickLinks.map((item, index) => {
                if (item.title === 'Get Funding') {
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap"
                    >
                      {item.title}
                    </a>
                  );
                }
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-primary px-2 xl:px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                  >
                    {item.title}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground p-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="px-4 pt-2 pb-3 space-y-1 bg-background">
              {quickLinks.map((item) => {
                if (item.title === 'Get Funding') {
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 block px-3 py-2 text-base font-medium rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </a>
                  );
                }
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-primary hover:bg-muted block px-3 py-2 text-base font-medium rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NEARNavbar;