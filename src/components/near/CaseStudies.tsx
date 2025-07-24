import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Search, Filter, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const CaseStudies = () => {
  const navigate = useNavigate();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [credits, setCredits] = useState([]);

  // URL parameter management
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const statusParam = urlParams.get('status');
    const tagsParam = urlParams.get('tags');
    
    if (searchParam) setSearchTerm(searchParam);
    if (statusParam) setStatusFilter(statusParam);
    if (tagsParam) setSelectedTags(tagsParam.split(',').filter(Boolean));
  }, []);

  const updateUrlParams = (search: string, status: string, tags: string[]) => {
    const urlParams = new URLSearchParams();
    if (search) urlParams.set('search', search);
    if (status !== 'all') urlParams.set('status', status);
    if (tags.length > 0) urlParams.set('tags', tags.join(','));
    
    const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  };

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const response = await fetch('/data/credits.json');
        const data = await response.json();
        setCredits(data);
      } catch (error) {
        console.error('Error loading credits:', error);
      }
    };
    loadCredits();
    
    fetch('/data/case-studies.json').then(response => response.json()).then(data => setCaseStudies(data)).catch(error => console.error('Error loading case studies:', error));
  }, []);

  // Update URL params when filters change
  useEffect(() => {
    updateUrlParams(searchTerm, statusFilter, selectedTags);
  }, [searchTerm, statusFilter, selectedTags]);

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSelectedTags([]);
  };

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
      const matchesSearch = study.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           study.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || study.status === statusFilter;
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => study.tags.includes(tag));
      return matchesSearch && matchesStatus && matchesTags;
    });
  };

  const uniqueStatuses = Array.from(new Set(caseStudies.map(study => study.status)));
  const uniqueTags = Array.from(new Set(caseStudies.flatMap(study => study.tags)));
  const hasActiveFilters = searchTerm || statusFilter !== 'all' || selectedTags.length > 0;
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

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
              <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
              
              {/* Status Filter */}
              <div className="w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-background border-border">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    <SelectItem value="all" className="text-foreground">All Statuses</SelectItem>
                    {uniqueStatuses.map((status) => (
                      <SelectItem key={status} value={status} className="text-foreground">{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tag Filter */}
              <div className="w-full sm:w-auto">
                <Select value="" onValueChange={(value) => value && handleTagClick(value)}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-background border-border">
                    <SelectValue placeholder="Select tag" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    {uniqueTags.map((tag) => (
                      <SelectItem key={tag} value={tag} className="text-foreground">{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {/* Active Status Filter */}
              {statusFilter !== 'all' && (
                <Badge 
                  className={`${getStatusColor(statusFilter)} border flex items-center gap-1 hover:opacity-80 cursor-pointer`}
                  onClick={() => setStatusFilter('all')}
                >
                  {statusFilter}
                  <X className="w-3 h-3" />
                </Badge>
              )}
              
              {/* Active Tag Filters */}
              {selectedTags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                  <X className="w-3 h-3" />
                </Badge>
              ))}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filterCaseStudies().map((study, index) => <Card key={index} className="h-full bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col group">
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-grotesk font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {study.name}
                    </CardTitle>
                    
                    {/* Status and Tags in same row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge 
                        className={`${getStatusColor(study.status)} border flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setStatusFilter(study.status);
                        }}
                      >
                        {study.status}
                      </Badge>
                      {study.tags?.map((tag, tagIndex) => 
                        <span 
                          key={tagIndex} 
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium border border-primary/20 hover:bg-primary/20 cursor-pointer transition-colors flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagClick(tag);
                          }}
                        >
                          {tag}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Company Logo */}
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center ml-3 flex-shrink-0">
                    {study.logo ? (
                      <img 
                        src={study.logo} 
                        alt={`${study.name} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) nextElement.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <span 
                      className="text-primary font-semibold text-xs flex items-center justify-center w-full h-full"
                      style={{ display: study.logo ? 'none' : 'flex' }}
                    >
                      {study.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 flex flex-col flex-grow">
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                  {study.description}
                </CardDescription>
                
                <div className="flex items-center gap-2 mt-auto">
                  {study.productUrl !== '#' && <Button asChild variant="outline" size="sm" className="flex-1 border-border text-foreground hover:bg-muted" onClick={(e) => e.stopPropagation()}>
                      <a href={study.productUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <span>Visit Project</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>}
                  
                  {study.proposalUrl !== '#' && <Button asChild variant="ghost" size="sm" className="flex-1 text-primary hover:text-primary/80 hover:bg-muted" onClick={(e) => e.stopPropagation()}>
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
        {filterCaseStudies().length === 0 && hasActiveFilters && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4 text-center">
              No projects found matching your criteria.
            </p>
            <Button 
              variant="outline" 
              onClick={clearAllFilters}
              className="border-border text-foreground hover:bg-muted"
            >
              Clear all filters
            </Button>
          </div>
        )}

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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-background">
                    <span className="flex items-center justify-center gap-2">
                      Infrastructure Credits Program
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-grotesk font-semibold">
                      Get <span className="near-infra-highlight">near infra</span> Credits
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Get free infrastructure credits if you are a serious builder. Choose from our partner providers:
                    </p>
                    {credits.map((credit, idx) => (
                      <Card key={idx} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{credit.name}</h3>
                            <p className="text-muted-foreground mb-4">{credit.description}</p>
                          </div>
                        </div>
                        <Button asChild className="w-full">
                          <a href={credit.link} target="_blank" rel="noopener noreferrer">
                            Get Credits <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </Card>
                    ))}
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                      <p className="text-sm text-muted-foreground">
                        Are you a NEAR Infra provider and want your clients subsidized, apply for your own credit program{' '}
                        <a href="https://nearn.io/infra-committee/5/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                          here
                        </a>
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button asChild variant="outline" size="sm" className="border-border text-foreground hover:bg-background">
                <a href="/audit" className="flex items-center justify-center gap-2">
                  NEAR Security Program
                </a>
              </Button>
              <Button variant="outline" size="sm" className="border-border text-muted-foreground cursor-default">
                NEAR QA Program
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CaseStudies;