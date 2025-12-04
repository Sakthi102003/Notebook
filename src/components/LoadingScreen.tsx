import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simple progress simulation
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 200);
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      <div className="w-full max-w-md px-8 relative">
        {/* Glitchy/Brutalist Text */}
        <h1 className="text-5xl md:text-7xl font-black font-notebook mb-8 text-black tracking-tighter uppercase">
          Loading...
        </h1>
        
        {/* Neo-Brutalist Progress Bar */}
        <div className="w-full h-12 border-4 border-black bg-white p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <motion.div 
            className="h-full bg-black"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 flex justify-between items-center font-bold font-handwriting text-xl">
          <span>INITIALIZING SYSTEM</span>
          <span>{Math.min(100, Math.floor(progress))}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
