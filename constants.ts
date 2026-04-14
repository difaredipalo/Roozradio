
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
  '#008080', // Classic Teal
  'https://win98icons.alexmeub.com/wallpapers/clouds.png',
  'https://win98icons.alexmeub.com/wallpapers/plus.png',
  'https://win98icons.alexmeub.com/wallpapers/inside_your_computer.png',
  'https://win98icons.alexmeub.com/wallpapers/windows_98_logo.png'
];

export const SYSTEM_MENU_ITEMS = ['Applicazioni', 'Musica', 'Strumenti'];

export const BOOT_DELAY = 3000;
