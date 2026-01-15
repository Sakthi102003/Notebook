import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const SECURITY_LOGS = [
  "INITIALIZING_STEALTH_CORE...",
  "ESTABLISHING_ENCRYPTED_TUNNEL...",
  "SCANNING_FOR_VULNERABILITIES...",
  "DECRYPTING_SYSTEM_ASSETS...",
  "VERIFYING_INTEGRITY_CHECKS...",
  "BYPASSING_FIREWALLS...",
  "MOUNTING_PROTECTED_VOLUMES...",
  "FINALIZING_ENVIRONMENT...",
  "ACCESS_GRANTED."
];

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    const triggerEvents = ['mousedown', 'keydown', 'touchstart'];
    triggerEvents.forEach(event => window.addEventListener(event, initAudio, { once: true }));

    const duration = 2500;
    const interval = 30;
    const increment = (100 / (duration / interval));

    const loadingTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 3;
        if (next >= 100) {
          clearInterval(loadingTimer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    const logTimer = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % SECURITY_LOGS.length);
    }, duration / SECURITY_LOGS.length);

    return () => {
      clearInterval(loadingTimer);
      clearInterval(logTimer);
      triggerEvents.forEach(event => window.removeEventListener(event, initAudio));
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-stealth-900 overflow-hidden font-mono"
    >
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#00E5FF_1px,_transparent_1px)] [background-size:40px_40px]" />
        <motion.div
          animate={{ top: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-electric-blue/30 shadow-[0_0_15px_#00E5FF] z-10"
        />
      </div>

      <div className="relative z-10 w-full max-w-lg px-8">
        <div className="flex flex-col gap-12">
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[10px] text-electric-blue tracking-[0.5em] uppercase font-bold">Booting_Sequence</span>
              <span className="text-2xl font-bold text-white">{Math.floor(progress)}%</span>
            </div>
            <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-electric-blue shadow-[0_0_10px_#00E5FF]"
              />
            </div>
          </div>

          <div className="bg-stealth-800/40 border border-white/5 p-6 h-48 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-electric-blue" />
            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-electric-blue" />
            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-electric-blue" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-electric-blue" />

            <div className="flex-1 space-y-2">
              {SECURITY_LOGS.slice(0, activeLogIndex + 1).map((log, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`text-[10px] flex gap-3 ${i === activeLogIndex ? 'text-electric-blue' : 'text-gray-600'}`}
                >
                  <span className="opacity-30">[{new Date().toLocaleTimeString([], { hour12: false, second: '2-digit' })}]</span>
                  <span className="uppercase tracking-widest">{log}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-[8px] text-white/20 font-bold uppercase tracking-[0.4em]">
            <span>SakthiLabs_Kernel_v2.0</span>
            <span>Secure_Authorized_Only</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
