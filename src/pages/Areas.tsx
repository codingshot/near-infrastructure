import React from 'react';
import FocusAreas from '@/components/near/FocusAreas';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import SEO from '@/components/SEO';

const Areas = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "NEAR Infrastructure Focus Areas",
    "description": "Explore the key focus areas for NEAR infrastructure development and funding opportunities.",
    "url": "https://nearinfra.com/areas",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Infrastructure Focus Areas",
      "description": "Key areas of focus for NEAR infrastructure development"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="NEAR Infrastructure Focus Areas | Development Priorities"
        description="Explore the key focus areas for NEAR infrastructure development. Learn about funding opportunities, development priorities, and examples of projects in core infrastructure, data tools, developer experience, and more."
        keywords="NEAR focus areas, infrastructure development, blockchain infrastructure, Web3 tools, NEAR development priorities, infrastructure funding, blockchain development areas"
        canonical="https://nearinfra.com/areas"
        structuredData={structuredData}
      />
      <NEARNavbar />
      <main className="pt-20">
        <FocusAreas />
      </main>
      <NEARFooter />
    </div>
  );
};

export default Areas;