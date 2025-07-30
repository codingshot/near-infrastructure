import SEO from '@/components/SEO';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ExternalLink, Shield, Users, CheckCircle, AlertTriangle, Info, Linkedin, Twitter, CalendarIcon, Clock, Edit } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { generateSlug } from '@/utils/slugs';
import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';

const Audit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const calculatorRef = useRef<HTMLDivElement>(null);
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
    completion: 'Set start date to calculate'
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
    
    // Load URL parameters if present
    const urlLinesOfCode = searchParams.get('lines');
    const urlAuditType = searchParams.get('type');
    const urlStartDate = searchParams.get('start');
    
    if (urlLinesOfCode || urlAuditType || urlStartDate) {
      const lines = urlLinesOfCode ? parseInt(urlLinesOfCode) : 0;
      const type = urlAuditType || 'rust-smart-contract';
      const start = urlStartDate ? new Date(urlStartDate) : undefined;
      
      if (lines) setLinesOfCode(lines);
      if (urlAuditType) setAuditType(type);
      if (start && !isNaN(start.getTime())) setStartDate(start);
      
      updateCalculation(lines, type, start);
      
      // Scroll to calculator section
      setTimeout(() => {
        calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  const updateUrlParams = (lines: number, type: string, date: Date | undefined) => {
    const newParams = new URLSearchParams();
    if (lines > 0) newParams.set('lines', lines.toString());
    if (type) newParams.set('type', type);
    if (date) newParams.set('start', date.toISOString().split('T')[0]);
    
    setSearchParams(newParams);
  };

  const updateCalculation = (linesOfCode: number, auditType: string, startDate: Date | undefined) => {
    // Update URL parameters
    updateUrlParams(linesOfCode, auditType, startDate);
    
    if (!linesOfCode || linesOfCode <= 0) {
      setCalculatedDays({
        assessment: 'Calculate based on inputs',
        testing: 'Calculate based on inputs',
        analysis: 'Calculate based on inputs', 
        report: 'Calculate based on inputs',
        total: 'Enter details to calculate',
        completion: 'Set start date to calculate'
      });
      return;
    }

    // More reasonable calculation factors
    const baseFactors: { [key: string]: { base: number; complexity: number; multiplier: number } } = {
      'rust-smart-contract': { base: 2, complexity: 0.006, multiplier: 1.0 },
      'chain-signatures': { base: 3, complexity: 0.008, multiplier: 1.2 },
      'pen-testing': { base: 3, complexity: 0.005, multiplier: 0.9 },
      'other': { base: 2.5, complexity: 0.007, multiplier: 1.1 }
    };

    const factor = baseFactors[auditType] || baseFactors['other'];

    // More reasonable complexity scaling - less aggressive growth
    const complexityScale = Math.min(1 + (linesOfCode / 20000) * 0.3, 1.8); // Cap at 1.8x for very large codebases
    
    // More reasonable day calculations
    const assessmentDays = Math.max(1, Math.ceil((factor.base + (linesOfCode * factor.complexity * 0.4)) * complexityScale));
    const testingDays = Math.max(2, Math.ceil((factor.base * 1.2 + (linesOfCode * factor.complexity * 0.6)) * factor.multiplier));
    const analysisDays = Math.max(1, Math.ceil((factor.base * 0.7 + (linesOfCode * factor.complexity * 0.3)) * complexityScale));
    const reportDays = Math.max(1, Math.ceil((factor.base * 0.5 + (linesOfCode * factor.complexity * 0.2)) * 1.0));

    // More reasonable planning and review days
    const planningDays = linesOfCode > 8000 ? 4 : linesOfCode > 3000 ? 3 : 2;
    const reviewDays = linesOfCode > 15000 ? 2 : 1;
    const remediationDays = 7; // Default 1 week for revisions
    const totalDays = planningDays + assessmentDays + testingDays + analysisDays + reportDays + reviewDays + remediationDays;

    let completion = 'Set start date to calculate';
    if (startDate) {
      const completionDate = new Date(startDate);
      completionDate.setDate(completionDate.getDate() + totalDays);
      completion = format(completionDate, 'PPP');
    }

    setCalculatedDays({
      assessment: `${assessmentDays} day${assessmentDays !== 1 ? 's' : ''}`,
      testing: `${testingDays} day${testingDays !== 1 ? 's' : ''}`,
      analysis: `${analysisDays} day${analysisDays !== 1 ? 's' : ''}`,
      report: `${reportDays} day${reportDays !== 1 ? 's' : ''}`,
      total: `${totalDays} days`,
      completion
    });
  };

  const pastExamples = [
    'Templar Protocol',
    'Fast Auth 2.0'
  ];

  const firms = [
    {
      category: 'Smart Contracts',
      companies: [
        { name: 'Ottersec', url: 'https://osec.io' },
        { name: 'Blocksec', url: 'https://blocksec.com/' },
        { name: 'Guvenkaya', url: 'https://www.guvenkaya.co/' }
      ]
    },
    {
      category: 'Cryptography',
      companies: [
        { name: 'Trail of Bits', url: 'https://www.trailofbits.com/' }
      ]
    },
    {
      category: 'Tooling',
      companies: [
        { name: 'TRM Labs (Security Monitoring)', url: 'https://www.trmlabs.com/' }
      ]
    }
  ];

  const qualifications = [
    'Professional DeFi team or developer building core infrastructure that other teams will build upon',
    'Building native NEAR contracts or implementing NEAR Chain Signatures in contracts',
    'Contract expected to handle millions in value (since audits can cost tens to hundreds of thousands of dollars, projects with less financial activity may not justify the expense)',
    'Completed beta testing phase',
    'Contracts with comprehensive test coverage'
  ];

  const preparationSteps = [
    'Make sure your code is clean, lean, and efficient (audits are quoted based on lines of code)',
    'Separate financial logic from simple state contracts',
    'Complete your final revisions before scheduling an audit',
    'Be available to respond and make quick changes during the audit process',
    'Ensure the smart contract developer is accessible throughout',
    'Get someone in the ecosystem to review your code first',
    'Create thorough tests and test within the app',
    'Prepare a public or private GitHub repository with clear commit hash',
    'Plan well ahead of time (audits are often booked months in advance)'
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="NEAR Security Program - Audit Subsidies | NEAR Infrastructure Committee"
        description="NEAR's audit program subsidizes security audits for native NEAR projects. Partner with Valhalla Security for discounted rates from top security firms."
        keywords="NEAR audit, security audit, smart contract audit, DeFi security, blockchain security, Valhalla Security"
        canonical="https://nearinfra.com/audit"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "NEAR Security Program",
          "description": "NEAR's audit program subsidizes security audits for native NEAR projects",
          "url": "https://nearinfra.com/audit"
        }}
      />
      <NEARNavbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-primary mr-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-grotesk font-bold text-foreground">NEAR Security Program</h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            NEAR, in partnership with Valhalla Security, runs an audit program that subsidizes audits for native NEAR projects. 
            This is especially valuable for projects with DeFi components leveraging NEAR's smart contracts or those using 
            NEAR Chain Signatures for cross-chain contracts.
          </p>
        </div>

        {/* Partner Info */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Users className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-xl mb-3">Partnership with Valhalla Security</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Valhalla Security, comprised of former NEAR engineers, serves as an intermediary that interfaces 
                  with security firms to secure the best rates and highest quality firms for you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Audits Matter */}
        <Card className="mb-12 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-8 w-8 text-orange-600 mt-1" />
              <div>
                <h3 className="font-semibold text-xl mb-3 text-orange-800 dark:text-orange-200">Why Audits Are Essential</h3>
                <p className="text-orange-700 dark:text-orange-300 mb-4 text-lg leading-relaxed">
                  For any serious project, an audit is a standard industry practice. Institutional investors and liquid funds require audits at minimum.
                </p>
                <p className="text-orange-700 dark:text-orange-300 text-lg leading-relaxed">
                  They may also expect additional security measures such as bug bounty programs, custodial services like Fireblocks, 
                  monitoring tools like OpenZeppelin Defender, and on-chain insurance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objectives */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-grotesk font-bold mb-8 text-foreground">Objectives</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Shield className="h-6 w-6 mr-3 text-primary" />
                  Secure Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">Subsidize builders and ensure NEAR applications are secure</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-6 w-6 mr-3 text-primary" />
                  Support Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">Alleviate heavy costs for lean DeFi teams</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <CheckCircle className="h-6 w-6 mr-3 text-primary" />
                  Lower Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">Secure lower costs from reliable firms that would normally charge more to individual teams</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Prepare */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-grotesk font-bold mb-8 text-foreground">How to Prepare</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                {preparationSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground text-lg leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 text-lg leading-relaxed">
                  <strong>Pro Tip:</strong> Check the <a href="https://t.me/neardev" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                    t.me/neardev
                  </a> chat and talk to NEAR OGs. We recommend having an advisor familiar with NEAR contracts on your team.
                </p>
              </div>
              <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 text-lg leading-relaxed">
                  <strong>Important:</strong> Keep in mind, audits traditionally cost MORE than your engineering costs for developing 
                  the contracts and sometimes exceed your entire burn for building the app. This is a necessary cost when building 
                  contracts that move millions to billions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Past Examples */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-grotesk font-bold mb-8 text-foreground">Past Examples of Audits</h2>
          <div className="flex gap-4 mb-6">
            {pastExamples.map((example, index) => (
              <Badge key={index} variant="secondary" className="text-base px-6 py-3">
                {example}
              </Badge>
            ))}
          </div>
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Info className="h-6 w-6 text-blue-600" />
                <span className="text-blue-800 dark:text-blue-200 text-lg">
                  Want to see past audits in the NEAR Ecosystem? Visit{' '}
                  <a
                    href="https://github.com/NEARBuilders/audits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600 font-medium"
                  >
                    github.com/NEARBuilders/audits
                  </a>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Qualifications */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-grotesk font-bold mb-8 text-foreground">What Qualifies You?</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                {qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground text-lg leading-relaxed">{qualification}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Who to Contact</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                By this point, you should already have a contact in the NEAR Ecosystem who can forward you to{' '}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button 
                      className="text-primary hover:underline font-medium cursor-pointer"
                      onClick={() => window.location.href = `/team/${generateSlug(dillonData?.name || 'dillon-freeman')}`}
                    >
                      {dillonData?.name || 'Dillon Freeman'}
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
                {' '}at NEAR Foundation.
              </p>
              <Button asChild>
                <a href="/team" className="inline-flex items-center">
                  View Team Directory
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Security Firms */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Security Firms We Work With</h2>
          <div className="space-y-6">
            {firms.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.companies.map((company, companyIndex) => (
                      <div key={companyIndex} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                        <span className="font-medium">{company.name}</span>
                        <Button variant="outline" size="sm" asChild>
                          <a href={company.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                            Visit
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* For Firms */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">For Security Firms</h2>
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Info className="h-6 w-6 text-green-600" />
                <p className="text-green-800 dark:text-green-200">
                  Are you a security firm that wants to work in the NEAR Ecosystem and be part of this program? 
                  Get in touch with us through our team directory.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Calculator */}
        <div className="mb-12" ref={calculatorRef}>
          <h2 className="text-3xl font-bold mb-6 text-foreground">Audit Calculator</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Estimate timeline and completion date for your security audit
          </p>
          
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 space-y-8">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Coming Soon & Not Accurate Disclaimer</h3>
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
                    value={linesOfCode || ''}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setLinesOfCode(value);
                      updateCalculation(value, auditType, startDate);
                    }}
                    placeholder="e.g., 1000"
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
                    <SelectTrigger className="text-base" data-testid="audit-type-select">
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
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
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
                        className="p-3 pointer-events-auto"
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
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            Planning Phase
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const element = document.getElementById('lines-of-code');
                              element?.focus();
                              element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
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
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Audit Execution
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const element = document.querySelector('[data-testid="audit-type-select"]') as HTMLElement;
                              element?.click();
                              element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Initial assessment and code analysis</span>
                          <Badge variant="secondary" className="font-mono">
                            {calculatedDays.assessment}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Comprehensive security testing</span>
                          <Badge variant="secondary" className="font-mono">
                            {calculatedDays.testing}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Vulnerability analysis and documentation</span>
                          <Badge variant="secondary" className="font-mono">
                            {calculatedDays.analysis}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Final report preparation</span>
                          <Badge variant="secondary" className="font-mono">
                            {calculatedDays.report}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Post-Audit Follow-up
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const element = document.querySelector('.space-y-3:has(> .space-y-3 > Label)') as HTMLElement;
                              element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Review meeting and findings discussion</span>
                          <Badge variant="outline">1-2 days</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Remediation verification (if needed)</span>
                          <Badge variant="outline">7 days</Badge>
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
                          {!startDate ? (
                            <Popover>
                              <PopoverTrigger asChild>
                                <button className="text-primary font-semibold hover:underline cursor-pointer">
                                  {calculatedDays.completion}
                                </button>
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
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          ) : (
                            <span className="text-primary font-semibold">{calculatedDays.completion}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final Note */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-red-800 dark:text-red-200">Don't Think You Need an Audit?</h3>
                <p className="text-red-700 dark:text-red-300">
                  Major hacks happen all the time. Follow Web3isGoingGreat to keep a pulse on web3 security incidents at{' '}
                  <a
                    href="https://web3isgoinggreat.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-600 font-medium"
                  >
                    web3isgoinggreat.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </main>
      <NEARFooter />
    </div>
  );
};

export default Audit;