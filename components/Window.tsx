
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
    { label: 'Compatto', width: '320px', height: '400px' },
    { label: 'Standard', width: '380px', height: '480px' },
    { label: 'Esteso', width: '450px', height: '550px' },
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
      className={`absolute transition-all duration-75 ease-out win-outset bg-[#c0c0c0] flex flex-col ${className}`}
      style={{
        zIndex,
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
        transition: isDragging ? 'none' : 'width 0.5s, height 0.5s, left 0.5s, top 0.5s'
      }}
    >
      {/* Windows 97 Title Bar */}
      <div 
        onMouseDown={handleDragStart}
        className="win-titlebar shrink-0 cursor-move select-none"
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="truncate">{title}</span>
        </div>
        
        <div className="flex items-center gap-[2px]">
          {/* Minimize (Resize to smallest) */}
          <button 
            onClick={handleResizeToSmallest}
            className="win-button w-4 h-4 p-0 font-bold text-[10px]"
            title="Minimizza"
          >
            _
          </button>
          
          {/* Maximize (Resize to largest) */}
          <button 
            onClick={handleResizeToLargest}
            className="win-button w-4 h-4 p-0 font-bold text-[10px]"
            title="Massimizza"
          >
            □
          </button>
          
          {/* Close */}
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="win-button w-4 h-4 p-0 font-bold text-[10px] ml-1"
            title="Chiudi"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar (Classic) */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-1 py-0.5 flex gap-3 text-[11px] select-none">
        <div className="hover:bg-[#000080] hover:text-white px-1 cursor-default">File</div>
        <div className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Modifica</div>
        <div 
          className="hover:bg-[#000080] hover:text-white px-1 cursor-default relative"
          onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
          ref={menuRef}
        >
          Visualizza
          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-0.5 w-32 bg-[#c0c0c0] win-outset py-1 z-[100] text-black">
              {presets.map((p) => (
                <div
                  key={p.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSize({ width: p.width, height: p.height });
                    setCurrentSizeLabel(p.label);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-0.5 hover:bg-[#000080] hover:text-white cursor-default flex items-center justify-between ${
                    currentSizeLabel === p.label ? 'font-bold' : ''
                  }`}
                >
                  {p.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="hover:bg-[#000080] hover:text-white px-1 cursor-default">?</div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scroll relative text-black select-none win-inset m-1 bg-white">
        {childrenWithProps}
      </div>
    </div>
  );
};

export default Window;
