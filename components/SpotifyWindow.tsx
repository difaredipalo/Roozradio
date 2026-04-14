
import React from 'react';
import { SPOTIFY_ARTIST_URL } from '../constants';

const SpotifyWindow: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#c0c0c0] p-1 flex flex-col">
      <div className="win-inset flex-1 bg-black overflow-hidden">
        <iframe 
          src={SPOTIFY_ARTIST_URL}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allowFullScreen={true} 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default SpotifyWindow;
