import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Linkedin, Twitter, Github, ExternalLink, Search } from 'lucide-react';

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  near?: string;
  image?: string;
}

interface TeamData {
  workingGroup: TeamMember[];
  infrastructureCommittee: TeamMember[];
}

const TeamSection = () => {
  const [teamData, setTeamData] = useState<TeamData>({ workingGroup: [], infrastructureCommittee: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('infrastructure');

  useEffect(() => {
    fetch('/data/team.json')
      .then(response => response.json())
      .then(data => {
        // Map images from file names for team members
        const processedData = {
          workingGroup: data.workingGroup.map((member: TeamMember) => ({
            ...member,
            image: member.image || getTeamImage(member.name)
          })),
          infrastructureCommittee: data.infrastructureCommittee.map((member: TeamMember) => ({
            ...member,
            image: member.image || getTeamImage(member.name)
          }))
        };
        setTeamData(processedData);
      })
      .catch(error => console.error('Error loading team data:', error));
  }, []);

  const getTeamImage = (name: string) => {
    // Map team member names to image files
    const imageMap: { [key: string]: string } = {
      'Alex Shevchenko': '/team/alexaurora.jpg',
      'Bowen Wang': '/team/bowen.jpg',
      'Eric Winer': '/team/ericwiner.png',
      'Evgeny Kuzyakov': '/team/evgeny.jpg',
      'Iker Alustiza': '/team/iker.jpg',
      'Konrad Merino': '/team/konrad.jpg'
    };
    return imageMap[name] || '/placeholder.svg?height=200&width=200&text=Team+Member';
  };

  const filterMembers = (members: TeamMember[]) => {
    return members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleExpanded = (memberName: string) => {
    const newExpanded = new Set(expandedCards);
    if (expandedCards.has(memberName)) {
      newExpanded.delete(memberName);
    } else {
      newExpanded.add(memberName);
    }
    setExpandedCards(newExpanded);
  };

  const renderMember = (member: TeamMember, index: number) => {
    const isExpanded = expandedCards.has(member.name);
    
    return (
      <Card 
        key={index} 
        className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group bg-card border-border hover:border-primary/50 overflow-hidden"
        onClick={() => toggleExpanded(member.name)}
      >
        <CardContent className="p-4">
          {/* Member Image */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted ring-2 ring-background shadow-md group-hover:scale-105 transition-transform duration-300">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg?height=96&width=96&text=Team';
                }}
              />
            </div>
          </div>
          
          {/* Member Info */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-grotesk font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="text-primary font-medium text-xs mb-3 uppercase tracking-wide">
              {member.title}
            </p>
            
            {/* Bio - Expandable */}
            <div className="relative">
              <p className={`text-muted-foreground leading-relaxed transition-all duration-300 ${
                isExpanded ? 'text-xs' : 'text-xs line-clamp-2'
              }`}>
                {member.bio}
              </p>
              {!isExpanded && member.bio && member.bio.length > 100 && (
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card to-transparent"></div>
              )}
            </div>
            
            {/* Click to expand hint */}
            {member.bio && member.bio.length > 100 && (
              <div className="mt-2 text-xs text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                Click to {isExpanded ? 'collapse' : 'read more'}
              </div>
            )}
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-2 pt-3 border-t border-border">
            {member.twitter && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="p-2 h-auto text-muted-foreground hover:text-primary hover:bg-muted rounded-full transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Twitter`}
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
            )}
            
            {member.linkedin && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="p-2 h-auto text-muted-foreground hover:text-primary hover:bg-muted rounded-full transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            )}
            
            {member.github && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="p-2 h-auto text-muted-foreground hover:text-primary hover:bg-muted rounded-full transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} GitHub`}
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
            
            {member.near && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="p-2 h-auto text-muted-foreground hover:text-primary hover:bg-muted rounded-full transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={`https://${member.near}.social`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} NEAR Social`}
                  className="flex items-center gap-1"
                >
                  <span className="text-base">⬢</span>
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="team" className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-grotesk font-semibold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
            Dedicated professionals driving NEAR infrastructure forward with expertise in blockchain technology, 
            decentralized systems, and ecosystem development.
          </p>
          
          {/* Search and Toggle Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="w-full sm:max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border focus:border-primary"
              />
            </div>

            {/* Team Toggle */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-2 w-full sm:w-auto bg-muted">
                <TabsTrigger 
                  value="infrastructure" 
                  className="text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  Infrastructure Committee
                </TabsTrigger>
                <TabsTrigger 
                  value="working" 
                  className="text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  Working Group
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Team Content */}
        <div className="mt-0">
          {activeTab === 'infrastructure' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filterMembers(teamData.infrastructureCommittee).map((member, index) => renderMember(member, index))}
              </div>
              {filterMembers(teamData.infrastructureCommittee).length === 0 && searchTerm && (
                <div className="text-center py-8 text-muted-foreground">
                  No team members found matching "{searchTerm}"
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'working' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filterMembers(teamData.workingGroup).map((member, index) => renderMember(member, index))}
              </div>
              {filterMembers(teamData.workingGroup).length === 0 && searchTerm && (
                <div className="text-center py-8 text-muted-foreground">
                  No team members found matching "{searchTerm}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;