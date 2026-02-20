
import React, { useState, useRef, useEffect } from 'react';
import { RADIO_CONFIG } from '../constants';

interface RadioPlayerProps {
  sizeLabel?: string;
  systemVolume?: number;
  setSystemVolume?: (val: number) => void;
  isMiniOverride?: boolean;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ 
  sizeLabel = 'Standard', 
  systemVolume = 0.8, 
  setSystemVolume,
  isMiniOverride = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState<{ id: number; left: number; top: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gameInterval = useRef<number | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = systemVolume;
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = systemVolume;
    }
  }, [systemVolume]);

  useEffect(() => {
    if (sizeLabel === 'Studio' && isPlaying && !isMiniOverride) {
        gameInterval.current = window.setInterval(() => {
            setNotes(prev => [
                ...prev, 
                { id: Math.random(), left: Math.random() * 80 + 10, top: -20 }
            ]);
        }, 2000 / (systemVolume + 0.5));
    } else {
        if (gameInterval.current) clearInterval(gameInterval.current);
        setNotes([]);
    }
    return () => { if (gameInterval.current) clearInterval(gameInterval.current); };
  }, [sizeLabel, isPlaying, systemVolume, isMiniOverride]);

  useEffect(() => {
    const moveNotes = setInterval(() => {
        setNotes(prev => prev.map(n => ({ ...n, top: n.top + 2 })).filter(n => n.top < 100));
    }, 30);
    return () => clearInterval(moveNotes);
  }, []);

  const catchNote = (id: number) => {
    setScore(s => s + 10);
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const isStudio = sizeLabel === 'Studio' && !isMiniOverride;
  const isMini = isMiniOverride || sizeLabel === 'Mini';

  return (
    <div className={`flex h-full transition-all duration-700 ${isMiniOverride ? 'bg-transparent text-white' : 'bg-white text-gray-900'} ${isStudio ? 'flex-row' : 'flex-col'}`}>
      
      {/* LEFT / TOP SECTION: Main Player */}
      <div className={`flex flex-col items-center justify-center p-6 transition-all duration-700 ${isStudio ? 'w-1/2 border-r border-gray-100' : 'w-full flex-1'}`}>
        <div className={`${isMini ? 'w-20 h-20' : 'w-44 h-44'} rounded-2xl bg-indigo-600 shadow-2xl flex items-center justify-center mb-4 relative overflow-hidden group transition-all duration-500`}>
            <img 
                src="https://picsum.photos/seed/radio/400/400" 
                alt="Station Art" 
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`}
            />
            <div className={`absolute inset-0 ${isPlaying ? 'bg-indigo-900/20' : 'bg-black/40'} flex items-center justify-center transition-colors`}>
                {!isPlaying && (
                    <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="w-10 h-10 bg-white/20 os-blur rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                )}
            </div>
        </div>
        
        {!isMini && (
            <>
                <h2 className={`text-xl font-black tracking-tight ${isMiniOverride ? 'text-white' : 'text-gray-800'}`}>{RADIO_CONFIG.stationName}</h2>
                <div className="flex items-center space-x-2 mb-4">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isMiniOverride ? 'text-white/40' : 'text-gray-500'}`}>Live Stream</p>
                </div>
            </>
        )}

        <audio 
            ref={audioRef} 
            src={RADIO_CONFIG.streamUrl} 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
        />

        <div className="flex items-center space-x-6">
            <button 
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 shadow-xl ${isMiniOverride ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
            >
                {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
            </button>
        </div>

        {/* Solo mostrato se non siamo nello screensaver e non è Studio */}
        {!isStudio && !isMiniOverride && (
            <div className="mt-6 w-full px-4 flex flex-col space-y-2">
                <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                  <span>Volume Locale</span>
                  <span>{Math.round(systemVolume * 100)}%</span>
                </div>
                <input 
                    type="range" min="0" max="1" step="0.01" value={systemVolume}
                    onChange={(e) => setSystemVolume?.(parseFloat(e.target.value))}
                    className="flex-1 accent-indigo-600 h-1 bg-gray-100 rounded-lg cursor-pointer"
                />
            </div>
        )}
      </div>

      {isStudio && (
        <div className="flex-1 flex bg-gray-50/30 p-8 space-x-8 overflow-hidden relative">
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-inner relative overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white/50 os-blur z-10">
                    <span className="text-[10px] font-black uppercase text-gray-400">Rooz Beat Game</span>
                    <span className="text-blue-600 font-mono text-xs font-bold">PTS: {score}</span>
                </div>
                <div className="flex-1 relative">
                    {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Play per iniziare</span>
                        </div>
                    )}
                    {notes.map(note => (
                        <div 
                            key={note.id}
                            onClick={() => catchNote(note.id)}
                            className="absolute w-8 h-8 cursor-pointer transform -translate-x-1/2 flex items-center justify-center hover:scale-125 transition-transform"
                            style={{ left: `${note.left}%`, top: `${note.top}%` }}
                        >
                            <div className="p-1.5 bg-indigo-500 rounded-lg text-white shadow-lg animate-bounce">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-32 flex flex-col items-center">
                <span className="text-[9px] font-black uppercase text-gray-400 mb-4 tracking-tighter">Power Throttle</span>
                <div className="flex-1 w-12 bg-gray-200 rounded-full relative shadow-inner p-1 border border-gray-100">
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-full transition-all duration-300 shadow-lg" style={{ height: `${systemVolume * 100}%` }} />
                    <input type="range" min="0" max="1" step="0.01" value={systemVolume} onChange={(e) => setSystemVolume?.(parseFloat(e.target.value))} className="absolute inset-0 w-12 h-full opacity-0 cursor-ns-resize z-20" style={{ appearance: 'none', writingMode: 'bt-lr' } as any} />
                </div>
                <span className="mt-4 font-mono text-xs font-bold text-gray-800">{Math.round(systemVolume * 100)}%</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default RadioPlayer;
