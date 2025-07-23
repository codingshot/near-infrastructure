import React from 'react';
import TeamSection from '@/components/near/TeamSection';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import SEO from '@/components/SEO';

const Team = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "NEAR Infrastructure Committee Team",
    "description": "Meet the team behind the NEAR Infrastructure Committee - experts in blockchain technology and decentralized systems.",
    "url": "https://nearinfra.com/team",
    "mainEntity": {
      "@type": "Organization",
      "name": "NEAR Infrastructure Committee",
      "member": [
        {
          "@type": "Person",
          "name": "Infrastructure Committee Members",
          "description": "Expert team members driving NEAR infrastructure development"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="NEAR Infrastructure Committee Team | Meet Our Experts"
        description="Meet the dedicated professionals driving NEAR infrastructure forward. Learn about our Infrastructure Committee members and Working Group experts in blockchain technology and decentralized systems."
        keywords="NEAR team, infrastructure committee, blockchain experts, NEAR Foundation team, Web3 professionals, NEAR Protocol team, blockchain developers"
        canonical="https://nearinfra.com/team"
        structuredData={structuredData}
      />
      <NEARNavbar />
      <main className="pt-20">
        <TeamSection />
      </main>
      <NEARFooter />
    </div>
  );
};

export default Team;