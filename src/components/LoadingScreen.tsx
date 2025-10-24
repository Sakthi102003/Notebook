import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NameTranslation {
  text: string;
  language: string;
  script: string;
}

const nameTranslations: NameTranslation[] = [
  { text: 'Sakthi', language: 'English', script: 'English' },
  { text: 'சக்தி', language: 'Tamil', script: 'தமிழ்' },
  { text: 'सक्ति', language: 'Hindi', script: 'हिन्दी' },
  { text: 'ಸಕ್ತಿ', language: 'Kannada', script: 'ಕನ್ನಡ' },
  { text: 'శక్తి', language: 'Telugu', script: 'తెలుగు' },
  { text: 'ശക്തി', language: 'Malayalam', script: 'മലയാളം' },
  { text: 'શક્તિ', language: 'Gujarati', script: 'ગુજરાતી' },
  { text: 'ସକ୍ତି', language: 'Odia', script: 'ଓଡ଼ିଆ' },
  { text: 'শক্তি', language: 'Bengali', script: 'বাংলা' },
  { text: 'ਸ਼ਕਤੀ', language: 'Punjabi', script: 'ਪੰਜਾਬੀ' },
  { text: 'सक्ति', language: 'Marathi', script: 'मराठी' },
];

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cycle through name translations
    const nameInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % nameTranslations.length);
    }, 400); // Change name every 400ms

    // Auto-complete after showing all languages
    const timeout = setTimeout(() => {
      clearInterval(nameInterval);
      onLoadingComplete();
    }, 4000); // Complete after 4 seconds

    return () => {
      clearInterval(nameInterval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete]);

  const currentTranslation = nameTranslations[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fffef9 0%, #fff9e6 30%, #e3f2fd 70%, #daf5f0 100%)'
      }}
    >
      {/* Animated gradient orbs matching portfolio theme */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Animated particles with portfolio colors */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: '#3b82f6' }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-12 px-4 w-full max-w-7xl mx-auto">
        {/* Name display with smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-center w-full"
          >
            {/* Decorative top element */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#3b82f6' }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Name in Indian language with portfolio colors */}
            <motion.div
              className="relative inline-block px-4 py-8"
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))',
                  'drop-shadow(0 0 40px rgba(59, 130, 246, 0.6))',
                  'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-notebook leading-tight whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 50%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                  WebkitTextStroke: '1px rgba(59, 130, 246, 0.1)',
                  fontFamily: "'Kalam', 'Noto Sans', 'Noto Sans Tamil', 'Noto Sans Devanagari', 'Noto Sans Telugu', 'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Bengali', 'Noto Sans Gujarati', 'Noto Sans Gurmukhi', 'Noto Sans Oriya', cursive, sans-serif",
                }}
              >
                {currentTranslation.text}
              </h1>
              
              {/* Glowing underline with portfolio colors */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full mx-4"
                style={{
                  background: 'linear-gradient(to right, transparent, #3b82f6, transparent)'
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Simple animated dots indicator */}
        <motion.div 
          className="flex space-x-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#3b82f6' }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Enhanced corner decorations with portfolio colors */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-tl-[3rem]"
          style={{ 
            borderTop: '4px solid rgba(59, 130, 246, 0.3)',
            borderLeft: '4px solid rgba(59, 130, 246, 0.3)'
          }}
        />
        <div 
          className="absolute top-2 left-2 w-full h-full rounded-tl-[3rem]"
          style={{ 
            borderTop: '2px solid rgba(14, 165, 233, 0.2)',
            borderLeft: '2px solid rgba(14, 165, 233, 0.2)'
          }}
        />
      </motion.div>
      
      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        <div 
          className="absolute bottom-0 right-0 w-full h-full rounded-br-[3rem]"
          style={{ 
            borderBottom: '4px solid rgba(6, 182, 212, 0.3)',
            borderRight: '4px solid rgba(6, 182, 212, 0.3)'
          }}
        />
        <div 
          className="absolute bottom-2 right-2 w-full h-full rounded-br-[3rem]"
          style={{ 
            borderBottom: '2px solid rgba(14, 165, 233, 0.2)',
            borderRight: '2px solid rgba(14, 165, 233, 0.2)'
          }}
        />
      </motion.div>

      {/* Additional decorative elements with portfolio theme */}
      <motion.div
        className="absolute top-1/4 right-12 w-20 h-20 rounded-full"
        style={{ border: '2px solid rgba(59, 130, 246, 0.2)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-12 w-16 h-16 rounded-full"
        style={{ border: '2px solid rgba(6, 182, 212, 0.2)' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
