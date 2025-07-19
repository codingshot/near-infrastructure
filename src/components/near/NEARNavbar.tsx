import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NEARNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: 'Submit A Proposal', href: 'https://nearn.io/infra-committee/7', external: true },
    { title: 'See RFPs', href: 'https://nearn.io/infra-committee/', external: true },
    { title: 'Feedback', href: 'https://nearn.io//listing/near-infrastructure-ecosystem-feedback-page-no-payment/', external: true },
    { title: 'Our Focus Areas', href: '#focus-areas' },
    { title: 'Team', href: '#team' },
    { title: 'Blog', href: '#blog' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-near-400 to-near-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NIC</span>
              </div>
              <span className="font-display font-semibold text-gray-900 text-lg">
                NEAR Infrastructure Committee
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-near-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              asChild
              className="bg-near-500 hover:bg-near-600 text-white"
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-near-500 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button 
                  asChild
                  className="w-full bg-near-500 hover:bg-near-600 text-white"
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