
import React, { useState, useRef, useEffect } from 'react';
import { RADIO_CONFIG } from '../constants';

interface RadioPlayerProps {
  sizeLabel?: string;
  systemVolume?: number;
  setSystemVolume?: (val: number) => void;
  isMiniOverride?: boolean;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ 
  systemVolume = 0.8, 
  setSystemVolume
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 2000);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        showStatus('PAUSED');
      } else {
        audioRef.current.volume = systemVolume;
        audioRef.current.play().catch(e => console.error("Playback failed", e));
        showStatus('PLAYING');
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = systemVolume;
    }
  }, [systemVolume]);

  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(16).fill(0));

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setVisualizerData(prev => prev.map(() => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setVisualizerData(new Array(16).fill(0));
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black p-4 select-none">
      {/* PLAYER FRAME */}
      <div className="win-outset bg-[#c0c0c0] p-1 flex-1 flex flex-col">
        
        {/* LCD DISPLAY PANEL */}
        <div className="win-inset bg-black p-4 mb-4 relative overflow-hidden flex flex-col gap-3">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]" />
            
            <div className="flex justify-between items-start z-20">
                <div className="flex flex-col">
                    <span className="text-[10px] text-[#00ff00]/60 font-mono uppercase tracking-tighter">Station Info</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#00ff00] shadow-[0_0_8px_#00ff00]' : 'bg-[#004400]'}`} />
                      <span className="text-base font-bold text-[#00ff00] font-mono truncate max-w-[180px] drop-shadow-[0_0_2px_#00ff00]">
                        {RADIO_CONFIG.stationName}
                      </span>
                    </div>
                </div>
            </div>

            {/* Visualizer Area */}
            <div className="h-16 flex items-end gap-[2px] px-1 z-20 bg-[#001100]/50 win-inset">
                {visualizerData.map((val, i) => (
                    <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-[#00ff00] via-[#00cc00] to-[#008800] transition-all duration-150" 
                        style={{ height: `${val}%`, opacity: isPlaying ? 0.8 : 0.2 }} 
                    />
                ))}
            </div>

            <div className="flex justify-between items-center z-20">
                <div className="flex gap-3">
                    <span className={`text-[10px] font-mono uppercase ${isPlaying ? 'text-[#00ff00]' : 'text-[#004400]'}`}>
                      {statusMessage || (isPlaying ? 'STREAMING' : 'READY')}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#00ff00] font-mono uppercase">Stereo</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff00] shadow-[0_0_4px_#00ff00]" />
                </div>
            </div>
        </div>

        {/* CONTROLS PANEL */}
        <div className="flex flex-col gap-6 p-2">
            <div className="flex items-center justify-center gap-8">
                <div className="flex flex-col items-center gap-1">
                  <button 
                      onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                      className={`win-button w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-transform active:scale-95 ${isPlaying ? 'win-inset' : ''}`}
                  >
                      {isPlaying ? '⏸' : '▶'}
                  </button>
                  <span className="text-[10px] font-bold uppercase text-gray-700">Power</span>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold uppercase text-gray-600">Volume</span>
                    <span className="text-[11px] font-mono bg-black text-[#00ff00] px-2 py-0.5 win-inset min-w-[45px] text-center">
                      {Math.round(systemVolume * 100)}%
                    </span>
                  </div>
                  <div className="win-inset bg-[#808080] h-6 relative p-1">
                      <div 
                          className="absolute top-1 left-1 bottom-1 bg-gradient-to-r from-[#000080] to-[#0000ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" 
                          style={{ width: `calc(${systemVolume * 100}% - 8px)` }} 
                      />
                      <input 
                          type="range" min="0" max="1" step="0.01" value={systemVolume}
                          onChange={(e) => setSystemVolume?.(parseFloat(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                  </div>
                </div>
            </div>
        </div>

        <audio 
            ref={audioRef} 
            src={RADIO_CONFIG.streamUrl} 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* FOOTER INFO */}
      <div className="mt-4 flex justify-between items-center px-1">
        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">RoozRadio Media Engine v2.5</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 win-inset bg-[#000080]" />
          <div className="w-3 h-3 win-inset bg-[#808080]" />
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
