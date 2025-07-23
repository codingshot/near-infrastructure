import React from 'react';
import CaseStudies from '@/components/near/CaseStudies';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <NEARNavbar />
      <main className="pt-20">
        <CaseStudies />
      </main>
      <NEARFooter />
    </div>
  );
};

export default Projects;