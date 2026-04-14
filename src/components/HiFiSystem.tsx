
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Disc, Radio } from 'lucide-react';
import { RADIO_CONFIG } from '../../constants';

interface HiFiSystemProps {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (v: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const HiFiSystem: React.FC<HiFiSystemProps> = ({ isPlaying, togglePlay, volume, setVolume, audioRef }) => {
  return (
    <div className="relative w-full max-w-5xl flex flex-col items-center gap-16 scale-90 md:scale-100">
      {/* Turntable */}
      <div className="relative group">
        <div className="w-[400px] md:w-[660px] aspect-[1.7/1] bg-[#241811] rounded-sm border-b-[28px] border-[#050403] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] p-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] opacity-90"></div>
          
          {/* The Platter */}
          <div className="absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[520px] aspect-square rounded-full bg-[#020202] border-[12px] border-[#080808] shadow-[inset_0_0_100px_rgba(0,0,0,1)] flex items-center justify-center">
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="w-[99%] h-[99%] rounded-full bg-[#010101] shadow-2xl flex items-center justify-center relative cursor-pointer group"
              onClick={togglePlay}
              style={{
                backgroundImage: `repeating-radial-gradient(circle at center, #050505 0px, #050505 1px, #0c0c0c 2px, #050505 3px)`
              }}
            >
              <div className="w-1/3 h-1/3 rounded-full bg-[#6b1111] border-[12px] border-black flex items-center justify-center relative shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.25)_45deg,transparent_90deg)] rounded-full"></div>
                <Disc className="w-1/2 h-1/2 text-white/5" />
                <div className="absolute top-3 text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">Stereo</div>
              </div>
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.06)_60deg,transparent_120deg,rgba(255,255,255,0.06)_240deg,transparent_300deg)] pointer-events-none"></div>
            </motion.div>
          </div>

          {/* Tonearm */}
          <div className="absolute top-20 right-20 w-36 h-36 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-[#0a0a0a] border-4 border-[#1a1a1a] shadow-2xl flex items-center justify-center relative z-30">
                  <div className="w-14 h-14 rounded-full bg-[#020202] border-2 border-[#2a2a2a]"></div>
              </div>
              <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isPlaying ? 34 : 0 }}
                  transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1], delay: isPlaying ? 0 : 0.4 }}
                  style={{ originX: "85%", originY: "15%" }}
                  className="absolute top-14 right-14 w-[240px] md:w-[360px] h-5 bg-gradient-to-b from-[#ccc] to-[#111] rounded-full shadow-2xl z-20 pointer-events-none"
              >
                  <div className="absolute right-[-25px] top-[-12px] w-20 h-20 rounded-full bg-[#111] border-2 border-[#2a2a2a] shadow-2xl"></div>
                  <div className="absolute left-0 top-[-12px] w-20 h-12 bg-[#020202] rounded-sm border border-[#1a1a1a] -rotate-[15deg] flex items-center justify-center">
                      <div className="w-[2.5px] h-8 bg-red-800/95 rounded-full shadow-[0_0_12px_rgba(153,27,27,0.8)]"></div>
                  </div>
              </motion.div>
          </div>

          <div className="absolute top-12 left-14 flex flex-col gap-2">
              <span className="text-[18px] font-black uppercase tracking-[1em] text-[#d4a373]/90">RoozRadio</span>
              <span className="text-[11px] uppercase tracking-[0.6em] text-[#d4a373]/60 font-black italic">Reference Series • 1974 Edition</span>
          </div>
        </div>
      </div>

      {/* Amplifier */}
      <div className="w-full max-w-4xl bg-[#0a0a0a] rounded-sm border-t-2 border-white/5 shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] p-16 flex flex-col gap-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-5 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-28 relative z-10">
          <div className="flex gap-12">
            {[1, 2].map(i => (
              <div key={i} className="w-56 h-36 bg-[#fffdf5] rounded-sm border-[6px] border-[#020202] relative overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.25)]">
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[12px] font-black text-black/60 uppercase tracking-[0.7em]">VU Level {i === 1 ? 'L' : 'R'}</div>
                <div className="absolute inset-x-10 top-10 h-20 border-b border-black/20 flex justify-between items-end px-1">
                  {Array.from({ length: 25 }).map((_, j) => (
                    <div key={j} className={`w-[1px] bg-black/25 ${j % 5 === 0 ? 'h-8' : 'h-3'}`}></div>
                  ))}
                </div>
                <motion.div 
                  animate={{ rotate: isPlaying ? (Math.random() * 50 - 25) : -45 }}
                  transition={{ duration: 0.08 }}
                  style={{ originX: "50%", originY: "100%" }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2.5px] h-32 bg-red-900 shadow-sm"
                ></motion.div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-12">
            <div className="relative group">
              <motion.div 
                style={{ rotate: (volume * 270) - 135 }}
                className="w-40 h-40 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#010101] border-[12px] border-[#080808] shadow-[0_50px_100px_rgba(0,0,0,1)] relative cursor-pointer active:scale-95 transition-transform"
              >
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-10 bg-[#d4a373] rounded-full shadow-[0_0_30px_rgba(212,163,115,0.9)]"></div>
                <div className="absolute inset-6 rounded-full border border-white/5"></div>
              </motion.div>
            </div>
            <span className="text-[14px] font-black uppercase tracking-[1.2em] text-[#d4a373]/70">Master Gain</span>
          </div>

          <div className="flex flex-col items-center gap-12">
            <button 
              onClick={togglePlay}
              className={`w-32 h-32 rounded-full border-[6px] flex items-center justify-center transition-all duration-700 ${isPlaying ? 'bg-[#d4a373] border-[#d4a373] text-[#1a120b] shadow-[0_0_80px_rgba(212,163,115,0.8)]' : 'bg-transparent border-[#d4a373]/20 text-[#d4a373]/30 hover:border-[#d4a373]/50'}`}
            >
              {isPlaying ? <Pause className="w-14 h-14 fill-current" /> : <Play className="w-14 h-14 fill-current ml-3" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiFiSystem;
