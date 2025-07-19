import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

const NEARHero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-near-50 text-near-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-near-500 rounded-full mr-2"></span>
            nearinfra.com
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
            NEAR Infrastructure
            <br />
            <span className="text-near-500">Committee</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The NEAR Infrastructure Committee (IC) is{' '}
            <strong>a group within the NEAR ecosystem focused on strengthening the network's foundational infrastructure</strong>. 
            It was established to improve the underlying technology that developers rely on to build applications on NEAR.
          </p>

          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            The IC aims to decentralize decision-making, enhance critical infrastructure, 
            and streamline efforts for greater clarity and decentralization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              asChild
              size="lg"
              className="bg-near-500 hover:bg-near-600 text-white px-8 py-3 text-lg"
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
              className="border-near-200 text-near-700 hover:bg-near-50 px-8 py-3 text-lg"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-near-500 mb-2">$4M+</div>
              <div className="text-gray-600">Funding Committed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-near-500 mb-2">50+</div>
              <div className="text-gray-600">Projects Funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-near-500 mb-2">8</div>
              <div className="text-gray-600">Focus Areas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NEARHero;