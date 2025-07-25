import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import { findItemBySlug, generateSlug } from '@/utils/slugs';
import SEO from '@/components/SEO';

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  near?: string;
  image?: string;
  company?: {
    name: string;
    logo: string;
    url: string;
  };
}

interface TeamData {
  workingGroup: TeamMember[];
  infrastructureCommittee: TeamMember[];
}

const TeamDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [otherMembers, setOtherMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMember = async () => {
      try {
        const response = await fetch('/data/team.json');
        const data: TeamData = await response.json();
        const allMembers = [...data.workingGroup, ...data.infrastructureCommittee];
        const foundMember = findItemBySlug(allMembers, slug || '');
        setMember(foundMember || null);
        
        // Get other team members (exclude current member)
        if (foundMember) {
          const others = allMembers
            .filter((m: TeamMember) => generateSlug(m.name) !== slug)
            .slice(0, 6);
          setOtherMembers(others);
        }
      } catch (error) {
        console.error('Error loading team member:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NEARNavbar />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </main>
        <NEARFooter />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="Team Member Not Found | NEAR Infrastructure Committee"
          description="The requested team member could not be found. Meet other members of the NEAR Infrastructure Committee and Working Group."
          noIndex={true}
        />
        <NEARNavbar />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              onClick={() => navigate('/team')}
              variant="ghost"
              className="mb-8 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Team
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-grotesk font-semibold text-foreground mb-4">
                Team Member Not Found
              </h1>
              <p className="text-muted-foreground">
                The team member you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </main>
        <NEARFooter />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.title,
    "description": member.bio,
    "url": `https://nearinfra.com/team/${slug}`,
    "image": member.image,
    "worksFor": {
      "@type": "Organization",
      "name": "NEAR Infrastructure Committee",
      "url": "https://nearinfra.com"
    },
    "sameAs": [
      member.twitter,
      member.linkedin,
      member.github
    ].filter(Boolean)
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${member.name} | NEAR Infrastructure Committee Team`}
        description={`${member.bio} Meet ${member.name}, ${member.title} at the NEAR Infrastructure Committee.`}
        keywords={`${member.name}, NEAR infrastructure, ${member.title}, blockchain expert, NEAR Protocol team, Web3 professional`}
        canonical={`https://nearinfra.com/team/${slug}`}
        structuredData={structuredData}
      />
      <NEARNavbar />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={() => navigate('/team')}
            variant="ghost"
            className="mb-8 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Team
          </Button>

          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden bg-muted ring-4 ring-background shadow-lg">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg?height=128&width=128&text=Team';
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-grotesk font-semibold text-foreground mb-2">
                    {member.name}
                  </h1>
                  <p className="text-primary font-medium text-sm mb-4 uppercase tracking-wide">
                    {member.title}
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {member.twitter && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="w-4 h-4" />
                          Twitter
                        </a>
                      </Button>
                    )}
                    
                    {member.linkedin && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    
                    {member.github && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    
                    {member.near && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <a
                          href={`https://${member.near}.social`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src="/favicon.ico" alt="NEAR" className="w-4 h-4" />
                          NEAR Social
                        </a>
                      </Button>
                    )}
                  </div>

                  {member.company && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <img 
                        src={member.company.logo} 
                        alt={`${member.company.name} logo`}
                        className="h-8 w-auto max-w-24 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.company.name}</p>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-xs text-primary hover:underline"
                        >
                          <a
                            href={member.company.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Company <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {otherMembers.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-grotesk font-semibold text-foreground mb-8">
                Other Team Members
              </h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {otherMembers.map((otherMember) => (
                    <CarouselItem key={generateSlug(otherMember.name)} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card 
                        className="bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => navigate(`/team/${generateSlug(otherMember.name)}`)}
                      >
                        <CardContent className="p-6">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-muted mb-4">
                              <img 
                                src={otherMember.image} 
                                alt={otherMember.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder.svg?height=64&width=64&text=Team';
                                }}
                              />
                            </div>
                            <h3 className="font-grotesk font-semibold text-foreground mb-1 line-clamp-1">
                              {otherMember.name}
                            </h3>
                            <p className="text-primary font-medium text-sm mb-2 uppercase tracking-wide line-clamp-1">
                              {otherMember.title}
                            </p>
                            <p className="text-muted-foreground text-xs line-clamp-3 leading-relaxed">
                              {otherMember.bio}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </div>
      </main>
      <NEARFooter />
    </div>
  );
};

export default TeamDetail;