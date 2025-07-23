import React from 'react';
import TeamSection from '@/components/near/TeamSection';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <NEARNavbar />
      <main className="pt-20">
        <TeamSection />
      </main>
      <NEARFooter />
    </div>
  );
};

export default Team;