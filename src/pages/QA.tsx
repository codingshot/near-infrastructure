import React from "react";
import { useNavigate } from "react-router-dom";
import NEARNavbar from "@/components/near/NEARNavbar";
import NEARFooter from "@/components/near/NEARFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Github, Twitter } from "lucide-react";

const QA = () => {
  const navigate = useNavigate();

  const handleDillionClick = () => {
    navigate("/team/dillon");
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
                        Dillion
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="/team/dillion.jpeg" />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 flex-1">
                          <h4 className="text-sm font-semibold">Dillion Naidoo</h4>
                          <p className="text-sm text-muted-foreground">
                            Infrastructure Committee Lead
                          </p>
                          <p className="text-xs text-muted-foreground pt-2">
                            Leading the Infrastructure Committee to support and grow the NEAR ecosystem through strategic initiatives and community programs.
                          </p>
                          <div className="flex items-center space-x-2 pt-2">
                            <Twitter className="h-4 w-4 text-muted-foreground" />
                            <Github className="h-4 w-4 text-muted-foreground" />
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
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

              {/* Timeline */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Timeline</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Timeline for Testing Process</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Planning Phase:</h4>
                      <ul className="space-y-2 text-muted-foreground ml-4">
                        <li>• Reach out 1 month in advance of your alpha launch to allow sufficient time for testing coordination</li>
                        <li>• Prepare documentation and testing environments</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Testing Execution:</h4>
                      <ul className="space-y-2 text-muted-foreground ml-4">
                        <li>• Initial assessment (_____ days)</li>
                        <li>• Comprehensive testing (_____ days)</li>
                        <li>• Final report preparation (_____ days)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Post-Testing Follow-up:</h4>
                      <ul className="space-y-2 text-muted-foreground ml-4">
                        <li>• Review meeting to discuss findings</li>
                        <li>• Teams address critical issues within _____</li>
                        <li>• Documentation of fixes required</li>
                        <li>• Verification testing available for resolved issues</li>
                      </ul>
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