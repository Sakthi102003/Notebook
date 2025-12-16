import React from 'react';
import { motion } from 'framer-motion';

interface RansomNoteTextProps {
  text: string;
  className?: string;
}

const fonts = [
  'font-sans',
  'font-serif',
  'font-mono',
  'font-notebook',
  'font-handwriting',
  'font-body',
  'font-ransom-hand',
  'font-ransom-marker',
  'font-ransom-typewriter',
  'font-ransom-comic',
  'font-ransom-display',
  'font-ransom-scifi',
  'font-ransom-serif',
  'font-ransom-shadow',
];

const bgColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-400',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-white',
  'bg-black',
  'bg-gray-800',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-lime-500',
  'bg-teal-500',
  'bg-rose-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-sky-500',
  'bg-fuchsia-500',
  'bg-slate-700',
];

const rotations = [
  '-rotate-2',
  '-rotate-1',
  'rotate-0',
  'rotate-1',
  'rotate-2',
];

const RansomNoteText: React.FC<RansomNoteTextProps> = ({ text, className = '' }) => {
  // Seeded random function to keep styles consistent for the same text
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const getRandomItem = (arr: string[], seed: number) => {
    return arr[Math.floor(pseudoRandom(seed) * arr.length)];
  };

  // Deterministically shuffle colors based on the text content
  const getShuffledArray = (arr: string[]) => {
    const seed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const shuffled = [...arr];
    // Fisher-Yates shuffle with seeded random
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(pseudoRandom(seed + i) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledBgColors = getShuffledArray(bgColors);
  const shuffledFonts = getShuffledArray(fonts);

  return (
    <div className={`flex flex-nowrap justify-center items-center gap-2 overflow-x-auto pb-4 scrollbar-hide ${className}`} aria-label={text}>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return <span key={index} className="w-6"></span>;
        }

        const seed = index * char.charCodeAt(0);
        
        // Use the shuffled arrays sequentially to avoid repeats
        // We skip spaces in the index calculation to keep the sequence tight
        const charIndex = text.substring(0, index).replace(/ /g, '').length;
        
        const font = shuffledFonts[charIndex % shuffledFonts.length];
        const bg = shuffledBgColors[charIndex % shuffledBgColors.length];
        
        const isLightBg = ['bg-white', 'bg-yellow-400', 'bg-lime-500', 'bg-amber-500', 'bg-cyan-500', 'bg-sky-500'].includes(bg);
        const color = isLightBg ? 'text-black' : 'text-white';
        
        const rotation = getRandomItem(rotations, seed + 2);
        
        return (
          <motion.span
            key={index}
            className={`
              inline-flex items-center justify-center
              w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
              ${font} 
              ${bg} 
              ${color} 
              ${rotation} 
              rounded-sm
              shadow-md
              no-underline
              text-3xl sm:text-4xl md:text-5xl font-bold uppercase
              hover:scale-110 hover:z-10 hover:-rotate-2 transition-transform duration-300
              cursor-default
            `}
            initial={{ opacity: 0, y: 50, rotate: Math.random() * 10 - 5 }}
            animate={{ opacity: 1, y: 0, rotate: parseInt(rotation.replace('rotate-', '')) || 0 }}
            transition={{ 
              delay: index * 0.05, 
              type: 'spring', 
              stiffness: 200,
              damping: 15
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};

export default RansomNoteText;
