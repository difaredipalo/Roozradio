
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Disc, Radio, Leaf, Library, Lamp, Wind } from 'lucide-react';
import { RADIO_CONFIG } from '../../constants';

const HiFiLounge: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(new Date());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-[#080605] text-[#e9d5c3] font-serif selection:bg-[#d4a373]/30 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      
      {/* Real Living Room Background Layer */}
      <div className="fixed inset-0 z-0">
        {/* Wall with deep texture */}
        <div className="absolute inset-0 bg-[#0c0907] bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-40"></div>
        
        {/* Window with View (Center-Right) */}
        <div className="absolute right-1/4 top-20 w-80 h-96 border-[12px] border-[#1a120b] shadow-2xl overflow-hidden hidden lg:block">
            <img 
                src="https://picsum.photos/seed/night-city/800/1200?blur=4" 
                alt="Night City View" 
                className="w-full h-full object-cover opacity-40 brightness-50"
                referrerPolicy="no-referrer"
            />
            {/* Window Reflections */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 border-r border-white/5"></div>
        </div>

        {/* Floor (Parquet) */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[#140d09] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-50 border-t border-white/5"></div>
        
        {/* Rug Texture */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-[#2a1b15] bg-[url('https://www.transparenttextures.com/patterns/felt.png')] opacity-30 rounded-t-[100px] blur-sm"></div>

        {/* Vinyl Library Shelf (Left Side) */}
        <div className="absolute left-0 bottom-0 w-[26%] h-full bg-[#110a07] border-r-[16px] border-[#050403] shadow-[50px_0_120px_rgba(0,0,0,1)] hidden xl:flex flex-col p-12 gap-10 overflow-hidden opacity-90">
            <div className="flex items-center gap-5 mb-8 border-b border-white/10 pb-8">
                <Library className="w-7 h-7 text-[#d4a373]/60" />
                <span className="text-[14px] font-black uppercase tracking-[0.6em] text-[#d4a373]/60">The Archive</span>
            </div>
            {/* Multiple Shelves */}
            {[1, 2, 3, 4, 5].map(shelf => (
                <div key={shelf} className="flex-1 border-b border-white/5 flex items-end gap-[1.5px] pb-3">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div 
                            key={i} 
                            className="flex-1 h-[90%] rounded-sm transition-all hover:scale-y-110 hover:brightness-150 cursor-pointer"
                            style={{ 
                                backgroundColor: `hsl(${Math.random() * 360}, 12%, ${8 + Math.random() * 25}%)`,
                                borderLeft: '1px solid rgba(0,0,0,0.6)',
                                height: `${60 + Math.random() * 40}%`
                            }}
                        ></div>
                    ))}
                </div>
            ))}
        </div>

        {/* Vintage Floor Lamp (Right Side) */}
        <div className="absolute right-24 bottom-0 w-72 h-[95%] hidden xl:flex flex-col items-center justify-end opacity-70">
            {/* Lamp Shade */}
            <div className="w-56 h-40 bg-[#d4a373]/25 rounded-t-[120px] border-t-4 border-x-4 border-[#d4a373]/50 relative z-20 shadow-[0_-30px_70px_rgba(212,163,115,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#d4a373]/15 to-transparent rounded-t-[120px]"></div>
                {/* Light Bulb Glow */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-orange-400 blur-3xl rounded-full opacity-60"></div>
            </div>
            {/* Lamp Stand */}
            <div className="w-2.5 h-full bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] border-x border-white/5"></div>
            {/* Lamp Base */}
            <div className="w-40 h-8 bg-[#0a0a0a] rounded-t-xl border-t border-white/10 shadow-2xl"></div>
        </div>

        {/* Refined Plant (Right Side, in front of lamp) */}
        <div className="absolute right-48 bottom-0 w-96 h-[75%] hidden xl:flex flex-col items-center justify-end opacity-60 z-10">
            <div className="w-40 h-48 bg-gradient-to-b from-[#33241a] to-[#0f0b08] rounded-t-[40px] border-x-4 border-[#050403] shadow-2xl"></div>
            <div className="relative w-full h-full flex items-center justify-center">
                <motion.div animate={{ rotate: [0, 1, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-56">
                    <Leaf className="w-80 h-80 text-green-950/90 rotate-[20deg]" />
                </motion.div>
                <motion.div animate={{ rotate: [0, -1, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute -top-72">
                    <Leaf className="w-72 h-72 text-green-900/70 -rotate-[15deg]" />
                </motion.div>
            </div>
        </div>

        {/* Warm Ambient Lighting */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-orange-500/5 blur-[250px] rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-yellow-500/5 blur-[200px] rounded-full"></div>
      </div>

      {/* Main Hi-Fi Setup */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-16">
        
        {/* Top Section: The Turntable */}
        <div className="relative group">
          {/* Wooden Turntable Base */}
          <div className="w-[400px] md:w-[660px] aspect-[1.7/1] bg-[#241811] rounded-sm border-b-[28px] border-[#050403] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] opacity-90"></div>
            
            {/* The Platter */}
            <div className="absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[520px] aspect-square rounded-full bg-[#020202] border-[12px] border-[#080808] shadow-[inset_0_0_100px_rgba(0,0,0,1)] flex items-center justify-center">
              {/* Vinyl Record */}
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                className="w-[99%] h-[99%] rounded-full bg-[#010101] shadow-2xl flex items-center justify-center relative cursor-pointer group"
                onClick={togglePlay}
                style={{
                  backgroundImage: `repeating-radial-gradient(circle at center, #050505 0px, #050505 1px, #0c0c0c 2px, #050505 3px)`
                }}
              >
                {/* Record Label */}
                <div className="w-1/3 h-1/3 rounded-full bg-[#6b1111] border-[12px] border-black flex items-center justify-center relative shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.25)_45deg,transparent_90deg)] rounded-full"></div>
                  <Disc className="w-1/2 h-1/2 text-white/5" />
                  <div className="absolute top-3 text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">Stereo</div>
                </div>
                
                {/* Surface Reflection */}
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.06)_60deg,transparent_120deg,rgba(255,255,255,0.06)_240deg,transparent_300deg)] pointer-events-none"></div>
              </motion.div>
            </div>

            {/* Tonearm Assembly */}
            <div className="absolute top-20 right-20 w-36 h-36 flex items-center justify-center">
                {/* Pivot Base */}
                <div className="w-28 h-28 rounded-full bg-[#0a0a0a] border-4 border-[#1a1a1a] shadow-2xl flex items-center justify-center relative z-30">
                    <div className="w-14 h-14 rounded-full bg-[#020202] border-2 border-[#2a2a2a]"></div>
                </div>
                
                {/* The Arm */}
                <motion.div 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isPlaying ? 34 : 0 }}
                    transition={{ 
                        duration: 2.2, 
                        ease: [0.4, 0, 0.2, 1],
                        delay: isPlaying ? 0 : 0.4
                    }}
                    style={{ originX: "85%", originY: "15%" }}
                    className="absolute top-14 right-14 w-[240px] md:w-[360px] h-5 bg-gradient-to-b from-[#ccc] to-[#111] rounded-full shadow-2xl z-20 pointer-events-none"
                >
                    {/* Counterweight */}
                    <div className="absolute right-[-25px] top-[-12px] w-20 h-20 rounded-full bg-[#111] border-2 border-[#2a2a2a] shadow-2xl"></div>
                    
                    {/* Headshell & Needle */}
                    <div className="absolute left-0 top-[-12px] w-20 h-12 bg-[#020202] rounded-sm border border-[#1a1a1a] -rotate-[15deg] flex items-center justify-center">
                        <div className="w-[2.5px] h-8 bg-red-800/95 rounded-full shadow-[0_0_12px_rgba(153,27,27,0.8)]"></div>
                    </div>
                </motion.div>
            </div>

            {/* Branding on Wood */}
            <div className="absolute top-12 left-14 flex flex-col gap-2">
                <span className="text-[18px] font-black uppercase tracking-[1em] text-[#d4a373]/90">RoozRadio</span>
                <span className="text-[11px] uppercase tracking-[0.6em] text-[#d4a373]/60 font-black italic">Reference Series • 1974 Edition</span>
            </div>
          </div>
        </div>

        {/* Middle Section: The Amplifier */}
        <div className="w-full max-w-4xl bg-[#0a0a0a] rounded-sm border-t-2 border-white/5 shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] p-16 flex flex-col gap-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-5 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-28 relative z-10">
            
            {/* Analog VU Meters */}
            <div className="flex gap-12">
              {[1, 2].map(i => (
                <div key={i} className="w-56 h-36 bg-[#fffdf5] rounded-sm border-[6px] border-[#020202] relative overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.25)]">
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[12px] font-black text-black/60 uppercase tracking-[0.7em]">VU Level {i === 1 ? 'L' : 'R'}</div>
                  {/* Scale */}
                  <div className="absolute inset-x-10 top-10 h-20 border-b border-black/20 flex justify-between items-end px-1">
                    {Array.from({ length: 25 }).map((_, j) => (
                      <div key={j} className={`w-[1px] bg-black/25 ${j % 5 === 0 ? 'h-8' : 'h-3'}`}></div>
                    ))}
                  </div>
                  {/* The Needle */}
                  <motion.div 
                    animate={{ rotate: isPlaying ? (Math.random() * 50 - 25) : -45 }}
                    transition={{ duration: 0.08 }}
                    style={{ originX: "50%", originY: "100%" }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2.5px] h-32 bg-red-900 shadow-sm"
                  ></motion.div>
                </div>
              ))}
            </div>

            {/* Main Volume Knob */}
            <div className="flex flex-col items-center gap-12">
              <div className="relative group">
                <motion.div 
                  style={{ rotate: (volume * 270) - 135 }}
                  className="w-40 h-40 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#010101] border-[12px] border-[#080808] shadow-[0_50px_100px_rgba(0,0,0,1)] relative cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-10 bg-[#d4a373] rounded-full shadow-[0_0_30px_rgba(212,163,115,0.9)]"></div>
                  <div className="absolute inset-6 rounded-full border border-white/5"></div>
                </motion.div>
                {/* Volume Scale */}
                <div className="absolute -inset-12 pointer-events-none">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-2.5 h-2.5 bg-[#d4a373]/50 rounded-full"
                      style={{
                        left: `${50 + 55 * Math.cos(((i * 11.25) - 225) * Math.PI / 180)}%`,
                        top: `${50 + 55 * Math.sin(((i * 11.25) - 225) * Math.PI / 180)}%`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <span className="text-[14px] font-black uppercase tracking-[1.2em] text-[#d4a373]/70">Master Gain</span>
            </div>

            {/* Power Controls */}
            <div className="flex flex-col items-center gap-12">
              <button 
                onClick={togglePlay}
                className={`w-32 h-32 rounded-full border-[6px] flex items-center justify-center transition-all duration-700 ${isPlaying ? 'bg-[#d4a373] border-[#d4a373] text-[#1a120b] shadow-[0_0_80px_rgba(212,163,115,0.8)]' : 'bg-transparent border-[#d4a373]/20 text-[#d4a373]/30 hover:border-[#d4a373]/50'}`}
              >
                {isPlaying ? <Pause className="w-14 h-14 fill-current" /> : <Play className="w-14 h-14 fill-current ml-3" />}
              </button>
              <div className="flex gap-6">
                <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${isPlaying ? 'bg-orange-500 shadow-[0_0_25px_#f97316]' : 'bg-orange-950'}`}></div>
                <div className="w-4 h-4 rounded-full bg-white/5"></div>
              </div>
            </div>
          </div>

          {/* Digital Info Strip */}
          <div className="mt-14 pt-14 border-t border-white/5 flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <span className="text-[12px] uppercase tracking-[0.8em] text-[#d4a373]/60 font-black">Live Broadcast</span>
              <span className="text-3xl font-bold tracking-tight text-[#d4a373] flex items-center gap-6">
                <Radio className="w-8 h-8 text-orange-500" />
                {RADIO_CONFIG.stationName}
              </span>
            </div>
            <div className="flex flex-col items-end gap-4">
              <span className="text-[12px] uppercase tracking-[0.8em] text-[#d4a373]/60 font-black">System Clock</span>
              <span className="text-3xl font-mono font-bold tracking-[0.4em] text-[#d4a373] tabular-nums">
                {currentTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-32 flex flex-col items-center gap-6 opacity-20">
        <div className="flex items-center gap-12 text-[16px] font-black uppercase tracking-[1.5em]">
          <span>RoozRadio</span>
          <div className="w-3 h-3 rounded-full bg-[#d4a373]"></div>
          <span>Analog Fidelity</span>
        </div>
        <p className="text-[12px] uppercase tracking-[1em] font-medium italic">Engineered for the ultimate audiophile experience</p>
      </div>

      <audio ref={audioRef} src={RADIO_CONFIG.streamUrl} />
    </div>
  );
};

export default HiFiLounge;
