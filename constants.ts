
import { RadioConfig } from './types';

/**
 * PANNELLO DI CONTROLLO "NASCOSTO" (LATO CODICE)
 * Modifica qui l'URL dello streaming e le info della radio.
 * Questa configurazione è accessibile solo agli sviluppatori nel codice sorgente.
 */
export const RADIO_CONFIG: RadioConfig = {
  // NUOVO LINK STREAMING ZENO.FM
  streamUrl: 'https://stream.zeno.fm/ca67f1wzm0hvv', 
  stationName: 'RoozRadio',
  description: 'RoozRadio OS: Il tuo ecosistema musicale definitivo. Creatività, Suono e Intelligenza.',
};

/**
 * CONFIGURAZIONE SPOTIFY
 */
export const SPOTIFY_ARTIST_URL = "https://open.spotify.com/embed/artist/3V49j4SpqPOHckLfjYExDh?utm_source=generator&theme=0";

/**
 * LINK SOCIAL - GESTIBILI DA QUI
 */
export const SOCIAL_LINKS = {
  roozRadio: [
    { label: 'Instagram', url: 'https://www.instagram.com/roozradio/?hl=it', icon: '📸' },
    { label: 'Mail', url: 'mailto:mail@roozradio.it', icon: '✉️' },
    { label: 'Sito Web', url: 'https://www.roozradio.it', icon: '🌐' }
  ],
  bandaDiPalo: [
    { label: 'Instagram', url: 'https://www.instagram.com/bandadipalo/', icon: '📸' },
    { label: 'Spotify', url: 'https://open.spotify.com/artist/3V49j4SpqPOHckLfjYExDh', icon: '🎵' },
    { label: 'Mail', url: 'mailto:bdp@roozradio.it', icon: '✉️' }
  ]
};

/**
 * ESTETICA SISTEMA
 */
export const WALLPAPERS = [
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop'
];

export const SYSTEM_MENU_ITEMS = ['Applicazioni', 'Musica', 'Strumenti'];

export const BOOT_DELAY = 3000;
