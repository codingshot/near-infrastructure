import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';

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

  useEffect(() => {
    fetch('/data/team.json')
      .then(response => response.json())
      .then(data => setTeamData(data))
      .catch(error => console.error('Error loading team data:', error));
  }, []);

  const renderMember = (member: TeamMember) => (
    <Card key={member.name} className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        {member.image && (
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {member.name}
          </h3>
          
          <p className="text-near-600 font-medium text-sm mb-3">
            {member.title}
          </p>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {member.bio}
          </p>
          
          {/* Social Links */}
          <div className="flex items-center justify-center space-x-3">
            {member.twitter && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="p-2 h-auto text-blue-500 hover:text-blue-600"
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
                className="p-2 h-auto text-blue-700 hover:text-blue-800"
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
                className="p-2 h-auto text-gray-700 hover:text-gray-800"
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
                className="p-2 h-auto text-near-500 hover:text-near-600"
              >
                <a
                  href={`https://${member.near}.social`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} NEAR Social`}
                  className="flex items-center gap-1"
                >
                  <span className="text-sm">⬢</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="team" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Committee Members
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            How decisions are made: proposals are presented in our weekly Monday meetings, 
            while the NF Work group prepares strategy, administrative work, and workflows on Wednesdays. 
            Applications are accepted on a rolling basis, but decisions are voted on during Monday meetings.
          </p>
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
          
          <TabsContent value="infrastructure">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamData.infrastructureCommittee.map(renderMember)}
            </div>
          </TabsContent>
          
          <TabsContent value="working">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamData.workingGroup.map(renderMember)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TeamSection;