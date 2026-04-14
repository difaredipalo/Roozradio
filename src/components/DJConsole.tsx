
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Radio, Disc, Settings, Info, Power } from 'lucide-react';
import { RADIO_CONFIG } from '../../constants';

const DJConsole: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [pitch, setPitch] = useState(0);
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
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Platter rotation animation
  const platterControls = useAnimation();
  useEffect(() => {
    if (isPlaying) {
      platterControls.start({
        rotate: 360,
        transition: { duration: 1.8, repeat: Infinity, ease: "linear" }
      });
    } else {
      platterControls.stop();
    }
  }, [isPlaying, platterControls]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500/30 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Background Texture - Brushed Metal Look */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>
      
      {/* Main Console Container */}
      <div className="relative w-full max-w-7xl bg-[#121212] rounded-[15px] md:rounded-[25px] border-[10px] border-[#1a1a1a] shadow-[0_50px_100px_-20px_rgba(0,0,0,1),inset_0_0_40px_rgba(255,255,255,0.02)] flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Turntable Section (Classic SL-1200 Style) */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-black/50 relative min-h-[400px] bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
          <div className="absolute top-6 left-8 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Deck A / Direct Drive</span>
          </div>
          
          {/* Turntable Platter Base */}
          <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-square rounded-full bg-[#0a0a0a] border-[12px] border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center group">
            
            {/* Strobe Dots (Outer Ring) */}
            <div className="absolute inset-[-4px] rounded-full border-[6px] border-dotted border-white/10 opacity-40"></div>
            
            {/* Strobe Light (Red LED reflecting on dots) */}
            <div className={`absolute bottom-10 left-10 w-4 h-4 rounded-full blur-sm z-40 transition-opacity duration-300 ${isPlaying ? 'bg-red-600/60 opacity-100' : 'bg-red-900/20 opacity-0'}`}></div>
            
            {/* Target Light (Pop-up light for stylus) */}
            <div className="absolute top-10 left-10 w-6 h-10 bg-[#2a2a2a] rounded-t-full border border-[#333] shadow-lg flex items-start justify-center pt-1">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isPlaying ? 'bg-yellow-200 shadow-[0_0_15px_#fef08a]' : 'bg-yellow-900/20'}`}></div>
            </div>

            {/* Vinyl Record */}
            <motion.div 
              animate={platterControls}
              className="w-[94%] h-[94%] rounded-full bg-[#080808] shadow-2xl flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing"
              style={{
                backgroundImage: `
                  repeating-radial-gradient(circle at center, #111 0px, #111 1px, #181818 2px, #111 3px),
                  radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)
                `
              }}
            >
              {/* Record Label */}
              <div className="w-1/3 h-1/3 rounded-full bg-red-700 border-[6px] border-black flex items-center justify-center relative shadow-inner">
                <Radio className="w-1/2 h-1/2 text-white/90" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-white/20 rounded-full"></div>
              </div>
              
              {/* Grooves Reflection */}
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.05)_45deg,transparent_90deg,rgba(255,255,255,0.05)_135deg,transparent_180deg,rgba(255,255,255,0.05)_225deg,transparent_270deg,rgba(255,255,255,0.05)_315deg,transparent_360deg)] pointer-events-none"></div>
            </motion.div>
            
            {/* Tone Arm Assembly */}
            <div className="absolute top-[-20px] right-[-20px] w-1/2 h-full pointer-events-none z-30">
                {/* Pivot Base */}
                <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-[#2a2a2a] border-4 border-[#333] shadow-2xl flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#444]"></div>
                </div>
                {/* Arm Tube */}
                <motion.div 
                    animate={{ rotate: isPlaying ? 25 : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{ originX: "85%", originY: "15%" }}
                    className="absolute top-16 right-16 w-[200px] h-3 bg-gradient-to-b from-[#444] to-[#222] rounded-full shadow-lg"
                >
                    {/* Headshell */}
                    <div className="absolute left-0 top-[-4px] w-10 h-5 bg-[#111] rounded-sm border border-[#333] transform -rotate-[15deg]">
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-red-600 rounded-full"></div>
                    </div>
                </motion.div>
            </div>
          </div>
          
          {/* Deck Controls */}
          <div className="mt-10 w-full flex items-end justify-between px-4">
            {/* Start/Stop Button */}
            <button 
                onClick={togglePlay}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-4 transition-all duration-200 flex flex-col items-center justify-center gap-1 shadow-2xl active:translate-y-1 ${isPlaying ? 'bg-[#1a1a1a] border-red-600 text-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-[#222] border-[#333] text-white/40 hover:border-white/20'}`}
            >
                <Power className="w-6 h-6" />
                <span className="text-[8px] font-black uppercase tracking-widest">Start/Stop</span>
            </button>

            {/* Pitch Fader */}
            <div className="flex flex-col items-center gap-2">
                <div className="relative h-40 w-12 bg-black/60 rounded-sm border-2 border-[#222] flex flex-col items-center py-4 shadow-inner">
                    <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-[2px] bg-[#1a1a1a]"></div>
                    {/* Scale Marks */}
                    <div className="absolute inset-y-4 left-2 flex flex-col justify-between text-[6px] text-white/20 font-mono">
                        <span>+8</span><span>0</span><span>-8</span>
                    </div>
                    <motion.div 
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 120 }}
                        onDrag={(_, info) => setPitch(Math.round((1 - (info.point.y / 120) * 2) * 8))}
                        className="w-10 h-6 bg-gradient-to-b from-[#444] to-[#222] border border-[#555] rounded-sm shadow-2xl cursor-ns-resize relative z-20 flex items-center justify-center"
                    >
                        <div className="w-full h-[2px] bg-red-600/80"></div>
                    </motion.div>
                </div>
                <span className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Pitch Control</span>
            </div>
          </div>
        </div>

        {/* Center Mixer Section (Professional DJ Mixer) */}
        <div className="w-full lg:w-[380px] bg-[#151515] flex flex-col items-center p-6 border-y lg:border-y-0 lg:border-x border-black/50 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative min-h-[500px]">
          
          {/* LCD Master Display */}
          <div className="w-full bg-[#050505] rounded-lg p-5 mb-8 border-2 border-[#222] shadow-[inset_0_0_30px_rgba(0,255,0,0.05)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]" />
            
            <div className="relative z-20 space-y-3">
                <div className="flex justify-between items-center border-b border-green-500/10 pb-2">
                    <span className="text-[8px] font-mono text-green-500/40 uppercase tracking-[0.3em]">Master Console</span>
                    <div className="flex gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-green-900'}`}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-900"></div>
                    </div>
                </div>
                
                <div className="space-y-1">
                    <div className="text-sm font-mono text-green-500 truncate uppercase font-black tracking-tight">
                        {RADIO_CONFIG.stationName}
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[10px] font-mono text-green-500/60 tabular-nums">
                            {currentTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                        <div className="text-[10px] font-mono text-red-500/80 font-bold animate-pulse">LIVE</div>
                    </div>
                </div>
                
                {/* Level Meter (VU Meter) */}
                <div className="flex gap-[3px] h-6 items-end pt-2">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <motion.div 
                            key={i}
                            animate={{ height: isPlaying ? `${Math.random() * 90 + 10}%` : '10%' }}
                            className={`flex-1 rounded-t-[1px] ${i > 20 ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]' : i > 16 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        ></motion.div>
                    ))}
                </div>
            </div>
          </div>

          {/* Mixer Controls */}
          <div className="flex-1 w-full flex flex-col items-center justify-between py-2">
            
            {/* EQ Section */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-10">
                {['High', 'Mid', 'Low', 'Filter'].map((label, idx) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#333] to-[#111] border-2 border-[#444] shadow-xl relative cursor-pointer group active:scale-95 transition-transform">
                            <motion.div 
                                animate={{ rotate: isPlaying ? (Math.random() * 40 - 20) : 0 }}
                                className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-3 bg-red-600 rounded-full shadow-[0_0_5px_rgba(220,38,38,0.5)]"
                            ></motion.div>
                            {/* Grip Lines */}
                            <div className="absolute inset-2 rounded-full border border-white/5"></div>
                        </div>
                        <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">{label}</span>
                    </div>
                ))}
            </div>

            {/* Volume Section */}
            <div className="w-full flex flex-col items-center gap-6 px-10">
                <div className="w-full flex justify-between items-center mb-[-10px]">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Volume</span>
                    <div className="bg-black border border-white/10 rounded px-2 py-0.5 shadow-inner">
                        <span className="text-[12px] font-mono text-red-500 font-bold tabular-nums">
                            {Math.round(volume * 100).toString().padStart(3, '0')}
                        </span>
                    </div>
                </div>
                
                <div className="relative w-full h-48 bg-[#0a0a0a] rounded-md border-2 border-[#222] flex flex-col items-center py-4 shadow-inner">
                    {/* Fader Track */}
                    <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-1 bg-[#1a1a1a] rounded-full"></div>
                    {/* Scale Marks */}
                    <div className="absolute inset-y-4 left-4 flex flex-col justify-between text-[7px] text-white/10 font-mono font-bold">
                        <span>10</span><span>8</span><span>6</span><span>4</span><span>2</span><span>0</span>
                    </div>
                    
                    <motion.div 
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 140 }}
                        onDrag={(_, info) => {
                            const newVol = 1 - (info.point.y / 140);
                            setVolume(Math.max(0, Math.min(1, newVol)));
                        }}
                        className="w-16 h-8 bg-gradient-to-b from-[#444] to-[#222] border-2 border-[#555] rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-ns-resize relative z-20 flex items-center justify-center active:scale-105 transition-transform"
                    >
                        <div className="w-10 h-[3px] bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                        <div className="absolute inset-x-2 top-1 h-[1px] bg-white/10"></div>
                    </motion.div>
                </div>
            </div>

            {/* Crossfader */}
            <div className="w-full px-10 pt-10">
                <div className="relative w-full h-10 bg-[#0a0a0a] rounded-md border-2 border-[#222] flex items-center px-4 shadow-inner">
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-1 bg-[#1a1a1a] rounded-full"></div>
                    <motion.div 
                        drag="x"
                        dragConstraints={{ left: 0, right: 140 }}
                        className="w-10 h-8 bg-gradient-to-b from-[#444] to-[#222] border-2 border-[#555] rounded-sm shadow-2xl cursor-ew-resize relative z-20 flex items-center justify-center"
                    >
                        <div className="w-[3px] h-6 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                    </motion.div>
                </div>
                <div className="flex justify-between mt-3 text-[8px] font-black text-white/10 tracking-[0.3em]">
                    <span>DECK A</span>
                    <span>DECK B</span>
                </div>
            </div>
          </div>
        </div>

        {/* Right Turntable Section (Classic SL-1200 Style) */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 relative min-h-[400px] bg-gradient-to-bl from-[#1a1a1a] to-[#0f0f0f]">
          <div className="absolute top-6 right-8 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Deck B / Scratch Pad</span>
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)] animate-pulse"></div>
          </div>
          
          {/* Turntable Platter Base */}
          <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-square rounded-full bg-[#0a0a0a] border-[12px] border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center group">
            
            {/* Strobe Dots */}
            <div className="absolute inset-[-4px] rounded-full border-[6px] border-dotted border-white/10 opacity-40"></div>
            
            {/* Strobe Light */}
            <div className={`absolute bottom-10 right-10 w-4 h-4 rounded-full blur-sm z-40 transition-opacity duration-300 ${isPlaying ? 'bg-red-600/60 opacity-100' : 'bg-red-900/20 opacity-0'}`}></div>
            
            {/* Target Light */}
            <div className="absolute top-10 right-10 w-6 h-10 bg-[#2a2a2a] rounded-t-full border border-[#333] shadow-lg flex items-start justify-center pt-1">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isPlaying ? 'bg-yellow-200 shadow-[0_0_15px_#fef08a]' : 'bg-yellow-900/20'}`}></div>
            </div>

            {/* Vinyl Record */}
            <motion.div 
              animate={platterControls}
              className="w-[94%] h-[94%] rounded-full bg-[#080808] shadow-2xl flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing"
              style={{
                backgroundImage: `
                  repeating-radial-gradient(circle at center, #111 0px, #111 1px, #181818 2px, #111 3px),
                  radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)
                `
              }}
            >
              {/* Record Label */}
              <div className="w-1/3 h-1/3 rounded-full bg-blue-700 border-[6px] border-black flex items-center justify-center relative shadow-inner">
                <Disc className="w-1/2 h-1/2 text-white/90" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-white/20 rounded-full"></div>
              </div>
              
              {/* Grooves Reflection */}
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.05)_45deg,transparent_90deg,rgba(255,255,255,0.05)_135deg,transparent_180deg,rgba(255,255,255,0.05)_225deg,transparent_270deg,rgba(255,255,255,0.05)_315deg,transparent_360deg)] pointer-events-none"></div>
            </motion.div>
            
            {/* Tone Arm Assembly */}
            <div className="absolute top-[-20px] left-[-20px] w-1/2 h-full pointer-events-none z-30 scale-x-[-1]">
                {/* Pivot Base */}
                <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-[#2a2a2a] border-4 border-[#333] shadow-2xl flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#444]"></div>
                </div>
                {/* Arm Tube */}
                <motion.div 
                    animate={{ rotate: isPlaying ? 25 : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{ originX: "85%", originY: "15%" }}
                    className="absolute top-16 right-16 w-[200px] h-3 bg-gradient-to-b from-[#444] to-[#222] rounded-full shadow-lg"
                >
                    {/* Headshell */}
                    <div className="absolute left-0 top-[-4px] w-10 h-5 bg-[#111] rounded-sm border border-[#333] transform -rotate-[15deg]">
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-blue-600 rounded-full"></div>
                    </div>
                </motion.div>
            </div>
          </div>

          {/* Deck Controls */}
          <div className="mt-10 w-full flex items-end justify-between px-4">
            {/* Jog Dial Controls */}
            <div className="grid grid-cols-2 gap-3">
                <button className="w-12 h-12 rounded-lg bg-[#222] border-2 border-[#333] hover:border-white/20 transition-colors flex items-center justify-center shadow-xl active:translate-y-1">
                    <Settings className="w-5 h-5 text-white/40" />
                </button>
                <button className="w-12 h-12 rounded-lg bg-[#222] border-2 border-[#333] hover:border-white/20 transition-colors flex items-center justify-center shadow-xl active:translate-y-1">
                    <Info className="w-5 h-5 text-white/40" />
                </button>
            </div>

            {/* Start/Stop Button */}
            <button 
                onClick={togglePlay}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-4 transition-all duration-200 flex flex-col items-center justify-center gap-1 shadow-2xl active:translate-y-1 ${isPlaying ? 'bg-[#1a1a1a] border-blue-600 text-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-[#222] border-[#333] text-white/40 hover:border-white/20'}`}
            >
                <Power className="w-6 h-6" />
                <span className="text-[8px] font-black uppercase tracking-widest">Start/Stop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <div className="flex items-center gap-6 text-white/10 text-[11px] font-black uppercase tracking-[0.8em]">
            <span>RoozRadio</span>
            <div className="w-1.5 h-1.5 rounded-full bg-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            <span>Reference Console 1200</span>
        </div>
        <p className="text-white/5 text-[9px] uppercase tracking-[0.4em] font-medium">High-Fidelity Audio Engine • Low Latency Streaming</p>
      </div>

      <audio ref={audioRef} src={RADIO_CONFIG.streamUrl} />
    </div>
  );
};

export default DJConsole;
