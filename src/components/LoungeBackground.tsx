
import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Library } from 'lucide-react';

const LoungeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Wall with deep texture */}
      <div className="absolute inset-0 bg-lounge-beige bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10"></div>
      
      {/* Window with View */}
      <div className="absolute right-[10%] top-20 w-80 h-96 border-[12px] border-lounge-wood/10 shadow-2xl overflow-hidden hidden lg:block opacity-40">
          <img 
              src="https://picsum.photos/seed/night-city/800/1200?blur=4" 
              alt="Night City View" 
              className="w-full h-full object-cover brightness-50"
              referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
      </div>

      {/* Vinyl Library Shelf (Left Side) */}
      <div className="absolute left-0 bottom-0 w-[20%] h-full bg-lounge-wood/5 border-r border-lounge-wood/10 hidden xl:flex flex-col p-12 gap-10 overflow-hidden opacity-30">
          <div className="flex items-center gap-5 mb-8 border-b border-lounge-wood/10 pb-8">
              <Library className="w-7 h-7 text-lounge-wood/40" />
              <span className="text-[14px] font-black uppercase tracking-[0.6em] text-lounge-wood/40">The Archive</span>
          </div>
          {[1, 2, 3, 4, 5].map(shelf => (
              <div key={shelf} className="flex-1 border-b border-lounge-wood/5 flex items-end gap-[1.5px] pb-3">
                  {Array.from({ length: 40 }).map((_, i) => (
                      <div 
                          key={i} 
                          className="flex-1 h-[90%] rounded-sm"
                          style={{ 
                              backgroundColor: `hsl(${20 + Math.random() * 20}, 10%, ${20 + Math.random() * 30}%)`,
                              height: `${60 + Math.random() * 40}%`
                          }}
                      ></div>
                  ))}
              </div>
          ))}
      </div>

      {/* Vintage Floor Lamp */}
      <div className="absolute right-32 bottom-0 w-72 h-[90%] hidden xl:flex flex-col items-center justify-end opacity-20">
          <div className="w-56 h-40 bg-lounge-orange/10 rounded-t-[120px] border-t-4 border-x-4 border-lounge-orange/20 relative z-20 shadow-[0_-30px_70px_rgba(255,140,0,0.1)]"></div>
          <div className="w-2 h-full bg-lounge-wood/20"></div>
          <div className="w-40 h-8 bg-lounge-wood/30 rounded-t-xl"></div>
      </div>

      {/* Refined Plant */}
      <div className="absolute right-64 bottom-0 w-96 h-[70%] hidden xl:flex flex-col items-center justify-end opacity-20 z-10">
          <div className="w-40 h-48 bg-lounge-wood/10 rounded-t-[40px] border-x-4 border-lounge-wood/5"></div>
          <div className="relative w-full h-full flex items-center justify-center">
              <motion.div animate={{ rotate: [0, 1, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-56">
                  <Leaf className="w-80 h-80 text-lounge-olive/40 rotate-[20deg]" />
              </motion.div>
              <motion.div animate={{ rotate: [0, -1, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute -top-72">
                  <Leaf className="w-72 h-72 text-lounge-olive/30 -rotate-[15deg]" />
              </motion.div>
          </div>
      </div>

      {/* Warm Ambient Lighting */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-lounge-orange/5 blur-[250px] rounded-full"></div>
      <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-yellow-500/5 blur-[200px] rounded-full"></div>
    </div>
  );
};

export default LoungeBackground;
