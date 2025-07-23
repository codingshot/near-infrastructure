import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import { findItemBySlug } from '@/utils/slugs';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMember = async () => {
      try {
        const response = await fetch('/data/team.json');
        const data: TeamData = await response.json();
        const allMembers = [...data.workingGroup, ...data.infrastructureCommittee];
        const foundMember = findItemBySlug(allMembers, slug || '');
        setMember(foundMember || null);
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

  return (
    <div className="min-h-screen bg-background">
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
        </div>
      </main>
      <NEARFooter />
    </div>
  );
};

export default TeamDetail;