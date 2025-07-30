import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NEARNavbar from "@/components/near/NEARNavbar";
import NEARFooter from "@/components/near/NEARFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Shield, Clock, AlertTriangle, CheckCircle, User, Mail, Globe, Users, Award, Zap, Target, FileText, MessageSquare, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';
import { generateSlug } from '@/utils/slugs';
import HeroBackground3D from '@/components/HeroBackground3D';

const QA = () => {
  const navigate = useNavigate();
  const [dillonData, setDillonData] = useState<any>(null);
  const [linesOfCode, setLinesOfCode] = useState<number>(0);
  const [auditType, setAuditType] = useState<string>('rust-smart-contract');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [calculatedDays, setCalculatedDays] = useState<any>({
    assessment: 'Calculate based on inputs',
    testing: 'Calculate based on inputs', 
    analysis: 'Calculate based on inputs',
    report: 'Calculate based on inputs',
    total: 'Enter details to calculate',
    completion: '-'
  });
  
  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const response = await fetch('/data/team.json');
        const data = await response.json();
        const allMembers = [...data.workingGroup, ...data.infrastructureCommittee];
        const dillon = allMembers.find((member: any) => member.name.includes('Dillon'));
        setDillonData(dillon);
      } catch (error) {
        console.error('Error loading team data:', error);
      }
    };
    
    loadTeamData();
  }, []);

  const updateCalculation = (linesOfCode: number, auditType: string, startDate: Date | undefined) => {
    if (!linesOfCode || linesOfCode <= 0) {
      setCalculatedDays({
        assessment: 'Calculate based on inputs',
        testing: 'Calculate based on inputs',
        analysis: 'Calculate based on inputs', 
        report: 'Calculate based on inputs',
        total: 'Enter details to calculate',
        completion: '-'
      });
      return;
    }

    // Enhanced calculation factors for better accuracy
    const baseFactors: { [key: string]: { base: number; complexity: number; multiplier: number } } = {
      'rust-smart-contract': { base: 4, complexity: 0.012, multiplier: 1.2 },
      'chain-signatures': { base: 7, complexity: 0.018, multiplier: 1.5 },
      'pen-testing': { base: 6, complexity: 0.010, multiplier: 1.1 },
      'other': { base: 5, complexity: 0.015, multiplier: 1.3 }
    };

    const factor = baseFactors[auditType] || baseFactors['other'];

    // Enhanced calculations with complexity scaling
    const complexityScale = Math.min(1 + (linesOfCode / 10000) * 0.5, 2.5); // Cap at 2.5x for very large codebases
    
    const assessmentDays = Math.max(2, Math.ceil((factor.base + (linesOfCode * factor.complexity * 0.3)) * complexityScale));
    const testingDays = Math.max(3, Math.ceil((factor.base * 1.5 + (linesOfCode * factor.complexity * 0.5)) * factor.multiplier));
    const analysisDays = Math.max(2, Math.ceil((factor.base * 0.8 + (linesOfCode * factor.complexity * 0.2)) * complexityScale));
    const reportDays = Math.max(2, Math.ceil((factor.base * 0.6 + (linesOfCode * factor.complexity * 0.1)) * 1.1));

    // Dynamic planning and review days based on project size
    const planningDays = linesOfCode > 5000 ? 7 : linesOfCode > 2000 ? 6 : 5;
    const reviewDays = linesOfCode > 10000 ? 3 : 2;
    const totalDays = planningDays + assessmentDays + testingDays + analysisDays + reportDays + reviewDays;

    let completion = '-';
    if (startDate) {
      const completionDate = new Date(startDate);
      completionDate.setDate(completionDate.getDate() + totalDays);
      completion = format(completionDate, 'PPP');
    } else {
      completion = 'Set start date to calculate';
    }

    setCalculatedDays({
      assessment: `${assessmentDays}`,
      testing: `${testingDays}`,
      analysis: `${analysisDays}`,
      report: `${reportDays}`,
      total: `${totalDays} days`,
      completion
    });
  };

  const handleDillionClick = () => {
    if (dillonData) {
      navigate(`/team/${generateSlug(dillonData.name)}`);
    } else {
      navigate("/team/dillon");
    }
  };

  return (
    <>
      <SEO 
        title="NEAR Testing Program - Quality Assurance Support"
        description="The NEAR Testing Program provides professional QA expertise to lean teams, helping improve product quality and accelerate development cycles in the NEAR ecosystem."
        keywords="NEAR, testing, QA, quality assurance, program, support, ecosystem"
      />
      
      <div className="min-h-screen bg-background">
        <NEARNavbar />
        
        <main>
          <section className="relative pt-20 md:pt-24 pb-12 md:pb-16 bg-background overflow-hidden">
            <HeroBackground3D />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="hero-text max-w-4xl mx-auto text-center mb-12 md:mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-grotesk font-semibold text-foreground mb-4 md:mb-6 leading-tight text-center">
                  <span className="metallic-gradient">NEAR Testing</span>
                  <br />
                  <span className="near-infra-highlight">Program</span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl leading-relaxed mx-auto text-center">
                  Professional QA expertise for lean teams, helping{' '}
                  <span className="near-infra-highlight">accelerate launches to mainnet on NEAR</span>
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="space-y-16">
              
              {/* Program Objectives */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-foreground text-left">Program Objectives</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl text-left">
                    The NEAR Testing Program serves several key strategic objectives for our ecosystem
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">Improve Quality</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Help teams identify and resolve bugs, usability issues, and performance bottlenecks before they affect end users.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">Support Teams</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Provide professional QA expertise to lean teams who may not have dedicated testing resources.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Zap className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">Accelerate Development</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Enable faster iteration and more confident releases by providing structured testing feedback.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">Enhance UX</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Ensure applications in the NEAR ecosystem provide smooth, intuitive experiences for all users.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">Strengthen Ecosystem</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Create a higher quality standard across all NEAR applications to build user trust and adoption.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <AlertTriangle className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">Reduce Post-Launch Issues</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Minimize critical bugs that could damage reputation or require emergency fixes after launch.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How to Prepare */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-foreground text-left">How to Prepare for QA Testing</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl text-left">
                    To make the most of the NEAR Testing Program, here are key steps to prepare your application
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-primary" />
                        <CardTitle>Documentation & Setup</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Provide comprehensive documentation with user flows and expected behaviors</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Set up dedicated testing environments that closely mimic production</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Share necessary access credentials and permissions for all features</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Target className="w-8 h-8 text-primary" />
                        <CardTitle>Testing Strategy</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Define specific test scenarios and use cases to focus on</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Specify target platforms: browsers, devices, and operating systems</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Highlight critical features that require thorough testing</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-primary" />
                        <CardTitle>Communication</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Establish direct communication methods for reporting issues</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Provide API documentation with endpoints and expected responses</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Globe className="w-8 h-8 text-primary" />
                        <CardTitle>Application Requirements</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Must have a live product ready for testing</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">Include known issues and areas of concern</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How to Apply */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-foreground text-left">How to Apply</h2>
                  <Card className="max-w-2xl mx-auto">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground mb-4">
                        You should have a product live to test. Reach out to{" "}
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <button 
                              onClick={handleDillionClick}
                              className="text-primary hover:underline font-medium"
                            >
                              {dillonData ? dillonData.name : 'Dillon Freeman'}
                            </button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                              <Avatar>
                                <AvatarImage src={dillonData?.image || "/team/dillon.jpeg"} />
                                <AvatarFallback>DF</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1 flex-1">
                                <h4 className="text-sm font-semibold">{dillonData?.name || 'Dillon Freeman'}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {dillonData?.title || 'Partnerships at NEAR Foundation'}
                                </p>
                                <p className="text-xs text-muted-foreground pt-2">
                                  {dillonData?.bio || 'Leading strategic partnerships and ecosystem development initiatives'}
                                </p>
                                <div className="flex items-center space-x-2 pt-2">
                                  {dillonData?.twitter && (
                                    <a
                                      href={dillonData.twitter}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-muted-foreground hover:text-primary"
                                    >
                                      <Twitter className="h-4 w-4" />
                                    </a>
                                  )}
                                  {dillonData?.linkedin && (
                                    <a
                                      href={dillonData.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-muted-foreground hover:text-primary"
                                    >
                                      <Linkedin className="h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        {" "}from the Infra team with your product link and we will setup with the test labs.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <CardTitle className="text-base">Project Overview</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Brief description of your application and its purpose</CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4 text-primary" />
                        </div>
                        <CardTitle className="text-base">Technical Stack</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>List of technologies used in your application</CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Target className="w-4 h-4 text-primary" />
                        </div>
                        <CardTitle className="text-base">Testing Priorities</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Areas where you need the most testing support</CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <CardTitle className="text-base">Timeline</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Your expected development and launch schedule</CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <CardTitle className="text-base">Team Contact</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Primary point of contact for testing coordination</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Past Examples */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-foreground text-left">Past Examples</h2>
                  <p className="text-lg text-muted-foreground text-left">
                    Projects that have successfully completed our testing program
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <CardTitle>Templar Finance</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        In Progress
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <CardTitle>Fast Auth 2.0</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        In Progress
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Expedited Process */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-foreground text-left">Expedited Process Features</h2>
                  <p className="text-lg text-muted-foreground text-left">
                    Projects with these features can get expedited in the process
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Award className="w-8 h-8 text-primary" />
                        <CardTitle>Early-Stage Projects</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Projects in the development phase may receive priority access to testing resources to ensure quality from the beginning.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Zap className="w-8 h-8 text-primary" />
                        <CardTitle>High-Impact Applications</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Projects with potential for significant ecosystem impact or user adoption may receive extended testing support.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Github className="w-8 h-8 text-primary" />
                        <CardTitle>Open-Source Projects</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Projects that contribute to the open-source community may receive specialized testing focus.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-primary" />
                        <CardTitle>Support Channels</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Has support channels and feedback mechanisms for bug testing (Intercom, <a href="http://users.fun" className="text-primary hover:underline">users.fun</a>, beta testers feedback).
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Success Metrics */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-foreground text-left">Success Metrics</h2>
                </div>
                
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground text-center">
                      We measure program success through quantitative metrics like bug detection rates, critical issue prevention, and user satisfaction scores, as well as qualitative feedback from participating teams. Responsiveness from teams, and quality of product based on user sentiment when launching.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Audit Calculator */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-foreground text-left">Audit Calculator</h2>
                  <p className="text-lg text-muted-foreground text-left">
                    Estimate timeline and completion date for your security audit
                  </p>
                </div>
                
                <Card className="max-w-4xl mx-auto">
                  <CardContent className="p-8 space-y-8">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Coming Soon & Not Accurate Disclaimer</h3>
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            This calculator provides rough estimates only and is currently in development. Actual audit times may vary significantly based on code complexity, dependencies, and other factors.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="lines-of-code" className="text-base font-medium">Lines of Code</Label>
                        <Input
                          id="lines-of-code"
                          type="number"
                          placeholder="e.g., 1000"
                          value={linesOfCode || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d+$/.test(value)) {
                              const newLinesOfCode = parseInt(value) || 0;
                              setLinesOfCode(newLinesOfCode);
                              updateCalculation(newLinesOfCode, auditType, startDate);
                            }
                          }}
                          className="text-base"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Audit Type</Label>
                        <Select 
                          value={auditType}
                          onValueChange={(value) => {
                            setAuditType(value);
                            updateCalculation(linesOfCode, value, startDate);
                          }}
                        >
                          <SelectTrigger className="text-base">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rust-smart-contract">Rust Smart Contract on NEAR</SelectItem>
                            <SelectItem value="chain-signatures">NEAR Chain Signatures</SelectItem>
                            <SelectItem value="pen-testing">Penetration Testing</SelectItem>
                            <SelectItem value="other">Other Auditing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal text-base",
                                !startDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={(date) => {
                                setStartDate(date);
                                updateCalculation(linesOfCode, auditType, date);
                              }}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="border-t pt-6">
                        <h3 className="text-2xl font-grotesk font-semibold text-foreground mb-6">Estimated Timeline</h3>
                        
                        <div className="space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Planning Phase
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span>Initial consultation and scope definition</span>
                                <Badge variant="outline">3-5 days</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Documentation review and environment setup</span>
                                <Badge variant="outline">2-3 days</Badge>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Audit Execution
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span>Initial assessment and code analysis</span>
                                <Badge variant="secondary" className="font-mono">
                                  {calculatedDays.assessment} {calculatedDays.assessment !== 'Calculate based on inputs' ? 'days' : ''}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Comprehensive security testing</span>
                                <Badge variant="secondary" className="font-mono">
                                  {calculatedDays.testing} {calculatedDays.testing !== 'Calculate based on inputs' ? 'days' : ''}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Vulnerability analysis and documentation</span>
                                <Badge variant="secondary" className="font-mono">
                                  {calculatedDays.analysis} {calculatedDays.analysis !== 'Calculate based on inputs' ? 'days' : ''}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Final report preparation</span>
                                <Badge variant="secondary" className="font-mono">
                                  {calculatedDays.report} {calculatedDays.report !== 'Calculate based on inputs' ? 'days' : ''}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Post-Audit Follow-up
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span>Review meeting and findings discussion</span>
                                <Badge variant="outline">1-2 days</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Remediation verification (if needed)</span>
                                <Badge variant="outline">Calculate based on findings</Badge>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-foreground">Total Estimated Duration:</span>
                                <span className="text-2xl font-bold text-primary font-mono">{calculatedDays.total}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Estimated Completion Date:</span>
                                {calculatedDays.completion === 'Set start date to calculate' ? (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="ghost" className="p-0 h-auto font-normal text-primary hover:underline">
                                        {calculatedDays.completion}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                      <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={(date) => {
                                          setStartDate(date);
                                          updateCalculation(linesOfCode, auditType, date);
                                        }}
                                        initialFocus
                                        className={cn("p-3 pointer-events-auto")}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                ) : (
                                  <span className="font-medium font-mono">{calculatedDays.completion}</span>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </main>

        <NEARFooter />
      </div>
    </>
  );
};

export default QA;