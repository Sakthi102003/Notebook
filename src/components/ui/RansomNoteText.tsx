import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RansomNoteTextProps {
  text: string;
  className?: string;
}

const CHAR_MAP = 'ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789@#$%&*+?';

const RansomNoteText: React.FC<RansomNoteTextProps> = ({ text, className = '' }) => {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [displayText, setDisplayText] = useState<string[]>([]);

  useEffect(() => {
    const initialSymbols = text.split('').map((char) =>
      char === ' ' ? ' ' : CHAR_MAP[Math.floor(Math.random() * CHAR_MAP.length)]
    );
    setDisplayText(initialSymbols);

    const timeout = setTimeout(() => {
      decrypt();
    }, 800);

    return () => clearTimeout(timeout);
  }, [text]);

  const decrypt = () => {
    const originalChars = text.split('');
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((_, i) => {
          if (i < iteration) return originalChars[i];
          if (originalChars[i] === ' ') return ' ';
          return CHAR_MAP[Math.floor(Math.random() * CHAR_MAP.length)];
        })
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsDecrypted(true);
      }

      iteration += 1 / 4; // Faster decryption for clean text
    }, 25);
  };

  return (
    <div
      className={`flex flex-nowrap items-center relative py-2 overflow-x-auto no-scrollbar whitespace-nowrap ${className}`}
      aria-label={text}
    >
      <div className="flex items-baseline">
        {displayText.map((char, index) => {
          const isActualChar = char === text[index];
          const isSpace = text[index] === ' ';

          if (isSpace) {
            return <span key={index} className="w-4 sm:w-6"></span>;
          }

          return (
            <motion.span
              key={index}
              className={`
                inline-block font-mono font-bold
                ${isActualChar
                  ? 'text-white'
                  : 'text-electric-blue drop-shadow-[0_0_8px_#00E5FF] opacity-80'
                }
                text-3xl sm:text-5xl md:text-7xl leading-none
                transition-colors duration-100
              `}
              animate={!isActualChar ? {
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1],
              } : {
                opacity: 1,
                scale: 1,
              }}
              transition={{ duration: 0.1, repeat: !isActualChar ? Infinity : 0 }}
            >
              {char}
            </motion.span>
          );
        })}
      </div>

      {/* Invisible status indicator for layout but helpful for aesthetic */}
      <div className="ml-6 flex items-center gap-2 opacity-30 select-none">
        <div className={`w-1 h-1 rounded-full ${isDecrypted ? 'bg-green-500' : 'bg-crimson animate-pulse'}`} />
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white">
          {isDecrypted ? 'ID_LOGGED' : 'AUTH_IN_PROGRESS'}
        </span>
      </div>
    </div>
  );
};

export default RansomNoteText;
