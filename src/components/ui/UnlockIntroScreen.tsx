import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
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

  const completeUnlock = useCallback(() => {
    if (isUnlocked) {
      return;
    }

    setIsUnlocked(true);
    setDragProgress(100);

    window.setTimeout(() => {
      onUnlock();
    }, reduceMotion ? 0 : 420);
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

  // const handleTapUnlock = () => {
  //   completeUnlock();
  // };

  return (
    <motion.div
      key="unlock-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.42, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 text-white"
      style={{
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 2px, transparent 2px, transparent 8px)',
      }}
      aria-label="Portrait intro screen"
    >
      <div className="w-full max-w-[430px]">
        <div className="relative overflow-hidden rounded-[30px] border border-[#ffffff1a] bg-[#1b130f] shadow-[0_30px_80px_rgba(0,0,0,0.75)]">
          <div className="relative aspect-[0.8] w-full overflow-hidden">
            <img
              src="/images/profile.jpg"
              alt="Sakthi Murugan portrait"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-x-0 top-0 z-10 px-5 pt-5 sm:px-6 sm:pt-6">
              <div className="max-w-[82%]">
                <h1 className="text-[2.8rem] font-black leading-[0.9] tracking-[-0.08em] text-[#f6e6b6] drop-shadow-[0_3px_18px_rgba(0,0,0,0.7)] sm:text-[3.6rem]">
                  Sakthi <span className="text-[#f8d490]">Murugan</span>
                </h1>
                <p className="mt-1 text-[13px] font-medium text-[#f1d7a1] opacity-90 sm:text-[15px]">
                  Frontend Developer &amp; Security Researcher
                </p>
              </div>
            </div>

            <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-5 sm:bottom-5">
              <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-[#2d2320]/60 px-3 py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <img
                  src="/images/blue avatar.png"
                  alt="Sakthi Murugan avatar"
                  className="h-10 w-10 rounded-full border border-white/15 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-medium text-white">@sakthimurugans._</div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerRelease}
            onPointerLeave={handlePointerRelease}
            onPointerCancel={handlePointerRelease}
            className="relative h-[70px] w-full touch-none overflow-hidden rounded-full border border-white/10 bg-[#101010] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <motion.div
              animate={{ width: `${dragProgress}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.14, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#3b2a14] via-[#90661b] to-[#E2A33D] opacity-80"
            />

            <div className="absolute inset-0 flex items-center justify-center text-center text-[14px] font-semibold uppercase tracking-[0.32em] text-white/70">
              SLIDE TO UNLOCK
            </div>

            <motion.button
              type="button"
              aria-label="Slide to unlock"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              style={{
                left: `${handlePosition}px`,
                top: '6px',
              }}
              className="absolute z-10 flex h-[58px] w-[58px] touch-none items-center justify-center rounded-[18px] border border-[#d59a2c] bg-[#E2A33D] text-black shadow-[0_10px_30px_rgba(226,163,61,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2.6} />
            </motion.button>
          </div>

          <div aria-live="polite" className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.38em] text-white/60">
            {isUnlocked ? 'UNLOCKED' : `AUTO-UNLOCKING IN ${countdown}s`}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UnlockIntroScreen;