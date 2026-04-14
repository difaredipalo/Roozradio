
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Radio } from 'lucide-react';
import { RADIO_CONFIG } from '../../constants';

interface FloatingPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (v: number) => void;
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ isPlaying, togglePlay, volume, setVolume }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
        >
          <div className="glass-dark rounded-full p-2 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-4 ml-4">
              <div className="relative">
                <div className="w-10 h-10 bg-lounge-wood rounded-full flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/jazz/100/100" alt="Current" className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`} />
                </div>
                {isPlaying && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-lounge-orange rounded-full border-2 border-lounge-wood animate-pulse" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-lounge-beige leading-none mb-1">{RADIO_CONFIG.stationName}</span>
                <div className="flex items-center gap-2">
                  <Radio className="w-3 h-3 text-lounge-orange" />
                  <span className="font-sans text-[10px] uppercase tracking-widest text-lounge-beige/40">Live Broadcast</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full">
                <Volume2 className="w-4 h-4 text-lounge-beige/40" />
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume} 
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-lounge-beige/10 rounded-full appearance-none cursor-pointer accent-lounge-orange"
                />
              </div>

              <button 
                onClick={togglePlay}
                className="w-12 h-12 bg-lounge-orange rounded-full flex items-center justify-center text-lounge-wood hover:scale-105 active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingPlayer;
