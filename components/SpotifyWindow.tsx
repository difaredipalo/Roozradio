
import React from 'react';
import { SPOTIFY_ARTIST_URL } from '../constants';

const SpotifyWindow: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#121212] overflow-hidden">
      <iframe 
        style={{ borderRadius: '0px' }}
        src={SPOTIFY_ARTIST_URL}
        width="100%" 
        height="100%" 
        frameBorder="0" 
        allowFullScreen={true} 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyWindow;
