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
    fetch('/data/case-studies.json')
      .then(response => response.json())
      .then(data => setCaseStudies(data))
      .catch(error => console.error('Error loading case studies:', error));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Development':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'In KYC':
        return 'bg-orange-100 text-orange-800';
      case 'Approved':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filterCaseStudies = () => {
    return caseStudies.filter(study => {
      const matchesSearch = study.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           study.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || study.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const uniqueStatuses = Array.from(new Set(caseStudies.map(study => study.status)));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Funded Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Explore the projects and infrastructure improvements we've funded to strengthen the network.
          </p>
          
          {/* Search and Filters */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-near-300"
                />
              </div>
              
              {/* Status Filter */}
              <div className="sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-gray-200 focus:border-near-300">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {uniqueStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCaseStudies().map((study, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {study.name}
                    </CardTitle>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {study.tags?.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 text-xs bg-near-100 text-near-700 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getStatusColor(study.status)}>
                        {study.status}
                      </Badge>
                    </div>
                  </div>
                  {/* Logo placeholder */}
                  <div className="w-12 h-12 bg-gradient-to-br from-near-100 to-near-200 rounded-lg flex items-center justify-center ml-3">
                    <span className="text-near-600 font-semibold text-xs">
                      {study.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                  {study.description}
                </CardDescription>
                
                <div className="flex items-center gap-2">
                  {study.productUrl !== '#' && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 border-near-200 text-near-700 hover:bg-near-50"
                    >
                      <a
                        href={study.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Visit Project</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                  
                  {study.proposalUrl !== '#' && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-near-600 hover:text-near-700 hover:bg-near-50"
                    >
                      <a
                        href={study.proposalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <span>See Proposal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* No results message */}
        {filterCaseStudies().length === 0 && (searchTerm || statusFilter !== 'all') && (
          <div className="text-center py-8 text-gray-500">
            No case studies found matching your criteria. Try adjusting your search or filters.
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">Other Internal Resources</h3>
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <a
                href="https://status.near.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                NEAR Status Page
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;