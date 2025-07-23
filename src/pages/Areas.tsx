import React from 'react';
import FocusAreas from '@/components/near/FocusAreas';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';

const Areas = () => {
  return (
    <div className="min-h-screen bg-background">
      <NEARNavbar />
      <main className="pt-20">
        <FocusAreas />
      </main>
      <NEARFooter />
    </div>
  );
};

export default Areas;