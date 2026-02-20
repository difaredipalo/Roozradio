
import React, { useState, useEffect, useRef } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { WindowId } from '../types';

interface MenuBarProps {
  onOpenApp?: (id: WindowId) => void;
  brightness: number;
  setBrightness: (val: number) => void;
  systemVolume: number;
  setSystemVolume: (val: number) => void;
  onShutdown: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ 
  onOpenApp, 
  brightness, 
  setBrightness, 
  systemVolume, 
  setSystemVolume,
  onShutdown
}) => {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setActiveSubMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const MenuItem = ({ label, children, menuId, isBold }: { label: string | React.ReactNode, children?: React.ReactNode, menuId: string, isBold?: boolean }) => (
    <div className="relative h-full flex items-center">
      <div 
        onClick={() => {
            setActiveMenu(activeMenu === menuId ? null : menuId);
            setActiveSubMenu(null);
        }}
        className={`hover:bg-white/10 px-2.5 h-full flex items-center cursor-pointer transition-colors ${isBold ? 'font-bold tracking-tight' : 'font-medium'} rounded ${activeMenu === menuId ? 'bg-white/20' : ''}`}
      >
        {label}
      </div>
      {activeMenu === menuId && children}
    </div>
  );

  return (
    <div ref={menuRef} className="fixed top-0 left-0 right-0 h-7 flex items-center justify-between px-2 bg-[#1d1d1d]/90 os-blur text-white text-[13px] z-[10001] border-b border-white/5 shadow-lg">
      <div className="flex items-center space-x-1 h-full">
        {/* RoozRadio System Menu */}
        <MenuItem label="RoozRadio" menuId="rooz-system" isBold>
          <div className="absolute top-full left-0 mt-0.5 w-60 bg-[#1d1d1db3] os-blur border border-white/10 rounded-lg shadow-2xl py-1.5 flex flex-col z-[10002]">
            <button 
              onClick={() => { onOpenApp?.('about'); setActiveMenu(null); }} 
              className="px-3 py-1.5 hover:bg-blue-600 text-left text-[13px]"
            >
              Chi Siamo
            </button>
            
            <div className="h-px bg-white/10 my-1 mx-2" />
            
            {/* Social Submenu */}
            <div 
              onMouseEnter={() => setActiveSubMenu('social')}
              className="px-3 py-1.5 hover:bg-blue-600 flex items-center justify-between cursor-pointer group"
            >
              <span className="text-[13px]">Social Media</span>
              <svg className="w-3 h-3 text-white/50 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              
              {activeSubMenu === 'social' && (
                <div 
                  className="absolute left-full top-0 ml-0.5 w-56 bg-[#1d1d1df2] os-blur border border-white/10 rounded-lg shadow-2xl py-1.5 flex flex-col"
                  onMouseLeave={() => setActiveSubMenu(null)}
                >
                  <div className="px-3 py-1 text-[10px] text-white/40 font-black uppercase tracking-widest">RoozRadio</div>
                  {SOCIAL_LINKS.roozRadio.map((link) => (
                    <a 
                      key={link.label} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-1.5 hover:bg-blue-600 flex items-center space-x-2 text-[13px]"
                    >
                      <span>{link.icon}</span><span>{link.label}</span>
                    </a>
                  ))}
                  <div className="h-px bg-white/10 my-1 mx-2" />
                  <div className="px-3 py-1 text-[10px] text-white/40 font-black uppercase tracking-widest">Banda di Palo</div>
                  {SOCIAL_LINKS.bandaDiPalo.map((link) => (
                    <a 
                      key={link.label} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-1.5 hover:bg-blue-600 flex items-center space-x-2 text-[13px]"
                    >
                      <span>{link.icon}</span><span>{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-white/10 my-1 mx-2" />
            
            <button 
              onClick={() => { onShutdown(); setActiveMenu(null); }} 
              className="px-3 py-1.5 hover:bg-red-600 text-left text-[13px] font-bold text-red-400 hover:text-white flex items-center justify-between"
            >
              <span>Spegni Sistema</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
            
            <div className="px-3 py-1.5 text-[12px] text-white/60">
              Versione 2.0.1
            </div>
          </div>
        </MenuItem>

        <MenuItem label="Applicazioni" menuId="apps">
          <div className="absolute top-full left-0 mt-0.5 w-56 bg-[#1d1d1db3] os-blur border border-white/10 rounded-lg shadow-2xl py-1.5 flex flex-col z-[10002]">
            <button onClick={() => { onOpenApp?.('player'); setActiveMenu(null); }} className="px-3 py-1.5 hover:bg-blue-600 text-left text-[13px] flex items-center space-x-2">
              <span className="w-4 h-4 bg-indigo-500 rounded flex items-center justify-center text-[10px]">📻</span>
              <span>RoozPlayer</span>
            </button>
            <button onClick={() => { onOpenApp?.('spotify'); setActiveMenu(null); }} className="px-3 py-1.5 hover:bg-blue-600 text-left text-[13px] flex items-center space-x-2">
              <span className="w-4 h-4 bg-[#1DB954] rounded flex items-center justify-center text-[10px]">🎵</span>
              <span>Banda di Palo</span>
            </button>
          </div>
        </MenuItem>
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2 text-white/90 font-bold tracking-tight pointer-events-none">
        {formatTime(time)}
      </div>

      <div className="flex items-center space-x-1 px-2 h-full">
        {/* Control Center */}
        <MenuItem 
          menuId="control-center" 
          label={<svg className="w-4 h-4 text-white/90" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" /></svg>}
        >
           <div className="absolute top-full right-0 mt-0.5 w-80 bg-[#1d1d1db3] os-blur border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col space-y-4 z-[10002]">
              <div className="flex flex-col space-y-4">
                 <div className="bg-white/5 rounded-2xl p-3 flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">Display</span>
                       <span className="text-[10px] font-mono text-white/40">{Math.round(brightness * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="1" step="0.01" value={brightness} 
                      onChange={(e) => setBrightness(parseFloat(e.target.value))} 
                      className="ios-slider" 
                    />
                 </div>
                 <div className="bg-white/5 rounded-2xl p-3 flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">Audio</span>
                       <span className="text-[10px] font-mono text-white/40">{Math.round(systemVolume * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.01" value={systemVolume} 
                      onChange={(e) => setSystemVolume(parseFloat(e.target.value))} 
                      className="ios-slider" 
                    />
                 </div>
              </div>
           </div>
        </MenuItem>

        {/* Quick Shutdown Button */}
        <div 
          onClick={onShutdown}
          title="Spegni Sistema"
          className="hover:bg-red-500 p-1.5 rounded cursor-pointer transition-colors text-white/70 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
