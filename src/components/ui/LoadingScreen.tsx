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

    // Cycle languages slightly slower to match animation durations
    const langTimer = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % LANGUAGES.length);
    }, 400);

    const logTimer = setInterval(() => {
      setActiveLogIndex((prev) => Math.min(prev + 1, SECURITY_LOGS.length - 1));
    }, duration / SECURITY_LOGS.length);

    document.body.classList.add('loading-active');

    return () => {
      document.body.classList.remove('loading-active');
      clearInterval(loadingTimer);
      clearInterval(logTimer);
      clearInterval(langTimer);
      triggerEvents.forEach(event => window.removeEventListener(event, initAudio));
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden font-mono"
    >
      {/* Dynamic Cyber Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(0,229,255,0.1)_1px,transparent_1px),linear-gradient(rgba(0,229,255,0.1)_1px,transparent_1px)] bg-[size:25px_25px]" />

        {/* Floating Background Data Fragments */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.05]">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "110%", x: `${Math.random() * 100}%` }}
              animate={{ y: "-10%" }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute text-[8px] font-mono text-electric-blue whitespace-nowrap"
            >
              {Math.random().toString(16).toUpperCase().slice(2, 10)} 0x{i}F{i}A
            </motion.div>
          ))}
        </div>

        {/* Horizontal Scanline */}
        <motion.div
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-electric-blue/40 shadow-[0_0_20px_#00E5FF] z-10"
        />

        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center gap-16">
        {/* Name Cycle Section with Frame */}
        <div className="flex flex-col items-center justify-center min-h-[160px] relative w-full group">
          {/* Animated Corner Brackets */}
          <div className="absolute -inset-10 pointer-events-none">
            {/* Top Left */}
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-electric-blue/30"
            />
            {/* Top Right */}
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-electric-blue/30"
            />
            {/* Bottom Left */}
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-electric-blue/30"
            />
            {/* Bottom Right */}
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-electric-blue/30"
            />
          </div>

          {/* Rotating Scan Ring (Behind name) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 border border-dashed border-electric-blue/10 rounded-full -z-10"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={langIndex}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.1, ease: "easeOut" }
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.1 }
              }}
              className="flex flex-col items-center relative"
            >
              <div className="relative">
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-[0.2em] relative z-10">
                  {LANGUAGES[langIndex].text}
                </h1>

                {/* Integrated Glitch Overlay (Monochromatic for clean 2D look) */}
                <div className="absolute inset-0 pointer-events-none opacity-20 overflow-visible">
                  <div
                    data-text={LANGUAGES[langIndex].text}
                    className="animate-cyber-glitch text-white absolute inset-0 flex items-center justify-center text-6xl md:text-8xl font-black select-none"
                  >
                    {LANGUAGES[langIndex].text}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
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

