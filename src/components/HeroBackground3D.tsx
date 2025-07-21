import React from 'react';

const HeroBackground3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
      
      {/* Animated network pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            </radialGradient>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Network connections */}
          <g className="animate-pulse">
            <line x1="100" y1="150" x2="300" y2="100" stroke="url(#connectionGradient)" strokeWidth="2" />
            <line x1="300" y1="100" x2="500" y2="200" stroke="url(#connectionGradient)" strokeWidth="2" />
            <line x1="500" y1="200" x2="700" y2="150" stroke="url(#connectionGradient)" strokeWidth="2" />
            <line x1="700" y1="150" x2="900" y2="250" stroke="url(#connectionGradient)" strokeWidth="2" />
            <line x1="100" y1="150" x2="200" y2="350" stroke="url(#connectionGradient)" strokeWidth="2" />
            <line x1="500" y1="200" x2="600" y2="400" stroke="url(#connectionGradient)" strokeWidth="2" />
            <line x1="300" y1="100" x2="700" y2="150" stroke="url(#connectionGradient)" strokeWidth="2" />
            <line x1="200" y1="350" x2="600" y2="400" stroke="url(#connectionGradient)" strokeWidth="2" />
          </g>
          
          {/* Network nodes */}
          <g>
            <circle cx="100" cy="150" r="8" fill="url(#nodeGradient)" className="animate-pulse" />
            <circle cx="300" cy="100" r="8" fill="url(#nodeGradient)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="500" cy="200" r="8" fill="url(#nodeGradient)" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="700" cy="150" r="8" fill="url(#nodeGradient)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="900" cy="250" r="8" fill="url(#nodeGradient)" className="animate-pulse" style={{ animationDelay: '2s' }} />
            <circle cx="200" cy="350" r="8" fill="url(#nodeGradient)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
            <circle cx="600" cy="400" r="8" fill="url(#nodeGradient)" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
          </g>
          
          {/* Floating particles */}
          <g className="opacity-40">
            <circle cx="150" cy="80" r="2" fill="hsl(var(--accent))" className="animate-ping" />
            <circle cx="450" cy="120" r="2" fill="hsl(var(--accent))" className="animate-ping" style={{ animationDelay: '1s' }} />
            <circle cx="750" cy="300" r="2" fill="hsl(var(--accent))" className="animate-ping" style={{ animationDelay: '2s' }} />
            <circle cx="250" cy="450" r="2" fill="hsl(var(--accent))" className="animate-ping" style={{ animationDelay: '0.5s' }} />
          </g>
        </svg>
      </div>
      
      {/* Text readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/70 pointer-events-none" />
    </div>
  );
};

export default HeroBackground3D;