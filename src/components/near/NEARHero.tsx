import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

const NEARHero = () => {
  return (
    <section className="pt-20 md:pt-24 pb-12 md:pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-near-50 text-near-700 text-xs md:text-sm font-medium mb-6 md:mb-8">
            <span className="w-2 h-2 bg-near-500 rounded-full mr-2"></span>
            nearinfra.com
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-4 sm:px-0">
            NEAR Infrastructure
            <br />
            <span className="text-near-500">Committee</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            The NEAR Infrastructure Committee (IC) is{' '}
            <strong>a group within the NEAR ecosystem focused on strengthening the network's foundational infrastructure</strong>. 
            It was established to improve the underlying technology that developers rely on to build applications on NEAR.
          </p>

          <p className="text-base md:text-lg text-gray-500 mb-8 md:mb-10 max-w-2xl mx-auto px-4 sm:px-0">
            The IC aims to decentralize decision-making, enhance critical infrastructure, 
            and streamline efforts for greater clarity and decentralization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12 px-4 sm:px-0">
            <Button 
              asChild
              size="lg"
              className="bg-near-500 hover:bg-near-600 text-white px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
            >
              <a 
                href="https://nearn.io/infra-committee/7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Submit A Proposal
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-near-200 text-near-700 hover:bg-near-50 px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
            >
              <a 
                href="https://nearn.io/infra-committee/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                See our RFPs
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Stats or additional info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 px-4 sm:px-0">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-near-500 mb-2">$4M+</div>
              <div className="text-sm md:text-base text-gray-600">Funding Committed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-near-500 mb-2">20</div>
              <div className="text-sm md:text-base text-gray-600">Projects Funded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-near-500 mb-2">8</div>
              <div className="text-sm md:text-base text-gray-600">Focus Areas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NEARHero;