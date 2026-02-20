
import React, { ReactNode, useState, useRef, useEffect, isValidElement, cloneElement } from 'react';
import { WindowId } from '../types';

interface WindowProps {
  id: WindowId;
  title: string;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
  onClose: () => void;
  onFocus: () => void;
  onPositionChange: (x: number, y: number) => void;
  children: ReactNode;
  width?: string;
  height?: string;
  className?: string;
}

const WINDOW_SIZES: Record<WindowId, { label: string; width: string; height: string }[]> = {
  player: [
    { label: 'Mini', width: '300px', height: '480px' },
    { label: 'Standard', width: '380px', height: '580px' },
    { label: 'Studio', width: '700px', height: '550px' },
  ],
  spotify: [
    { label: 'Mobile', width: '350px', height: '550px' },
    { label: 'Desktop', width: '500px', height: '550px' },
    { label: 'Cinema', width: '900px', height: '650px' },
  ],
  android: [
    { label: 'Mobile Preview', width: '320px', height: '550px' },
    { label: 'Standard', width: '450px', height: '400px' },
  ],
  about: [
    { label: 'Standard', width: '450px', height: '350px' },
    { label: 'Dettagli', width: '600px', height: '450px' },
  ],
  settings: [
    { label: 'Standard', width: '420px', height: '380px' },
    { label: 'Avanzate', width: '700px', height: '500px' },
  ],
  schedule: [
    { label: 'Compatto', width: '400px', height: '300px' },
    { label: 'Tabella', width: '800px', height: '600px' },
  ]
};

const Window: React.FC<WindowProps> = ({
  id,
  title,
  isOpen,
  zIndex,
  position,
  onClose,
  onFocus,
  onPositionChange,
  children,
  width: initialWidth = '500px',
  height: initialHeight = '400px',
  className = ''
}) => {
  const [currentSizeLabel, setCurrentSizeLabel] = useState('Standard');
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const presets = WINDOW_SIZES[id] || [{ label: 'Standard', width: initialWidth, height: initialHeight }];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onPositionChange(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onPositionChange]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeToSmallest = (e: React.MouseEvent) => {
    e.stopPropagation();
    const smallest = presets[0];
    setSize({ width: smallest.width, height: smallest.height });
    setCurrentSizeLabel(smallest.label);
  };

  const handleResizeToLargest = (e: React.MouseEvent) => {
    e.stopPropagation();
    const largest = presets[presets.length - 1];
    setSize({ width: largest.width, height: largest.height });
    setCurrentSizeLabel(largest.label);
  };

  if (!isOpen) return null;

  const childrenWithProps = React.Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<any>, { sizeLabel: currentSizeLabel });
    }
    return child;
  });

  return (
    <div
      onClick={onFocus}
      className={`absolute transition-all duration-75 ease-out rounded-xl overflow-hidden os-shadow bg-white/95 os-blur flex flex-col ${className} ${isDragging ? 'opacity-90 scale-[1.01] shadow-2xl' : ''}`}
      style={{
        zIndex,
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
        transition: isDragging ? 'none' : 'width 0.5s, height 0.5s, left 0.5s, top 0.5s'
      }}
    >
      {/* OS Header Bar */}
      <div 
        onMouseDown={handleDragStart}
        className="h-12 bg-gray-50/50 flex items-center justify-between px-4 border-b border-gray-200/50 shrink-0 cursor-move"
      >
        <div className="flex items-center space-x-2 w-24 pointer-events-none">
          {/* Pulsante Rosso: CHIUDI */}
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            title="Chiudi"
            className="w-3 h-3 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-sm pointer-events-auto group"
          >
            <svg className="w-1.5 h-1.5 text-white opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Pulsante Giallo: DIMENSIONE MINIMA */}
          <button 
            onClick={handleResizeToSmallest}
            title="Dimensione Minima"
            className="w-3 h-3 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors shadow-sm pointer-events-auto group"
          >
            <svg className="w-1.5 h-1.5 text-white opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Pulsante Verde: DIMENSIONE MASSIMA */}
          <button 
            onClick={handleResizeToLargest}
            title="Dimensione Massima"
            className="w-3 h-3 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-sm pointer-events-auto group"
          >
            <svg className="w-1.5 h-1.5 text-white opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 text-center pointer-events-none">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title} — {currentSizeLabel}</span>
        </div>

        <div className="w-24 flex justify-end relative" ref={menuRef}>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
              className={`p-1.5 rounded-lg transition-all ${isMenuOpen ? 'bg-blue-500 text-white' : 'hover:bg-black/5 text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-white/95 os-blur border border-gray-200 rounded-2xl shadow-2xl py-2 z-[100] animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-1.5 text-[9px] text-gray-400 font-black uppercase tracking-widest border-b border-gray-100 mb-1">Layout Finestra</div>
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSize({ width: p.width, height: p.height });
                      setCurrentSizeLabel(p.label);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[13px] transition-all flex items-center justify-between group ${
                      currentSizeLabel === p.label ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{p.label}</span>
                    {currentSizeLabel === p.label && <div className="w-2 h-2 rounded-full bg-blue-600 shadow-sm shadow-blue-200" />}
                  </button>
                ))}
                <div className="h-px bg-gray-100 my-1" />
                <button
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  className="w-full text-left px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 font-medium transition-colors"
                >
                  Chiudi Finestra
                </button>
              </div>
            )}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scroll relative text-gray-900 select-none">
        {childrenWithProps}
      </div>
    </div>
  );
};

export default Window;
