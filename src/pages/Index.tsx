
import React, { useEffect } from "react";
import NEARNavbar from "@/components/near/NEARNavbar";
import NEARHero from "@/components/near/NEARHero";
import FocusAreas from "@/components/near/FocusAreas";
import TeamSection from "@/components/near/TeamSection";
import CaseStudies from "@/components/near/CaseStudies";
import BlogSection from "@/components/near/BlogSection";
import NEARFooter from "@/components/near/NEARFooter";
import SEO from "@/components/SEO";

const Index = () => {
  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NEAR Infrastructure Committee",
    "url": "https://nearinfra.com",
    "logo": "https://nearinfra.com/logo.svg",
    "sameAs": [
      "https://twitter.com/nearprotocol",
      "https://github.com/near",
      "https://near.org"
    ],
    "description": "The NEAR Infrastructure Committee (IC) is a group within the NEAR ecosystem focused on strengthening the network's foundational infrastructure.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "NEAR Foundation",
      "url": "https://near.foundation"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="NEAR Infrastructure Committee | Strengthening NEAR's Infrastructure"
        description="The NEAR Infrastructure Committee funds and supports critical infrastructure for the NEAR Protocol ecosystem. Submit proposals, explore RFPs, and join us in building essential Web3 infrastructure."
        keywords="NEAR Protocol, blockchain infrastructure, Web3 infrastructure, NEAR ecosystem, blockchain development, NEAR Foundation, infrastructure committee, blockchain RFP, NEAR grants"
        canonical="https://nearinfra.com/"
        structuredData={structuredData}
      />
      <NEARNavbar />
      <main>
        <NEARHero />
        <FocusAreas />
        <CaseStudies />
        <TeamSection />
        <BlogSection />
      </main>
      <NEARFooter />
    </div>
  );
};

export default Index;
