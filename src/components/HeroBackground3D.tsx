import React from 'react';

// Temporary CSS-based background to replace the problematic 3D component
const HeroBackground3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 opacity-60">
      {/* Animated geometric background using CSS */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-primary/10"></div>
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          {/* Floating squares */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`square-${i}`}
              className="absolute w-16 h-16 border border-primary/30 rounded-sm animate-pulse"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${10 + (i * 8)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
                transform: `rotate(${i * 15}deg)`,
              }}
            />
          ))}
          
          {/* Connecting lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={`line-${i}`}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                style={{
                  width: `${30 + i * 10}%`,
                  left: `${i * 15}%`,
                  top: `${20 + i * 15}%`,
                  transform: `rotate(${i * 30}deg)`,
                  animation: `fade-in 2s ease-out ${i * 0.3}s both`,
                }}
              />
            ))}
          </div>
          
          {/* Plus symbols */}
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={`plus-${i}`}
              className="absolute w-3 h-3 text-primary/40"
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${25 + (i * 10)}%`,
                animation: `fade-in 1.5s ease-out ${i * 0.4}s both`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold">+</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40"></div>
      </div>
    </div>
  );
};

export default HeroBackground3D;