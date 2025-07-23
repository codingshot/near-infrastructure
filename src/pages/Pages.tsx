import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Briefcase, Target } from 'lucide-react';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import { generateSlug } from '@/utils/slugs';

interface CaseStudy {
  name: string;
  description: string;
  status: string;
  fundingDate: string;
  logo: string;
  productUrl: string;
  proposalUrl: string;
  tags: string[];
}

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
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

interface FocusArea {
  id: string;
  title: string;
  description: string;
  examples: Array<{
    name: string;
    url: string;
    description: string;
  }>;
}

const Pages = () => {
  const navigate = useNavigate();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [teamData, setTeamData] = useState<TeamData>({ workingGroup: [], infrastructureCommittee: [] });
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);

  useEffect(() => {
    // Load case studies
    fetch('/data/case-studies.json')
      .then(response => response.json())
      .then(data => setCaseStudies(data))
      .catch(error => console.error('Error loading case studies:', error));

    // Load team data
    fetch('/data/team.json')
      .then(response => response.json())
      .then(data => setTeamData(data))
      .catch(error => console.error('Error loading team data:', error));

    // Load focus areas
    fetch('/data/focus-areas.json')
      .then(response => response.json())
      .then(data => setFocusAreas(data))
      .catch(error => console.error('Error loading focus areas:', error));
  }, []);

  const generateSlug = (name: string) => {
    return name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  return (
    <div className="min-h-screen bg-background">
      <NEARNavbar />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-grotesk font-semibold mb-6">
              Explore <span className="near-infra-highlight">NEAR</span> Infrastructure
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our ecosystem of projects, meet our team, and explore focus areas that drive the NEAR infrastructure forward.
            </p>
          </div>

          {/* Projects Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-grotesk font-semibold">Projects</h2>
              </div>
              <Button asChild variant="outline">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.slice(0, 6).map((project, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/projects/${generateSlug(project.name)}`)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{project.name}</CardTitle>
                        <Badge 
                          variant={project.status === 'Active' ? 'default' : 'secondary'}
                          className="mt-2"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      {project.logo && (
                        <img 
                          src={project.logo} 
                          alt={`${project.name} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-grotesk font-semibold">Team</h2>
              </div>
              <Button asChild variant="outline">
                <Link to="/team">View All Team Members</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...teamData.infrastructureCommittee, ...teamData.workingGroup].slice(0, 6).map((member, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/team/${generateSlug(member.name)}`)}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{member.name}</CardTitle>
                        <CardDescription className="text-sm font-medium text-primary">
                          {member.title}
                        </CardDescription>
                        {member.company && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {member.company.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Focus Areas Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-grotesk font-semibold">Focus Areas</h2>
              </div>
              <Button asChild variant="outline">
                <Link to="/areas">View All Focus Areas</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusAreas.slice(0, 6).map((area, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/areas/${generateSlug(area.title)}`)}>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 line-clamp-3">
                      {area.description}
                    </CardDescription>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {area.examples.length} examples available
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {area.examples.slice(0, 3).map((example, exampleIndex) => (
                          <Badge key={exampleIndex} variant="outline" className="text-xs">
                            {example.name}
                          </Badge>
                        ))}
                        {area.examples.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{area.examples.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <NEARFooter />
    </div>
  );
};

export default Pages;