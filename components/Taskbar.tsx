
import React, { useState, useEffect, useRef } from 'react';
import { WindowId, WindowState } from '../types';

interface TaskbarProps {
  onOpenApp: (id: WindowId) => void;
  windowStates: Record<WindowId, WindowState>;
  onShutdown: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onOpenApp, windowStates, onShutdown }) => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openApp = (id: WindowId) => {
    onOpenApp(id);
    setIsStartOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-7 bg-[#c0c0c0] win-outset z-[5000] flex items-center px-0.5 gap-1 select-none">
      {/* Start Button */}
      <div className="relative" ref={startMenuRef}>
        <button 
          onClick={() => setIsStartOpen(!isStartOpen)}
          className={`win-button h-6 px-1 flex items-center gap-1 font-bold text-[12px] ${isStartOpen ? 'win-inset' : ''}`}
        >
          <span className="text-lg">🪟</span>
          <span>Start</span>
        </button>

        {isStartOpen && (
          <div className="absolute bottom-full left-0 mb-0.5 w-56 bg-[#c0c0c0] win-outset flex text-[12px]">
            {/* Left Sidebar (Classic Windows Sidebar) */}
            <div className="w-6 bg-[#808080] flex items-end justify-center pb-2">
              <span className="text-white font-bold origin-bottom -rotate-90 whitespace-nowrap text-lg opacity-50">
                Windows 97
              </span>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 py-1">
              <div onClick={() => openApp('player')} className="px-6 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 cursor-pointer">
                <span className="text-xl">📻</span> RoozPlayer
              </div>
              <div onClick={() => openApp('spotify')} className="px-6 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 cursor-pointer">
                <span className="text-xl">🎵</span> Banda di Palo
              </div>
              <div onClick={() => openApp('schedule')} className="px-6 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 cursor-pointer">
                <span className="text-xl">📅</span> Programmazione
              </div>
              <div onClick={() => openApp('settings')} className="px-6 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 cursor-pointer">
                <span className="text-xl">⚙️</span> Impostazioni
              </div>
              <div className="h-px bg-[#808080] my-1 mx-1 shadow-[0_1px_0_white]" />
              <div onClick={() => openApp('about')} className="px-6 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 cursor-pointer">
                <span className="text-xl">ℹ️</span> Informazioni
              </div>
              <div onClick={onShutdown} className="px-6 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 cursor-pointer">
                <span className="text-xl">🚪</span> Chiudi Sessione...
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-px h-5 bg-[#808080] mx-0.5 shadow-[1px_0_0_white]" />

      {/* Taskbar Items */}
      <div className="flex-1 flex gap-1 overflow-hidden">
        {(Object.values(windowStates) as WindowState[]).filter(w => w.isOpen).map(win => (
          <button 
            key={win.id}
            onClick={() => onOpenApp(win.id)}
            className={`win-button h-6 px-2 flex items-center gap-1 text-[11px] truncate max-w-[150px] ${win.zIndex > 10 ? 'win-inset font-bold bg-[#e0e0e0]' : ''}`}
          >
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      {/* Tray Area */}
      <div className="win-inset h-6 px-2 flex items-center gap-2 text-[11px] bg-[#c0c0c0]">
        <div className="flex gap-1">
          <span className="grayscale contrast-200">🔊</span>
        </div>
        <div className="font-bold tabular-nums bg-black text-[#00ff00] px-1.5 py-0.5 win-inset text-[10px] font-mono leading-none">
          {time.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
