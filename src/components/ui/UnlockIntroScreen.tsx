import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const IDLE_SECONDS = 12;
const HANDLE_SIZE = 58;
const HANDLE_HALF = HANDLE_SIZE / 2;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

interface UnlockIntroScreenProps {
  onUnlock: () => void;
}

const UnlockIntroScreen = ({ onUnlock }: UnlockIntroScreenProps) => {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragProgress, setDragProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [countdown, setCountdown] = useState(IDLE_SECONDS);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Clock format
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const completeUnlock = useCallback(() => {
    if (isUnlocked) {
      return;
    }

    setIsUnlocked(true);
    setDragProgress(100);

    window.setTimeout(() => {
      onUnlock();
    }, reduceMotion ? 0 : 450);
  }, [isUnlocked, onUnlock, reduceMotion]);

  useEffect(() => {
    if (isDragging || isUnlocked) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId);
          completeUnlock();
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [completeUnlock, isDragging, isUnlocked]);

  const handlePosition = trackRef.current
    ? clamp((dragProgress / 100) * (trackRef.current.clientWidth - HANDLE_SIZE), 0, trackRef.current.clientWidth - HANDLE_SIZE)
    : 0;

  const updateDragProgressFromPointer = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const xInsideTrack = clamp(clientX - rect.left - HANDLE_HALF, 0, rect.width - HANDLE_SIZE);
    const nextProgress = clamp((xInsideTrack / (rect.width - HANDLE_SIZE)) * 100, 0, 100);

    setDragProgress(nextProgress);

    if (nextProgress >= 70) {
      completeUnlock();
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragging(true);
    setCountdown(IDLE_SECONDS);
    updateDragProgressFromPointer(event.clientX);
    trackRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDragging) {
      return;
    }

    updateDragProgressFromPointer(event.clientX);
  };

  const handlePointerRelease = () => {
    setIsDragging(false);
    setCountdown(IDLE_SECONDS);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      completeUnlock();
    }
  };

  return (
    <motion.div
      key="unlock-intro"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)', transition: { duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden px-4 select-none"
      style={{
        backgroundColor: '#050507',
        color: '#FFFFFF',
      }}
      aria-label="Portrait intro screen"
    >
      {/* Premium Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-emerald-500/10 blur-[130px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-[#E2A33D]/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.2)_2px,rgba(0,0,0,0.2)_4px)] opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[430px] flex flex-col items-center gap-6" style={{ color: '#FFFFFF' }}>
        
        {/* System Time Header */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: '#34d399' }}>
            <Lock size={12} className="animate-pulse" style={{ color: '#34d399' }} />
            <span style={{ color: '#34d399' }}>Encrypted Portfolio Access</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extralight tracking-tight font-mono" style={{ color: '#FFFFFF' }}>
            {currentTime || '12:00'}
          </h2>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em]" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
            {currentDate || 'PORTFOLIO ACCESS'}
          </p>
        </div>

        {/* Main Card Container */}
        <div className="w-full relative group">
          {/* Card Outer Glow Border */}
          <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-b from-white/20 via-emerald-500/20 to-[#E2A33D]/30 opacity-70 blur-[1px] transition-all group-hover:opacity-100" />

          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0d12]/90 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            <div className="relative aspect-[0.8] w-full overflow-hidden">
              <img
                src="/images/profile.jpg"
                alt="Sakthi Murugan portrait"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-black/20" />

              {/* Top Security Status Tag */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-mono uppercase tracking-widest backdrop-blur-md" style={{ color: '#FFFFFF' }}>
                <Sparkles size={11} style={{ color: '#E2A33D' }} />
                <span style={{ color: '#FFFFFF' }}>Sakthimurugan S</span>
              </div>

              {/* Bottom Profile Badge */}
              <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-5 sm:bottom-5">
                <div className="flex items-center gap-3 rounded-[22px] border border-white/15 bg-black/60 p-3 shadow-[0_16px_36px_rgba(0,0,0,0.5)] backdrop-blur-xl" style={{ color: '#FFFFFF' }}>
                  <div className="relative">
                    <img
                      src="/images/blue avatar.png"
                      alt="Sakthi Murugan avatar"
                      className="h-11 w-11 rounded-full border border-white/20 object-cover shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-bold tracking-tight" style={{ color: '#FFFFFF' }}>
                      Sakthimurugan S.
                    </div>
                    <div className="truncate text-[11px] font-mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      @sakthimurugans._
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(52,211,153,0.25)]"
                    style={{ color: '#34d399' }}
                  >
                    <ShieldCheck size={11} style={{ color: '#34d399' }} />
                    <span style={{ color: '#34d399' }}>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Control Section */}
        <div className="w-full space-y-3">
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerRelease}
            onPointerLeave={handlePointerRelease}
            onPointerCancel={handlePointerRelease}
            className="relative h-[68px] w-full touch-none overflow-hidden rounded-full border border-white/15 bg-black/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            {/* Progress Fill Gradient */}
            <motion.div
              animate={{ width: `${dragProgress}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.12, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-600/50 via-[#90661b]/60 to-[#E2A33D]"
            />

            {/* Shimmering Text Track */}
            <div
              className="absolute inset-0 flex items-center justify-center text-center text-[13px] font-mono font-bold uppercase tracking-[0.35em]"
              style={{ color: '#FFFFFF' }}
            >
              <span className="animate-pulse" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {isUnlocked ? 'ACCESS GRANTED' : 'SLIDE TO UNLOCK'}
              </span>
            </div>

            {/* Draggable Handle */}
            <motion.button
              type="button"
              aria-label="Slide to unlock"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              style={{
                left: `${handlePosition}px`,
                top: '5px',
                color: '#FFFFFF',
              }}
              className="absolute z-10 flex h-[56px] w-[56px] touch-none items-center justify-center rounded-full border border-white/30 bg-gradient-to-b from-[#E2A33D] to-[#b37a1f] shadow-[0_6px_24px_rgba(226,163,61,0.5),inset_0_1px_0_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {isUnlocked ? (
                <ShieldCheck className="h-6 w-6 animate-bounce" style={{ color: '#FFFFFF' }} />
              ) : (
                <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" strokeWidth={2.8} style={{ color: '#FFFFFF' }} />
              )}
            </motion.button>
          </div>

          {/* Auto Unlock Timer Pill */}
          <div
            aria-live="polite"
            className="flex items-center justify-center gap-2 text-center text-[10px] font-mono uppercase tracking-[0.35em]"
            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{isUnlocked ? 'AUTHENTICATED' : `AUTO-UNLOCKING IN ${countdown}S`}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UnlockIntroScreen;