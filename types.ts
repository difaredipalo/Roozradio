
export type WindowId = 'player' | 'about' | 'schedule' | 'settings' | 'spotify' | 'android';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export interface RadioConfig {
  streamUrl: string;
  stationName: string;
  description: string;
}
