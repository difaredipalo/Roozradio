
import React from 'react';
import { motion } from 'motion/react';

const Navigation: React.FC = () => {
  const navItems = [
    { name: 'Radio Live', href: '#live' },
    { name: 'Programmi', href: '#programs' },
    { name: 'Podcast', href: '#podcasts' },
    { name: 'Chi siamo', href: '#about' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-lounge-wood rounded-full flex items-center justify-center text-lounge-beige font-serif font-bold text-xl">
          R
        </div>
        <span className="font-serif text-2xl font-bold tracking-tight text-lounge-wood">RoozRadio</span>
      </div>
      
      <div className="hidden md:flex items-center gap-12">
        {navItems.map((item) => (
          <a 
            key={item.name} 
            href={item.href}
            className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-lounge-wood/60 hover:text-lounge-wood transition-colors relative group"
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-lounge-wood transition-all group-hover:w-full" />
          </a>
        ))}
      </div>

      <button className="px-6 py-2 border border-lounge-wood/20 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-lounge-wood hover:text-lounge-beige transition-all">
        Sostienici
      </button>
    </motion.nav>
  );
};

export default Navigation;
