import React, { useEffect, useState } from 'react';

const LOADING_STEPS = [
  "Establishing Secure Link...",
  "Querying Game Servers...",
  "Parsing Version Manifest...",
  "Extracting Balance Data...",
  "Formatting Intelligence..."
];

const LoadingSkeleton: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-nexus-accent/5 rounded-full blur-[100px] animate-pulse-subtle"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        
        {/* Animated Icon */}
        <div className="relative w-16 h-16 mb-12">
          {/* Outer Ring */}
          <div className="absolute inset-0 border border-nexus-accent/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
          
          {/* Scanning Line */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-nexus-accent/20 to-transparent animate-[shimmer_2s_linear_infinite] -translate-y-full"></div>
          </div>

          {/* Core Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-nexus-accent rounded-full shadow-[0_0_15px_rgba(0,240,255,0.8)] animate-pulse"></div>
          </div>
        </div>

        {/* Loading Bar Container */}
        <div className="w-full h-1 bg-gray-800/50 rounded-full overflow-hidden mb-6 relative backdrop-blur-sm">
          <div className="absolute inset-0 bg-nexus-accent/10"></div>
          {/* Fluid Progress Bar */}
          <div className="h-full bg-gradient-to-r from-nexus-secondary to-nexus-accent w-1/3 absolute top-0 left-0 rounded-full animate-[shimmer_2s_ease-in-out_infinite]" style={{ width: '40%', filter: 'blur(2px)' }}></div>
          <div className="h-full bg-nexus-accent w-1/3 absolute top-0 left-0 rounded-full animate-[shimmer_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
        </div>

        {/* Text Transition */}
        <div className="h-6 overflow-hidden flex flex-col items-center">
          {LOADING_STEPS.map((step, index) => (
             <p 
               key={index}
               className={`
                 font-mono text-xs tracking-[0.2em] uppercase text-nexus-accent/80
                 transition-all duration-700 ease-in-out absolute
               `}
               style={{
                 opacity: index === stepIndex ? 1 : 0,
                 transform: `translateY(${index === stepIndex ? 0 : 20}px)`,
                 filter: index === stepIndex ? 'blur(0px)' : 'blur(4px)'
               }}
             >
               {step}
             </p>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default LoadingSkeleton;
