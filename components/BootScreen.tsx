
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
    <div className="fixed inset-0 bg-black flex flex-col items-start justify-start p-12 z-[10000] font-mono text-white text-sm uppercase leading-relaxed">
      <div className="space-y-1">
        <p>RoozRadio BIOS v4.0 Release 6.0</p>
        <p>Copyright (C) 2014-2026, RoozRadio Corp.</p>
        <p className="pt-4">CPU: RoozCore(TM) i97 @ 133MHz</p>
        <p>Memory Test: {Math.floor(progress * 640)}K OK</p>
        <p className="pt-4">Detecting IDE Primary Master ... [RoozDisk 2.1GB]</p>
        <p>Detecting IDE Primary Slave  ... [None]</p>
        <p className="pt-4">Starting RoozRadio OS...</p>
      </div>
      
      <div className="mt-auto w-full max-w-md space-y-2">
        <div className="flex justify-between text-[10px]">
          <span>Loading System Files...</span>
          <span>{progress}%</span>
        </div>
        <div className="win-inset bg-black h-6 p-1 flex gap-1">
          {Array.from({ length: Math.floor(progress / 5) }).map((_, i) => (
            <div key={i} className="w-3 h-full bg-[#000080]" />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 right-12 text-[10px] opacity-50">
        Press DEL to enter SETUP
      </div>
    </div>
  );
};

export default BootScreen;
