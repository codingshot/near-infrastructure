
import React, { useEffect } from "react";
import NEARNavbar from "@/components/near/NEARNavbar";
import NEARHero from "@/components/near/NEARHero";
import FocusAreas from "@/components/near/FocusAreas";
import TeamSection from "@/components/near/TeamSection";
import CaseStudies from "@/components/near/CaseStudies";
import BlogSection from "@/components/near/BlogSection";
import NEARFooter from "@/components/near/NEARFooter";

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

  return (
    <div className="min-h-screen">
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
