import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const SECURITY_LOGS = [
  "INITIALIZING SECURE PROTOCOLS...",
  "ESTABLISHING ENCRYPTED TUNNEL...",
  "SCANNING FOR VULNERABILITIES...",
  "DECRYPTING SYSTEM ASSETS...",
  "VERIFYING INTEGRITY CHECKS...",
  "BYPASSING OBSOLETE FIREWALLS...",
  "MOUNTING PROTECTED VOLUMES...",
  "FINALIZING SECURE ENVIRONMENT...",
  "ACCESS GRANTED."
];

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [glitchText, setGlitchText] = useState("SECURE_AUTH");
  const audioContextRef = useRef<AudioContext | null>(null);

  // Sound Effect Logic
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    const playLogSound = () => {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state !== 'running') return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    };

    // Auto-init on first interaction (aggressive triggers for near-automatic play)
    const triggerEvents = ['mousedown', 'keydown', 'touchstart', 'mousemove', 'wheel'];

    const setupInteractions = () => {
      triggerEvents.forEach(event => {
        window.addEventListener(event, initAudio, { once: true });
      });
    };

    setupInteractions();

    if (activeLogIndex > 0) {
      playLogSound();
    }

    return () => {
      triggerEvents.forEach(event => {
        window.removeEventListener(event, initAudio);
      });
    };
  }, [activeLogIndex]);

  // Background Hum
  useEffect(() => {
    let humOsc: OscillatorNode | null = null;
    let humGain: GainNode | null = null;

    const startHum = () => {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state !== 'running') return;

      humOsc = ctx.createOscillator();
      humGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      humOsc.type = 'sawtooth';
      humOsc.frequency.setValueAtTime(55, ctx.currentTime);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, ctx.currentTime);
      humGain.gain.setValueAtTime(0, ctx.currentTime);
      humGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 1);

      humOsc.connect(filter);
      filter.connect(humGain);
      humGain.connect(ctx.destination);
      humOsc.start();
    };

    const humTimer = setTimeout(startHum, 500);

    return () => {
      clearTimeout(humTimer);
      if (humOsc) {
        humOsc.stop();
        humOsc.disconnect();
      }
    };
  }, []);

  // Simulate progress and log updates
  useEffect(() => {
    const duration = 3000; // 3 seconds total loading time
    const interval = 30;
    const increment = (100 / (duration / interval));

    const playSuccessSound = () => {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state !== 'running') return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    };

    const loadingTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(loadingTimer);
          playSuccessSound();
          setTimeout(onLoadingComplete, 800);
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
    };
  }, [onLoadingComplete]);

  // Glitch effect for the header
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";
    const glitchInterval = setInterval(() => {
      setGlitchText(prev =>
        prev.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
      );
      setTimeout(() => setGlitchText("SECURE_AUTH"), 100);
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden font-mono"
    >
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-100px)',
            animation: 'grid-move 20s linear infinite'
          }}
        />
        <motion.div
          animate={{ y: ['0%', '1000%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent opacity-50 shadow-[0_0_15px_#00f2ff]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center">
        {/* Central Hexagon Scanner */}
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 border-2 border-[#00f2ff]/30 rounded-full flex items-center justify-center relative"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-2 border-dashed border-[#00f2ff]/50 rounded-full"
            />
            <div className="absolute inset-4 bg-[#00f2ff]/5 rounded-full backdrop-blur-sm border border-[#00f2ff]/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-[#00f2ff] drop-shadow-[0_0_8px_#00f2ff]">
                {Math.floor(progress)}%
              </span>
            </div>
          </motion.div>

          {/* Animated Arcs */}
          <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none">
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="#00f2ff"
              strokeWidth="2"
              strokeDasharray="30 150"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="#00f2ff"
              strokeWidth="1"
              strokeDasharray="10 200"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        {/* Status Window */}
        <div className="w-full bg-black/80 border border-[#00f2ff]/30 p-6 rounded-sm backdrop-blur-md shadow-[0_0_20px_rgba(0,242,255,0.1)] relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f2ff]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f2ff]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f2ff]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f2ff]" />

          <div className="flex items-center justify-between mb-4 border-b border-[#00f2ff]/20 pb-2">
            <span className="text-[#00f2ff] text-xs font-bold tracking-widest uppercase">
              {glitchText}
            </span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
            </div>
          </div>

          <div className="h-24 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLogIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[#00f2ff] text-sm md:text-base mb-1 flex items-center gap-3"
              >
                <span className="opacity-50">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                <span className="flex-1">{SECURITY_LOGS[activeLogIndex]}</span>
              </motion.div>
            </AnimatePresence>

            <div className="text-[#00f2ff]/30 text-xs mt-2 font-mono">
              {SECURITY_LOGS.slice(0, activeLogIndex).map((log, i) => (
                <div key={i} className="opacity-30 line-through">
                  [{new Date().toLocaleTimeString([], { hour12: false })}] {log}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full h-1 bg-[#00f2ff]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 flex gap-8 text-[10px] text-[#00f2ff]/40 tracking-[0.2em] font-bold">
          <span>SECURE_BOOT_v2.4</span>
          <span>ENCRYPTION_AES256</span>
          <span>KERNEL_INIT_P7</span>
        </div>
      </div>

      <style>{`
        @keyframes grid-move {
          0% { transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-100px); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(0px) translateZ(-100px); }
        }
      `}</style>
    </motion.div>
  );
};

export default LoadingScreen;
