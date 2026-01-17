import { motion, AnimatePresence } from 'framer-motion';
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

const LANGUAGES = [
  { text: "SAKTHI", label: "LATIN_CORE" },
  { text: "சக்தி", label: "TAMIL_NATIVE" },
  { text: "शक्ति", label: "DEVANAGARI_UNIT" },
  { text: "サクティ", label: "KATAKANA_MOD" },
  { text: "사크티", label: "HANGUL_NODE" },
  { text: "САКТИ", label: "CYRILLIC_REG" },
  { text: "ΣΑΚΤΙ", label: "GREEK_SYMB" },
  { text: "力量", label: "HANZI_VAL" },
  { text: "01010011", label: "BINARY_ID" },
  { text: "S.A.K.T.H.I", label: "SECURE_IDENT" }
];

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [langIndex, setLangIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    const triggerEvents = ['mousedown', 'keydown', 'touchstart'];
    triggerEvents.forEach(event => window.addEventListener(event, initAudio, { once: true }));

    const duration = 4000; // Increased duration for name showcase
    const interval = 30;
    const progressStep = (100 / (duration / interval));

    const loadingTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressStep + Math.random() * 2;
        if (next >= 100) {
          clearInterval(loadingTimer);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return next;
      });
    }, interval);

    // Cycle languages faster than logs
    const langTimer = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % LANGUAGES.length);
    }, 250);

    const logTimer = setInterval(() => {
      setActiveLogIndex((prev) => Math.min(prev + 1, SECURITY_LOGS.length - 1));
    }, duration / SECURITY_LOGS.length);

    return () => {
      clearInterval(loadingTimer);
      clearInterval(logTimer);
      clearInterval(langTimer);
      triggerEvents.forEach(event => window.removeEventListener(event, initAudio));
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 1, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden font-mono"
    >
      {/* Dynamic Cyber Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(0,229,255,0.1)_1px,transparent_1px),linear-gradient(rgba(0,229,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.05)_0%,transparent_70%)]" />

        {/* Horizontal Scanline */}
        <motion.div
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-electric-blue/40 shadow-[0_0_20px_#00E5FF] z-10"
        />

        {/* Floating Noise/Glitches */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center gap-16">
        {/* Name Cycle Section */}
        <div className="flex flex-col items-center justify-center min-h-[120px] relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={langIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(10px)", scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              exit={{
                opacity: 0,
                y: -10,
                filter: "blur(8px)",
                scale: 1.1,
                transition: { duration: 0.15 }
              }}
              className="flex flex-col items-center"
            >
              <span className="text-sm text-electric-blue/50 tracking-[0.5em] mb-4 uppercase">
                {LANGUAGES[langIndex].label}
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-[0.2em] relative">
                {LANGUAGES[langIndex].text}
                <motion.span
                  className="absolute -inset-1 bg-electric-blue/10 blur-xl block -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Glitch Overlay Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
            <div
              data-text={LANGUAGES[langIndex].text}
              className="animate-cyber-glitch text-crimson absolute inset-0 flex items-center justify-center text-7xl md:text-9xl font-black opacity-30 select-none"
            >
              {LANGUAGES[langIndex].text}
            </div>
            <div
              data-text={LANGUAGES[langIndex].text}
              className="animate-cyber-glitch text-electric-blue absolute inset-0 flex items-center justify-center text-7xl md:text-9xl font-black opacity-30 select-none [animation-delay:0.1s]"
            >
              {LANGUAGES[langIndex].text}
            </div>
          </div>
        </div>

        {/* Progress & Logs Section */}
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] text-electric-blue tracking-[0.3em] font-bold uppercase">System_Auth</span>
                <span className="text-[10px] text-white/40 tracking-[0.1em]">{SECURITY_LOGS[activeLogIndex]}</span>
              </div>
              <span className="text-3xl font-bold text-white tracking-tighter">
                {Math.floor(progress).toString().padStart(3, '0')}<span className="text-electric-blue/50 text-sm ml-1">%</span>
              </span>
            </div>
            <div className="h-[3px] bg-white/5 relative overflow-hidden flex gap-[2px]">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.1 }}
                  animate={{
                    opacity: progress > (i * 5) ? 1 : 0.1,
                    backgroundColor: progress > (i * 5) ? "#00E5FF" : "rgba(255,255,255,0.05)",
                    boxShadow: progress > (i * 5) ? "0 0 10px #00E5FF" : "none"
                  }}
                  className="flex-1 h-full"
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent" />
              <span className="text-[8px] text-white/30 uppercase tracking-widest block mb-2">Core_Status</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse shadow-[0_0_8px_#00E5FF]" />
                <span className="text-[10px] text-white font-bold opacity-80 uppercase tracking-tighter">Active_Node</span>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 relative overflow-hidden">
              <span className="text-[8px] text-white/30 uppercase tracking-widest block mb-2">Environment</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-electric-blue font-bold uppercase tracking-tighter">Production_V2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
        <div className="h-[1px] w-12 bg-electric-blue/50" />
        <span className="text-[8px] text-white uppercase tracking-[0.8em]">Sakthi_Archive_2026</span>
      </div>

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[10000] opacity-[0.03] contrast-150 brightness-150 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

