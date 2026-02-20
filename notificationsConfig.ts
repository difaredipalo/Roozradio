
export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'music' | 'alert';
  isVisible: boolean; // Cambia questo per mostrare/nascondere la notifica
}

/**
 * GESTIONE NOTIFICHE ROOZOS
 * Modifica questo array per aggiungere o rimuovere messaggi.
 * Basta cambiare 'isVisible' a false per nascondere un messaggio senza cancellarlo.
 */
export const SYSTEM_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'welcome',
    title: 'Sistema Operativo Pronto',
    message: 'Benvenuto su RoozRadio OS v2.0. Goditi la migliore musica in streaming.',
    type: 'info',
    isVisible: true
  },
  {
    id: 'new-release',
    title: 'Nuova Uscita: Banda di Palo',
    message: 'È fuori il nuovo singolo! Clicca sull\'icona Spotify per ascoltarlo.',
    type: 'music',
    isVisible: true
  },
  {
    id: 'live-now',
    title: 'Live Now',
    message: 'Siamo in diretta con il Rooz Morning Show. Non mancare!',
    type: 'music',
    isVisible: false
  }
];
