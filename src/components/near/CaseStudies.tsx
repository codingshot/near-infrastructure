import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  useEffect(() => {
    fetch('/data/case-studies.json').then(response => response.json()).then(data => setCaseStudies(data)).catch(error => console.error('Error loading case studies:', error));
  }, []);
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
  const filterCaseStudies = () => {
    return caseStudies.filter(study => {
      const matchesSearch = study.name.toLowerCase().includes(searchTerm.toLowerCase()) || study.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || study.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };
  const uniqueStatuses = Array.from(new Set(caseStudies.map(study => study.status)));
  return <section id="case-studies" className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-grotesk font-semibold text-foreground mb-4">
            Funded Projects
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
            Discover the innovative projects that have been funded through our Infrastructure Committee. 
            Each project represents a step forward in building better infrastructure for the network.
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="w-full sm:max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input type="text" placeholder="Search projects..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-background border-border focus:border-primary" />
            </div>

            {/* Filter */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background border-border">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="all" className="text-foreground">All Statuses</SelectItem>
                  <SelectItem value="Completed" className="text-foreground">Completed</SelectItem>
                  <SelectItem value="In Development" className="text-foreground">In Development</SelectItem>
                  <SelectItem value="Maintenance" className="text-foreground">Maintenance</SelectItem>
                  <SelectItem value="In KYC" className="text-foreground">In KYC</SelectItem>
                  <SelectItem value="Approved" className="text-foreground">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filterCaseStudies().map((study, index) => <Card key={index} className="h-full bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-grotesk font-semibold text-foreground mb-2">
                      {study.name}
                    </CardTitle>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {study.tags?.map((tag, tagIndex) => <span key={tagIndex} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium border border-primary/20">
                          {tag}
                        </span>)}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`${getStatusColor(study.status)} border`}>
                        {study.status}
                      </Badge>
                    </div>
                  </div>
                  {/* Logo placeholder */}
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center ml-3">
                    <span className="text-primary font-semibold text-xs">
                      {study.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                  {study.description}
                </CardDescription>
                
                <div className="flex items-center gap-2">
                  {study.productUrl !== '#' && <Button asChild variant="outline" size="sm" className="flex-1 border-border text-foreground hover:bg-muted">
                      <a href={study.productUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <span>Visit Project</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>}
                  
                  {study.proposalUrl !== '#' && <Button asChild variant="ghost" size="sm" className="flex-1 text-primary hover:text-primary/80 hover:bg-muted">
                      <a href={study.proposalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <span>See Proposal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>}
                </div>
              </CardContent>
            </Card>)}
        </div>
        
        {/* No results message */}
        {filterCaseStudies().length === 0 && (searchTerm || statusFilter !== 'all') && <div className="text-center py-8 text-muted-foreground">
            No case studies found matching your criteria. Try adjusting your search or filters.
          </div>}

        {/* Additional Resources */}
        <div className="mt-12">
          <div className="bg-muted rounded-lg p-6">
            <h3 className="font-grotesk font-semibold text-foreground mb-4">Programs & Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button asChild variant="outline" size="sm" className="border-border text-foreground hover:bg-background">
                <a href="https://status.near.org" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  NEAR Status Page
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-border text-foreground hover:bg-background">
                <a href="https://nearn.io/infra-committee/5/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Infrastructure Credits Program
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-border text-foreground hover:bg-background">
                <a href="https://near.org/security" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  NEAR Security Program
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-border text-foreground hover:bg-background">
                <a href="https://nearn.io/beta-testing" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  NEAR Beta Testing Program
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CaseStudies;