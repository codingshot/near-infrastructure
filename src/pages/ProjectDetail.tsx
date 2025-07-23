import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import { findItemBySlug } from '@/utils/slugs';

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

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch('/data/case-studies.json');
        const data = await response.json();
        const foundProject = findItemBySlug<CaseStudy>(data, slug || '');
        setProject(foundProject || null);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'In Development':
        return 'bg-accent-blue/10 text-accent-blue border-accent-blue/20';
      case 'Maintenance':
        return 'bg-accent-purple/10 text-accent-purple border-accent-purple/20';
      case 'In KYC':
        return 'bg-accent-red/10 text-accent-red border-accent-red/20';
      case 'Approved':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

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

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <NEARNavbar />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              onClick={() => navigate('/projects')}
              variant="ghost"
              className="mb-8 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-grotesk font-semibold text-foreground mb-4">
                Project Not Found
              </h1>
              <p className="text-muted-foreground">
                The project you're looking for doesn't exist.
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
            onClick={() => navigate('/projects')}
            variant="ghost"
            className="mb-8 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl font-grotesk font-semibold text-foreground mb-4">
                    {project.name}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge className={`${getStatusColor(project.status)} border`}>
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      {project.fundingDate}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center ml-4">
                  {project.logo ? (
                    <img 
                      src={project.logo} 
                      alt={`${project.name} logo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) nextElement.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span 
                    className="text-primary font-semibold text-sm flex items-center justify-center w-full h-full"
                    style={{ display: project.logo ? 'none' : 'flex' }}
                  >
                    {project.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <CardDescription className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {project.description}
              </CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {project.productUrl !== '#' && (
                  <Button asChild variant="default" className="flex items-center gap-2">
                    <a href={project.productUrl} target="_blank" rel="noopener noreferrer">
                      <span>Visit Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                
                {project.proposalUrl !== '#' && (
                  <Button asChild variant="outline" className="flex items-center gap-2">
                    <a href={project.proposalUrl} target="_blank" rel="noopener noreferrer">
                      <span>View Proposal</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <NEARFooter />
    </div>
  );
};

export default ProjectDetail;