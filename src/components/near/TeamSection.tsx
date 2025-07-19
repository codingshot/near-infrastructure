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
        className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-near-300 bg-white overflow-hidden"
        onClick={() => toggleExpanded(member.name)}
      >
        <CardContent className="p-6">
          {/* Member Image */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-near-100 to-near-200 ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300">
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
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-near-600 transition-colors">
              {member.name}
            </h3>
            <p className="text-near-600 font-semibold text-sm mb-4 uppercase tracking-wide">
              {member.title}
            </p>
            
            {/* Bio - Expandable */}
            <div className="relative">
              <p className={`text-gray-600 leading-relaxed transition-all duration-300 ${
                isExpanded ? 'text-sm' : 'text-sm line-clamp-2'
              }`}>
                {member.bio}
              </p>
              {!isExpanded && member.bio && member.bio.length > 100 && (
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></div>
              )}
            </div>
            
            {/* Click to expand hint */}
            {member.bio && member.bio.length > 100 && (
              <div className="mt-3 text-xs text-near-500 opacity-70 group-hover:opacity-100 transition-opacity">
                Click to {isExpanded ? 'collapse' : 'read more'}
              </div>
            )}
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-3 pt-4 border-t border-gray-100">
            {member.twitter && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="p-3 h-auto text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Twitter`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
            )}
            
            {member.linkedin && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="p-3 h-auto text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            )}
            
            {member.github && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="p-3 h-auto text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} GitHub`}
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            )}
            
            {member.near && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="p-3 h-auto text-gray-500 hover:text-near-600 hover:bg-near-50 rounded-full transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={`https://${member.near}.social`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} NEAR Social`}
                  className="flex items-center gap-1"
                >
                  <span className="text-lg">⬢</span>
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="team" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Dedicated professionals driving NEAR infrastructure forward with expertise in blockchain technology, 
            decentralized systems, and ecosystem development.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-near-300"
            />
          </div>
        </div>

        {/* Team Tabs */}
        <Tabs defaultValue="infrastructure" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="infrastructure" className="text-sm">
              Infrastructure Committee
            </TabsTrigger>
            <TabsTrigger value="working" className="text-sm">
              Working Group
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="infrastructure" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterMembers(teamData.infrastructureCommittee).map((member, index) => renderMember(member, index))}
            </div>
            {filterMembers(teamData.infrastructureCommittee).length === 0 && searchTerm && (
              <div className="text-center py-8 text-gray-500">
                No team members found matching "{searchTerm}"
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="working" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterMembers(teamData.workingGroup).map((member, index) => renderMember(member, index))}
            </div>
            {filterMembers(teamData.workingGroup).length === 0 && searchTerm && (
              <div className="text-center py-8 text-gray-500">
                No team members found matching "{searchTerm}"
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TeamSection;