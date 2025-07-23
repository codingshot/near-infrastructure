import React from 'react';
import CaseStudies from '@/components/near/CaseStudies';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import SEO from '@/components/SEO';

const Projects = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "NEAR Infrastructure Projects",
    "description": "Explore funded projects and case studies from the NEAR Infrastructure Committee.",
    "url": "https://nearinfra.com/projects",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Infrastructure Projects",
      "description": "Projects funded by the NEAR Infrastructure Committee"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="NEAR Infrastructure Projects | Funded Projects & Case Studies"
        description="Explore innovative projects funded by the NEAR Infrastructure Committee. Discover case studies, development status, and learn about the infrastructure powering the NEAR Protocol ecosystem."
        keywords="NEAR projects, blockchain projects, infrastructure projects, NEAR grants, Web3 development, blockchain funding, NEAR ecosystem projects"
        canonical="https://nearinfra.com/projects"
        structuredData={structuredData}
      />
      <NEARNavbar />
      <main className="pt-20">
        <CaseStudies />
      </main>
      <NEARFooter />
    </div>
  );
};

export default Projects;