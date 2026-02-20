
import React from 'react';
import { WindowId } from '../types';

interface DockItemProps {
    id: WindowId;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    isOpen: boolean;
    isFocused?: boolean;
}

const DockItem: React.FC<DockItemProps> = ({ icon, label, onClick, isOpen, isFocused }) => (
    <div 
        onClick={onClick}
        className="group relative flex items-center w-full px-2 py-1.5 cursor-pointer"
    >
        {isOpen && (
            <div className={`absolute left-0 w-1 rounded-r-full ${isFocused ? 'h-7 bg-blue-400' : 'h-2 bg-white/40'} transition-all duration-300`} />
        )}
        <div className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 ${isFocused ? 'bg-white/15 scale-110' : 'hover:bg-white/10'} text-white shadow-lg`}>
            {icon}
        </div>
        <div className="absolute left-16 bg-black/90 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl translate-x-2 group-hover:translate-x-0">
            {label}
        </div>
    </div>
);

interface DockProps {
    onOpen: (id: WindowId) => void;
    windowStates: Record<WindowId, { isOpen: boolean; zIndex: number }>;
}

const Dock: React.FC<DockProps> = ({ onOpen, windowStates }) => {
    const sortedWindows = (Object.entries(windowStates) as [WindowId, { isOpen: boolean; zIndex: number }][])
        .filter(([_, state]) => state.isOpen)
        .sort((a, b) => b[1].zIndex - a[1].zIndex);
    const topWindowId = sortedWindows.length > 0 ? sortedWindows[0][0] : null;

    return (
        <div className="fixed left-0 top-7 bottom-0 w-16 flex flex-col items-center py-4 bg-black/30 os-blur border-r border-white/5 z-[9999]">
            <div className="mb-6 opacity-80">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7.5h2V12.5z" />
                </svg>
            </div>

            <DockItem 
                id="player" 
                label="Radio Player" 
                isOpen={windowStates.player.isOpen}
                isFocused={topWindowId === 'player'}
                onClick={() => onOpen('player')}
                icon={
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-2 rounded-xl">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                    </div>
                } 
            />
            <DockItem 
                id="spotify" 
                label="Banda di Palo" 
                isOpen={windowStates.spotify?.isOpen}
                isFocused={topWindowId === 'spotify'}
                onClick={() => onOpen('spotify')}
                icon={
                    <div className="bg-[#1DB954] p-2 rounded-xl">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.533 17.3c-.22.36-.684.472-1.044.252-2.884-1.764-6.516-2.164-10.796-1.184-.412.096-.82-.16-.916-.572s.16-.82.572-.916c4.684-1.072 8.708-.604 11.932 1.372.36.22.472.684.252 1.044zm1.48-3.26c-.276.448-.868.592-1.316.316-3.3-2.028-8.328-2.616-12.232-1.428-.504.152-1.036-.14-1.188-.644s.14-1.036.644-1.188c4.464-1.352 10-0.7 13.772 1.62.448.276.592.868.316 1.316zm.128-3.396c-3.952-2.348-10.468-2.564-14.248-1.416-.608.184-1.248-.16-1.432-.768s.16-1.248.768-1.432c4.356-1.324 11.536-1.064 16.088 1.636.548.324.728 1.036.404 1.584s-1.032.728-1.58.404z" />
                        </svg>
                    </div>
                } 
            />
            <DockItem 
                id="android" 
                label="Android App" 
                isOpen={windowStates.android?.isOpen}
                isFocused={topWindowId === 'android'}
                onClick={() => onOpen('android')}
                icon={
                    <div className="bg-green-600/40 p-2 rounded-xl border border-green-500/20">
                        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.523 15.341l.83 1.439c.074.129.031.291-.098.365-.129.074-.291.031-.365-.098l-.834-1.446C15.829 16.149 14.259 16.5 12.5 16.5c-1.759 0-3.329-.351-4.556-.899l-.834 1.446c-.074.129-.236.172-.365.098-.129-.074-.172-.236-.098-.365l.83-1.439C5.462 13.842 4 11.846 4 9.5c0-3.314 2.686-6 6-6V2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v1.5c3.314 0 6 2.686 6 6 0 2.346-1.462 4.342-3.477 5.841zM7 9a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z"/>
                        </svg>
                    </div>
                } 
            />
            
            <div className="mt-auto space-y-3">
                <DockItem 
                    id="settings" 
                    label="Settings" 
                    isOpen={windowStates.settings.isOpen}
                    isFocused={topWindowId === 'settings'}
                    onClick={() => onOpen('settings')}
                    icon={
                        <div className="bg-white/10 p-2 rounded-xl border border-white/5">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            </svg>
                        </div>
                    } 
                />
            </div>
        </div>
    );
};

export default Dock;
