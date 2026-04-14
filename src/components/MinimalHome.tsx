
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Leaf } from 'lucide-react';
import { RADIO_CONFIG } from '../../constants';

const MinimalHome: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center texture-bg bg-lounge-beige overflow-hidden">
      {/* Warm Ambient Light */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-orange-200/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      {/* Scene Container */}
      <div className="relative w-full max-w-6xl flex flex-col items-center">
        
        {/* Plant (Monstera) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-[-10%] bottom-[-10%] w-96 h-96 pointer-events-none z-10 opacity-80"
        >
          <div className="relative w-full h-full">
            <Leaf className="w-full h-full text-lounge-olive/30 rotate-[-15deg]" />
            <Leaf className="absolute top-[-20%] left-[20%] w-64 h-64 text-lounge-olive/20 rotate-[10deg]" />
          </div>
        </motion.div>

        {/* The Furniture (Credenza) */}
        <div className="relative w-[600px] h-32 bg-lounge-wood rounded-sm shadow-soft z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] opacity-40 rounded-sm"></div>
          {/* Subtle details */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 w-1 h-8 bg-black/20 rounded-full"></div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-1 h-8 bg-black/20 rounded-full"></div>
          
          {/* Controls Integrated into Furniture */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-12">
            <div className="flex items-center gap-4">
              <Volume2 className="w-4 h-4 text-lounge-wood/40" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-32 h-1 bg-lounge-wood/10 rounded-full appearance-none cursor-pointer accent-lounge-wood/60"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-lounge-wood/20'}`} />
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-lounge-wood/40">Live</span>
            </div>
          </div>
        </div>

        {/* The Turntable (Player) */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-[480px] h-[320px] bg-white rounded-sm shadow-2xl p-8 flex items-center justify-center"
          >
            {/* Turntable Base Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-5"></div>
            
            {/* The Platter */}
            <div className="relative w-64 h-64 rounded-full bg-gray-100 border-4 border-gray-200 shadow-inner flex items-center justify-center">
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="w-[98%] h-[98%] rounded-full bg-[#111] shadow-2xl flex items-center justify-center relative cursor-pointer group"
                onClick={togglePlay}
                style={{
                  backgroundImage: `repeating-radial-gradient(circle at center, #050505 0px, #050505 1px, #111 2px, #050505 3px)`
                }}
              >
                {/* Label */}
                <div className="w-24 h-24 rounded-full bg-lounge-beige border-4 border-black flex items-center justify-center overflow-hidden">
                  <div className="text-[8px] font-black text-lounge-wood/40 uppercase tracking-widest text-center">
                    {RADIO_CONFIG.stationName} <br /> <span className="text-[6px]">Analog Fidelity</span>
                  </div>
                </div>
                {/* Reflection */}
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.05)_45deg,transparent_90deg)] pointer-events-none"></div>
              </motion.div>
            </div>

            {/* Tonearm */}
            <div className="absolute top-12 right-12 w-24 h-24 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 shadow-sm relative z-20"></div>
              <motion.div 
                animate={{ rotate: isPlaying ? 32 : 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ originX: "85%", originY: "15%" }}
                className="absolute top-10 right-10 w-48 h-2 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-md z-10 pointer-events-none"
              >
                <div className="absolute left-0 top-[-4px] w-10 h-6 bg-gray-800 rounded-sm -rotate-[15deg] flex items-center justify-center">
                  <div className="w-[1px] h-4 bg-red-500/50 rounded-full"></div>
                </div>
              </motion.div>
            </div>

            {/* Play/Pause Button Integrated into Turntable */}
            <button 
              onClick={togglePlay}
              className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-lounge-wood/40 hover:text-lounge-wood hover:border-gray-300 transition-all active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>
          </motion.div>
        </div>

      </div>

      {/* Minimal Branding */}
      <div className="absolute top-12 left-12 flex flex-col">
        <span className="font-serif text-2xl font-bold tracking-tight text-lounge-wood">{RADIO_CONFIG.stationName}</span>
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-lounge-wood/40">Analog Fidelity</span>
      </div>

      <audio ref={audioRef} src={RADIO_CONFIG.streamUrl} />
    </div>
  );
};

export default MinimalHome;
