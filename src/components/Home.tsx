
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import Navigation from './Navigation';
import HiFiSystem from './HiFiSystem';
import RecordGrid from './RecordGrid';
import LoungeBackground from './LoungeBackground';
import FloatingPlayer from './FloatingPlayer';
import { Radio, ArrowDown } from 'lucide-react';
import { RADIO_CONFIG } from '../../constants';

const Home: React.FC = () => {
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
    <div className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="live" className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <LoungeBackground />
        
        <div className="relative z-10 flex flex-col items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex items-center gap-3 px-4 py-1 bg-lounge-orange/10 border border-lounge-orange/20 rounded-full">
              <div className="w-2 h-2 bg-lounge-orange rounded-full animate-pulse" />
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-lounge-orange">On Air Now</span>
            </div>
            <h1 className="font-serif text-7xl md:text-9xl font-bold text-lounge-wood tracking-tighter">
              Vibrazioni <br /> <span className="italic text-lounge-olive">Analogiche</span>
            </h1>
          </motion.div>

          <HiFiSystem 
            isPlaying={isPlaying} 
            togglePlay={togglePlay} 
            volume={volume} 
            setVolume={setVolume} 
            audioRef={audioRef}
          />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer group"
            onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-lounge-wood/40 group-hover:text-lounge-wood transition-colors">Scorri per esplorare</span>
            <ArrowDown className="w-5 h-5 text-lounge-wood/20 group-hover:text-lounge-wood transition-colors animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <RecordGrid />

      {/* About Section */}
      <section id="about" className="py-32 px-8 md:px-24 bg-lounge-wood text-lounge-beige relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/studio/800/1000" 
              alt="Studio" 
              className="w-full h-full object-cover grayscale opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-lounge-wood/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border border-lounge-beige/20 rounded-full flex items-center justify-center">
                <Radio className="w-12 h-12 text-lounge-beige/40" />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-serif text-6xl md:text-8xl font-bold mb-12 leading-tight">
              Il nostro <br /> <span className="italic text-lounge-olive">Spazio</span>
            </h2>
            <p className="font-sans text-xl text-lounge-beige/60 leading-relaxed mb-12">
              RoozRadio nasce dalla passione per il suono puro. Siamo una webradio indipendente che celebra la cultura del vinile e la musica che ha un'anima. Il nostro studio è un salotto aperto a tutti coloro che cercano un'esperienza d'ascolto intima e autentica.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6 pb-6 border-b border-lounge-beige/10">
                <span className="font-serif text-4xl italic text-lounge-olive">01</span>
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-1">Qualità Analogica</h4>
                  <p className="font-sans text-sm text-lounge-beige/40">Ogni brano è selezionato con cura dai nostri archivi.</p>
                </div>
              </div>
              <div className="flex items-center gap-6 pb-6 border-b border-lounge-beige/10">
                <span className="font-serif text-4xl italic text-lounge-olive">02</span>
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-1">Comunità Indipendente</h4>
                  <p className="font-sans text-sm text-lounge-beige/40">Sosteniamo artisti emergenti e label indipendenti.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 md:px-24 bg-lounge-beige border-t border-lounge-wood/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lounge-wood rounded-full flex items-center justify-center text-lounge-beige font-serif font-bold text-sm">
              R
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-lounge-wood">RoozRadio</span>
          </div>
          
          <div className="flex gap-12">
            <a href="#" className="font-sans text-xs font-bold uppercase tracking-widest text-lounge-wood/40 hover:text-lounge-wood transition-colors">Instagram</a>
            <a href="#" className="font-sans text-xs font-bold uppercase tracking-widest text-lounge-wood/40 hover:text-lounge-wood transition-colors">Spotify</a>
            <a href="#" className="font-sans text-xs font-bold uppercase tracking-widest text-lounge-wood/40 hover:text-lounge-wood transition-colors">Mixcloud</a>
          </div>
          
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-lounge-wood/20">
            © 2026 RoozRadio. All rights reserved. Analog Fidelity.
          </p>
        </div>
      </footer>

      <FloatingPlayer 
        isPlaying={isPlaying} 
        togglePlay={togglePlay} 
        volume={volume} 
        setVolume={setVolume} 
      />

      <audio ref={audioRef} src={RADIO_CONFIG.streamUrl} />
    </div>
  );
};

export default Home;
