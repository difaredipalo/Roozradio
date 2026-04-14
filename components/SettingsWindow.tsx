
import React from 'react';
import { WALLPAPERS } from '../constants';

interface SettingsWindowProps {
  brightness: number;
  setBrightness: (val: number) => void;
  systemVolume: number;
  setSystemVolume: (val: number) => void;
  wallpaperIndex: number;
  setWallpaperIndex: (val: number) => void;
  onClose?: () => void;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({
  brightness,
  setBrightness,
  systemVolume,
  setSystemVolume,
  wallpaperIndex,
  setWallpaperIndex,
  onClose
}) => {
  return (
    <div className="p-4 space-y-6 text-black bg-[#c0c0c0] h-full overflow-y-auto custom-scroll">
      <div className="space-y-1">
        <h2 className="text-lg font-bold">Proprietà - Schermo</h2>
        <div className="h-px bg-[#808080] shadow-[0_1px_0_white]" />
      </div>

      <div className="space-y-6">
        {/* Sliders */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold">Luminosità</label>
              <span className="text-[10px] tabular-nums">{Math.round(brightness * 100)}%</span>
            </div>
            <div className="win-inset bg-white h-4 relative">
                <div className="absolute top-0 left-0 h-full bg-[#000080]" style={{ width: `${brightness * 100}%` }} />
                <input 
                  type="range" min="0.1" max="1" step="0.01" value={brightness}
                  onChange={(e) => setBrightness(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold">Volume Sistema</label>
              <span className="text-[10px] tabular-nums">{Math.round(systemVolume * 100)}%</span>
            </div>
            <div className="win-inset bg-white h-4 relative">
                <div className="absolute top-0 left-0 h-full bg-[#000080]" style={{ width: `${systemVolume * 100}%` }} />
                <input 
                  type="range" min="0" max="1" step="0.01" value={systemVolume}
                  onChange={(e) => setSystemVolume(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="win-inset p-3 bg-[#c0c0c0] flex gap-3">
          <div className="text-2xl">ℹ️</div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold">Informazioni Sistema</p>
            <p className="text-[10px] leading-tight">
              RoozRadio OS v2.0.1. Copyright (C) 2026 RoozRadio Corp.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
            <button onClick={onClose} className="win-button px-4 py-1">OK</button>
            <button onClick={onClose} className="win-button px-4 py-1">Annulla</button>
            <button onClick={onClose} className="win-button px-4 py-1">Applica</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
