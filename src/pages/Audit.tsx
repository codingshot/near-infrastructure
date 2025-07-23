import SEO from '@/components/SEO';
import NEARNavbar from '@/components/near/NEARNavbar';
import NEARFooter from '@/components/near/NEARFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ExternalLink, Shield, Users, CheckCircle, AlertTriangle, Info, Linkedin, Twitter } from 'lucide-react';
import { generateSlug } from '@/utils/slugs';
import { useState, useEffect } from 'react';

const Audit = () => {
  const [dillonData, setDillonData] = useState<any>(null);
  
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
        <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-foreground">NEAR Security Program</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            NEAR, in partnership with Valhalla Security, runs an audit program that subsidizes audits for native NEAR projects. 
            This is especially valuable for projects with DeFi components leveraging NEAR's smart contracts or those using 
            NEAR Chain Signatures for cross-chain contracts.
          </p>
        </div>

        {/* Partner Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Users className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Partnership with Valhalla Security</h3>
                <p className="text-muted-foreground">
                  Valhalla Security, comprised of former NEAR engineers, serves as an intermediary that interfaces 
                  with security firms to secure the best rates and highest quality firms for you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Audits Matter */}
        <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-orange-800 dark:text-orange-200">Why Audits Are Essential</h3>
                <p className="text-orange-700 dark:text-orange-300 mb-3">
                  For any serious project, an audit is a standard industry practice. Institutional investors and liquid funds require audits at minimum.
                </p>
                <p className="text-orange-700 dark:text-orange-300">
                  They may also expect additional security measures such as bug bounty programs, custodial services like Fireblocks, 
                  monitoring tools like OpenZeppelin Defender, and on-chain insurance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objectives */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Objectives</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Secure Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Subsidize builders and ensure NEAR applications are secure</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Support Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Alleviate heavy costs for lean DeFi teams</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  Lower Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Secure lower costs from reliable firms that would normally charge more to individual teams</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Prepare */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">How to Prepare</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {preparationSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Pro Tip:</strong> Check the <a href="https://t.me/neardev" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                    t.me/neardev
                  </a> chat and talk to NEAR OGs. We recommend having an advisor familiar with NEAR contracts on your team.
                </p>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">
                  <strong>Important:</strong> Keep in mind, audits traditionally cost MORE than your engineering costs for developing 
                  the contracts and sometimes exceed your entire burn for building the app. This is a necessary cost when building 
                  contracts that move millions to billions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Past Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Past Examples of Audits</h2>
          <div className="flex gap-4 mb-4">
            {pastExamples.map((example, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                {example}
              </Badge>
            ))}
          </div>
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 dark:text-blue-200">
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
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">What Qualifies You?</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{qualification}</p>
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
                {dillonData ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button 
                        className="text-primary hover:text-primary/80 underline font-medium cursor-pointer"
                        onClick={() => window.location.href = `/team/${generateSlug(dillonData.name)}`}
                      >
                        {dillonData.name}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                              <img 
                                src={dillonData.image} 
                                alt={dillonData.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder.svg?height=48&width=48&text=Team';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-grotesk font-semibold text-foreground mb-1">
                                {dillonData.name}
                              </h4>
                              <p className="text-primary font-medium text-xs mb-2 uppercase tracking-wide">
                                {dillonData.title}
                              </p>
                              <p className="text-muted-foreground text-xs line-clamp-3 leading-relaxed mb-3">
                                {dillonData.bio}
                              </p>
                              <div className="flex items-center gap-2">
                                {dillonData.linkedin && (
                                  <a
                                    href={dillonData.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary"
                                  >
                                    <Linkedin className="w-3 h-3" />
                                  </a>
                                )}
                                {dillonData.twitter && (
                                  <a
                                    href={dillonData.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary"
                                  >
                                    <Twitter className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <span className="text-primary font-medium">Dillon Freeman</span>
                )}{' '}
                at NEAR Foundation.
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