
import React, { useEffect, useState } from 'react';
import { RADIO_CONFIG } from '../constants';

const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-[10000]">
      <div className="text-white mb-24 relative">
        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 scale-150"></div>
        <svg className="w-24 h-24 relative" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7.5h2V12.5z" />
        </svg>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Loading Spinner */}
        <div className="w-10 h-10 border-2 border-white/5 border-t-blue-500 rounded-full animate-spin mb-10" />
        
        <div className="text-white text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
            {RADIO_CONFIG.stationName} OS
        </div>
      </div>

      <div className="absolute bottom-16 w-48 h-[1px] bg-white/10 overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default BootScreen;
