
import React, { useState, useCallback, useEffect } from 'react';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Window from './components/Window';
import RadioPlayer from './components/RadioPlayer';
import SpotifyWindow from './components/SpotifyWindow';
import NotificationCenter from './components/NotificationCenter';
import BootScreen from './components/BootScreen';
import { WindowId, WindowState } from './types';
import { WALLPAPERS, RADIO_CONFIG } from './constants';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [isShutdown, setIsShutdown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [systemVolume, setSystemVolume] = useState(0.8);
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    player: { id: 'player', title: 'RoozPlayer', isOpen: true, isMaximized: false, zIndex: 10, position: { x: window.innerWidth / 2 - 190, y: window.innerHeight / 2 - 260 } },
    spotify: { id: 'spotify', title: 'Spotify: Banda di Palo', isOpen: false, isMaximized: false, zIndex: 10, position: { x: 400, y: 150 } },
    android: { id: 'android', title: 'RoozRadio Mobile', isOpen: false, isMaximized: false, zIndex: 10, position: { x: 300, y: 60 } },
    about: { id: 'about', title: 'System Info', isOpen: false, isMaximized: false, zIndex: 10, position: { x: 200, y: 200 } },
    schedule: { id: 'schedule', title: 'Programmazione', isOpen: false, isMaximized: false, zIndex: 10, position: { x: 150, y: 150 } },
    settings: { id: 'settings', title: 'Impostazioni', isOpen: false, isMaximized: false, zIndex: 10, position: { x: 250, y: 250 } },
  });

  const [maxZIndex, setMaxZIndex] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setWallpaperIndex((prev) => (prev + 1) % WALLPAPERS.length);
    }, 60000);
    const clock = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
      clearInterval(clock);
    };
  }, []);

  const toggleWindow = useCallback((id: WindowId) => {
    setWindows(prev => {
      const isOpening = !prev[id].isOpen;
      const nextZ = isOpening ? maxZIndex + 1 : prev[id].zIndex;
      if (isOpening) setMaxZIndex(nextZ);
      
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: isOpening, zIndex: nextZ }
      };
    });
  }, [maxZIndex]);

  const focusWindow = useCallback((id: WindowId) => {
    setWindows(prev => {
      if (prev[id].zIndex === maxZIndex) return prev;
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      return {
        ...prev,
        [id]: { ...prev[id], zIndex: nextZ }
      };
    });
  }, [maxZIndex]);

  const updateWindowPosition = useCallback((id: WindowId, x: number, y: number) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], position: { x, y } }
    }));
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
  }, []);

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  // MODALITÀ SPEGNIMENTO / SCREENSAVER MINIMALISTA PC/TABLET
  if (isShutdown) {
    return (
      <div 
        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[99999] cursor-pointer animate-in fade-in duration-1000"
        onClick={() => setIsShutdown(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        
        <div className="z-10 flex flex-col items-center text-center space-y-12 w-full max-w-4xl px-12">
          {/* Time & Date Display */}
          <div className="space-y-4">
             <div className="text-[140px] font-thin text-white/80 tracking-tighter tabular-nums leading-none">
                {currentTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
             </div>
             <div className="text-lg font-light uppercase tracking-[0.5em] text-white/20">
                {currentTime.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
             </div>
          </div>

          {/* Integrated Minimal Player */}
          <div className="w-full max-w-lg transition-all hover:scale-[1.02] duration-500">
             <div className="bg-white/[0.03] os-blur border border-white/10 rounded-[40px] p-8 shadow-2xl">
                <RadioPlayer systemVolume={systemVolume} setSystemVolume={setSystemVolume} isMiniOverride />
             </div>
          </div>

          {/* Prompt */}
          <div className="pt-24 animate-pulse">
             <div className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10">
                Clicca per riattivare RoozOS
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
        className="h-screen w-screen overflow-hidden bg-cover bg-center transition-all duration-[2000ms] animate-in fade-in ease-in-out relative"
        style={{ backgroundImage: `url(${WALLPAPERS[wallpaperIndex]})` }}
    >
      <div 
        className="fixed inset-0 bg-black pointer-events-none z-[20000] transition-opacity duration-300" 
        style={{ opacity: 1 - brightness }}
      />

      <MenuBar 
        onOpenApp={toggleWindow} 
        brightness={brightness} 
        setBrightness={setBrightness}
        systemVolume={systemVolume}
        setSystemVolume={setSystemVolume}
        onShutdown={() => setIsShutdown(true)}
      />
      <NotificationCenter />
      <Dock onOpen={toggleWindow} windowStates={windows} />

      <div className="pl-14 pt-7 h-full w-full relative">
          <div className="absolute top-12 right-6 flex flex-col space-y-6">
              {[
                { id: 'player', label: 'Player', icon: '📻', bg: 'bg-white/10' },
                { id: 'spotify', label: 'Banda di Palo', icon: '🎵', bg: 'bg-[#1DB954]/40' },
                { id: 'android', label: 'Scarica Android', icon: '📱', bg: 'bg-green-500/20' }
              ].map(app => (
                <div 
                  key={app.id}
                  onDoubleClick={() => toggleWindow(app.id as WindowId)}
                  className="flex flex-col items-center w-20 group cursor-pointer"
                >
                  <div className={`${app.bg} os-blur w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl border border-white/20 group-hover:bg-white/30 transition-all`}>
                    <span className="text-2xl">{app.icon}</span>
                  </div>
                  <span className="text-white text-[10px] font-bold mt-2 drop-shadow-lg uppercase tracking-wider text-center leading-tight">{app.label}</span>
                </div>
              ))}
          </div>

          {(Object.values(windows) as WindowState[]).map((win) => (
            <Window 
              key={win.id} id={win.id} title={win.title} isOpen={win.isOpen} zIndex={win.zIndex} position={win.position}
              onClose={() => closeWindow(win.id)} onFocus={() => focusWindow(win.id)}
              onPositionChange={(x, y) => updateWindowPosition(win.id, x, y)}
            >
              {win.id === 'player' && <RadioPlayer systemVolume={systemVolume} setSystemVolume={setSystemVolume} />}
              {win.id === 'spotify' && <SpotifyWindow />}
              {win.id === 'android' && (
                <div className="w-full h-full bg-[#121212] flex flex-col items-center justify-center p-8 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full scale-150 animate-pulse"></div>
                    <div className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center shadow-2xl relative animate-bounce">
                        <svg className="w-14 h-14 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.341l.83 1.439c.074.129.031.291-.098.365-.129.074-.291.031-.365-.098l-.834-1.446C15.829 16.149 14.259 16.5 12.5 16.5c-1.759 0-3.329-.351-4.556-.899l-.834 1.446c-.074.129-.236.172-.365.098-.129-.074-.172-.236-.098-.365l.83-1.439C5.462 13.842 4 11.846 4 9.5c0-3.314 2.686-6 6-6V2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v1.5c3.314 0 6 2.686 6 6 0 2.346-1.462 4.342-3.477 5.841zM7 9a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z"/></svg>
                    </div>
                    <div className="space-y-4 relative text-white">
                        <h3 className="text-2xl font-black italic uppercase">In Sviluppo</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium">L'app Android di RoozRadio sta arrivando.</p>
                    </div>
                </div>
              )}
              {win.id === 'about' && (
                <div className="p-8 space-y-4 text-gray-800">
                    <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent uppercase italic">{RADIO_CONFIG.stationName}</h1>
                    <p className="leading-relaxed text-sm font-medium">{RADIO_CONFIG.description}</p>
                    <div className="pt-4 space-y-2 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Crediti</p>
                      <p className="text-xs italic">Rooz Radio dal 2014 ad oggi - Founder Rooz</p>
                    </div>
                </div>
              )}
            </Window>
          ))}
      </div>
    </div>
  );
};

export default App;
