
import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const records = [
  { id: 1, title: 'Morning Jazz', artist: 'The Blue Note', cover: 'https://picsum.photos/seed/jazz/400/400' },
  { id: 2, title: 'Midnight Soul', artist: 'Sarah Jenkins', cover: 'https://picsum.photos/seed/soul/400/400' },
  { id: 3, title: 'Analog Dreams', artist: 'Synth Wave', cover: 'https://picsum.photos/seed/synth/400/400' },
  { id: 4, title: 'Coffee & Vinyl', artist: 'Lounge Collective', cover: 'https://picsum.photos/seed/lounge/400/400' },
  { id: 5, title: 'Retro Vibes', artist: 'The Classics', cover: 'https://picsum.photos/seed/retro/400/400' },
  { id: 6, title: 'Sunset Beats', artist: 'Chill Master', cover: 'https://picsum.photos/seed/chill/400/400' },
];

const RecordGrid: React.FC = () => {
  return (
    <section id="programs" className="py-32 px-8 md:px-24 bg-lounge-beige relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-serif text-6xl md:text-8xl font-bold text-lounge-wood mb-8 leading-tight"
            >
              La nostra <br /> <span className="italic text-lounge-olive">Collezione</span>
            </motion.h2>
            <p className="font-sans text-lg text-lounge-wood/60 leading-relaxed">
              Esplora i nostri programmi e podcast. Ogni disco racconta una storia, ogni traccia è un viaggio nel tempo tra le vibrazioni dell'analogico.
            </p>
          </div>
          <button className="font-sans text-sm font-bold uppercase tracking-widest border-b border-lounge-wood pb-2 hover:text-lounge-olive hover:border-lounge-olive transition-all">
            Vedi tutti i programmi
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20">
          {records.map((record, i) => (
            <motion.div 
              key={record.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square mb-6 overflow-hidden rounded-sm shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src={record.cover} 
                  alt={record.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-lounge-wood/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 bg-lounge-beige rounded-full flex items-center justify-center text-lounge-wood scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
                {/* Vinyl effect overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-lounge-wood mb-1 group-hover:text-lounge-olive transition-colors">{record.title}</h3>
              <p className="font-sans text-sm uppercase tracking-widest text-lounge-wood/40">{record.artist}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecordGrid;
