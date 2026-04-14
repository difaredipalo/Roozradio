
import React, { useState, useEffect } from 'react';
import RadioPlayer from './RadioPlayer';
import { RADIO_CONFIG, WALLPAPERS } from '../constants';

interface MobileViewProps {
  systemVolume: number;
  setSystemVolume: (val: number) => void;
  wallpaperIndex: number;
  setWallpaperIndex: (val: number) => void;
  onOpenApp?: (id: string) => void;
}

const MobileView: React.FC<MobileViewProps> = ({ 
  systemVolume, 
  setSystemVolume,
  wallpaperIndex,
  setWallpaperIndex
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentWallpaper = WALLPAPERS[wallpaperIndex] || '#008080';
  const isHex = currentWallpaper.startsWith('#');

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#008080]">
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header */}
      <div className="z-10 p-6 pt-12 flex items-start justify-between w-full bg-gradient-to-b from-black/20 to-transparent">
        <div className="flex flex-col">
            <div className="text-5xl font-bold text-white tracking-tighter tabular-nums drop-shadow-lg">
            {currentTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80 mt-2 drop-shadow-md">
            {currentTime.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
        </div>
        <button 
            onClick={() => setShowInfo(true)}
            className="win-button w-10 h-10 rounded-none flex items-center justify-center"
        >
            ℹ️
        </button>
      </div>

      {/* Main Content */}
      <div className="z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm win-outset bg-[#c0c0c0] p-1 shadow-2xl">
          <div className="win-inset bg-white">
            <RadioPlayer 
              systemVolume={systemVolume} 
              setSystemVolume={setSystemVolume} 
              isMiniOverride={true} 
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="z-10 p-8 text-center">
        <h1 className="text-xl font-bold uppercase text-white tracking-tight drop-shadow-lg">
          {RADIO_CONFIG.stationName}
        </h1>
        <p className="text-[9px] text-white/80 font-bold uppercase tracking-[0.3em] mt-1 drop-shadow-md">
          Streaming Live 24/7
        </p>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowInfo(false)} />
            <div className="relative w-full max-w-sm bg-[#c0c0c0] win-outset p-1 shadow-2xl overflow-hidden">
                <div className="win-titlebar">
                    <span>Informazioni</span>
                    <button onClick={() => setShowInfo(false)} className="win-button w-4 h-4 p-0 text-[10px]">✕</button>
                </div>
                <div className="p-6 space-y-6 text-black">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold uppercase">
                            {RADIO_CONFIG.stationName}
                        </h2>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Dal 2014 ad oggi</p>
                    </div>
                    <div className="win-inset bg-white p-3 text-xs leading-relaxed">
                        {RADIO_CONFIG.description}
                    </div>
                    <div className="flex justify-center pt-4">
                        <button onClick={() => setShowInfo(false)} className="win-button px-8 py-1 font-bold">CHIUDI</button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default MobileView;
