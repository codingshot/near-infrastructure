import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NEARNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Simplified navbar - main navigation moved to hero cards
  const quickLinks = [
    { title: 'Get Funding', href: 'https://nearn.io/infra-committee/7', external: true },
    { title: 'RFP', href: 'https://nearn.io/infra-committee/', external: true },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-near-400 to-near-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs md:text-sm">NIC</span>
              </div>
              <span className="font-display font-semibold text-gray-900 text-sm md:text-lg lg:text-xl">
                <span className="hidden sm:inline">NEAR Infrastructure Committee</span>
                <span className="sm:hidden">NEAR IC</span>
              </span>
            </a>
          </div>

          {/* Desktop Quick Links */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4 xl:space-x-6">
              {quickLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-near-500 px-2 xl:px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              asChild
              className="bg-near-500 hover:bg-near-600 text-white text-sm"
              size="sm"
            >
              <a 
                href="https://nearn.io/infra-committee/5/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                <span className="hidden xl:inline">Apply for NEAR Infra Credits</span>
                <span className="xl:hidden">Apply Credits</span>
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 pt-2 pb-3 space-y-1 bg-white">
              {quickLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-near-500 hover:bg-gray-50 block px-3 py-2 text-base font-medium rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </a>
              ))}
              <div className="px-3 py-3 border-t border-gray-100 mt-3">
                <Button 
                  asChild
                  className="w-full bg-near-500 hover:bg-near-600 text-white"
                  size="sm"
                >
                  <a 
                    href="https://nearn.io/infra-committee/5/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Apply for NEAR Infra Credits
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NEARNavbar;