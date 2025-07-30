import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NEARNavbar from "@/components/near/NEARNavbar";
import NEARFooter from "@/components/near/NEARFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Github, Twitter, Linkedin } from "lucide-react";
import { generateSlug } from '@/utils/slugs';

const QA = () => {
  const navigate = useNavigate();
  const [dillonData, setDillonData] = useState<any>(null);
  const [linesOfCode, setLinesOfCode] = useState<number>(0);
  const [auditType, setAuditType] = useState<string>('rust-smart-contract');
  const [startDate, setStartDate] = useState<string>('');
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

  const updateCalculation = (linesOfCode: number, auditType: string, startDate: string) => {
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

    // Base calculation factors
    const baseFactors: { [key: string]: { base: number; complexity: number } } = {
      'rust-smart-contract': { base: 5, complexity: 0.01 },
      'chain-signatures': { base: 8, complexity: 0.015 },
      'pen-testing': { base: 7, complexity: 0.008 },
      'other': { base: 6, complexity: 0.012 }
    };

    const factor = baseFactors[auditType] || baseFactors['other'];

    // Calculate days based on lines of code
    const assessmentDays = Math.max(2, Math.ceil(factor.base + (linesOfCode * factor.complexity * 0.3)));
    const testingDays = Math.max(3, Math.ceil(factor.base * 1.5 + (linesOfCode * factor.complexity * 0.5)));
    const analysisDays = Math.max(2, Math.ceil(factor.base * 0.8 + (linesOfCode * factor.complexity * 0.2)));
    const reportDays = Math.max(2, Math.ceil(factor.base * 0.6 + (linesOfCode * factor.complexity * 0.1)));

    // Calculate total (including fixed planning and review days)
    const planningDays = 6; // 3-5 + 2-3 average
    const reviewDays = 2;
    const totalDays = planningDays + assessmentDays + testingDays + analysisDays + reportDays + reviewDays;

    let completion = '-';
    if (startDate) {
      const start = new Date(startDate);
      const completionDate = new Date(start);
      completionDate.setDate(completionDate.getDate() + totalDays);
      completion = completionDate.toLocaleDateString();
    } else {
      completion = 'Set start date to calculate';
    }

    setCalculatedDays({
      assessment: assessmentDays.toString(),
      testing: testingDays.toString(),
      analysis: analysisDays.toString(),
      report: reportDays.toString(),
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
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="space-y-12">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  NEAR Testing Program
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  NEAR Testing Program is another support program similar to NEAR Security Program. We want to make sure testing so we team up with professional QA engineers to test products predefects for lean teams, with a hyper focus on space.
                </p>
              </div>

              {/* Program Objectives */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Program Objectives</h2>
                <p className="text-muted-foreground">
                  The NEAR Testing Program serves several key strategic objectives for our ecosystem:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Improve product quality:</strong> Help teams identify and resolve bugs, usability issues, and performance bottlenecks before they affect end users.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Support resource-constrained teams:</strong> Provide professional QA expertise to lean teams who may not have dedicated testing resources.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Accelerate development cycles:</strong> Enable faster iteration and more confident releases by providing structured testing feedback.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Enhance user experience:</strong> Ensure applications in the NEAR ecosystem provide smooth, intuitive experiences for all users.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Strengthen the ecosystem:</strong> Create a higher quality standard across all NEAR applications to build user trust and adoption.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Reduce post-launch issues:</strong> Minimize critical bugs that could damage reputation or require emergency fixes after launch.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Establish testing best practices:</strong> Help teams implement sustainable quality assurance processes in their development workflow.</span>
                  </li>
                </ul>
              </section>

              {/* How to Prepare */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">How to Prepare for QA Testing</h2>
                <p className="text-muted-foreground">
                  To make the most of the NEAR Testing Program, here are key steps to prepare your application for QA testers:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Provide comprehensive documentation:</strong> Include user flows, expected behaviors, and known issues to help testers understand your application.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Set up test environments:</strong> Create dedicated testing environments that closely mimic production settings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Define test scenarios:</strong> Outline specific scenarios and use cases you want testers to focus on.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Share access credentials:</strong> Provide necessary logins and permissions for testers to access all features.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Specify target platforms:</strong> Clearly indicate which browsers, devices, and operating systems your application should support.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Establish communication channels:</strong> Set up direct communication methods for testers to report issues and ask questions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Provide API documentation:</strong> If your application has APIs, include comprehensive documentation about endpoints and expected responses.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Highlight critical features:</strong> Identify the most important functionality that requires thorough testing.</span>
                  </li>
                </ul>
              </section>

              {/* How to Apply */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">How to Apply</h2>
                <p className="text-muted-foreground">
                  You should have a product live to test, reach out to{" "}
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
                  {" "}from the Infra team with your product link and we will setup the with the test labs
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Application Process</h3>
                  <p className="text-muted-foreground">
                    To apply for the NEAR Testing Program, please include the following in your submission:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Project overview:</strong> Brief description of your application and its purpose</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Technical stack:</strong> List of technologies used in your application</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Testing priorities:</strong> Areas where you need the most testing support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Timeline:</strong> Your expected development and launch schedule</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Team contact:</strong> Primary point of contact for testing coordination</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Past Examples */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Past Examples</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Templar Finance</li>
                  <li>• Sailor Lend</li>
                </ul>
              </section>

              {/* Expedited Process */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Projects with these features can get expedited in the process:</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Early-stage projects:</strong> Projects in the development phase may receive priority access to testing resources to ensure quality from the beginning.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>High-impact applications:</strong> Projects with potential for significant ecosystem impact or user adoption may receive extended testing support.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Open-source projects:</strong> Projects that contribute to the open-source community may receive specialized testing focus.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Has support channels and feedback mechanisms for bug testing (Intercom, <a href="http://users.fun" className="text-primary hover:underline">users.fun</a>, beta testers feedback)</span>
                  </li>
                </ul>
              </section>

              {/* Success Metrics */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Success Metrics</h2>
                <p className="text-muted-foreground">
                  We measure program success through quantitative metrics like bug detection rates, critical issue prevention, and user satisfaction scores, as well as qualitative feedback from participating teams. Responsiveness from teams, and quality of product base on user sentiment when launching.
                </p>
              </section>

              {/* Audit Calculator */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Audit Calculator</h2>
                <div className="bg-card border rounded-lg p-6 space-y-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>⚠️ Coming Soon & Not Accurate Disclaimer:</strong> This calculator provides rough estimates only and is currently in development. Actual audit times may vary significantly based on code complexity, dependencies, and other factors.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Lines of Code</label>
                      <input
                        type="number"
                        placeholder="e.g., 1000"
                        value={linesOfCode || ''}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        onChange={(e) => {
                          const newLinesOfCode = parseInt(e.target.value) || 0;
                          setLinesOfCode(newLinesOfCode);
                          updateCalculation(newLinesOfCode, auditType, startDate);
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Audit Type</label>
                      <select 
                        value={auditType}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        onChange={(e) => {
                          setAuditType(e.target.value);
                          updateCalculation(linesOfCode, e.target.value, startDate);
                        }}
                      >
                        <option value="rust-smart-contract">Rust Smart Contract on NEAR</option>
                        <option value="chain-signatures">NEAR Chain Signatures</option>
                        <option value="pen-testing">Penetration Testing</option>
                        <option value="other">Other Auditing</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          updateCalculation(linesOfCode, auditType, e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  
                  <div id="calculation-results" className="space-y-4">
                    <div className="border-t pt-4">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Estimated Timeline</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Planning Phase:</h4>
                          <ul className="space-y-2 text-muted-foreground ml-4">
                            <li>• Initial consultation and scope definition (<span id="planning-days">3-5</span> days)</li>
                            <li>• Documentation review and environment setup (<span id="setup-days">2-3</span> days)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Audit Execution:</h4>
                          <ul className="space-y-2 text-muted-foreground ml-4">
                            <li>• Initial assessment and code analysis (<span className="font-medium">{calculatedDays.assessment}</span> days)</li>
                            <li>• Comprehensive security testing (<span className="font-medium">{calculatedDays.testing}</span> days)</li>
                            <li>• Vulnerability analysis and documentation (<span className="font-medium">{calculatedDays.analysis}</span> days)</li>
                            <li>• Final report preparation (<span className="font-medium">{calculatedDays.report}</span> days)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Post-Audit Follow-up:</h4>
                          <ul className="space-y-2 text-muted-foreground ml-4">
                            <li>• Review meeting and findings discussion (<span id="review-days">1-2</span> days)</li>
                            <li>• Remediation verification (if needed) (<span id="verification-days">Calculate based on findings</span> days)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-primary/10 rounded-lg p-4 mt-4">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-foreground">Total Estimated Duration:</span>
                            <span className="text-xl font-bold text-primary">{calculatedDays.total}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-muted-foreground">Estimated Completion Date:</span>
                            <span className="font-medium">{calculatedDays.completion}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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