import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const GREETINGS = [
  { text: 'Hello', fontFamily: "'Caveat', cursive" },
  { text: 'வணக்கம்', fontFamily: "'Kavivanar', 'Noto Sans Tamil', sans-serif" },
] as const;

const DRAW_MS = 180;
const HOLD_MS = 650;
const FINAL_HOLD_MS = 50;
const TRANSITION_MS = 100;
const EXIT_MS = 350;

function phaseDuration(index: number) {
  const holdMs = index === GREETINGS.length - 1 ? FINAL_HOLD_MS : HOLD_MS;
  return DRAW_MS + holdMs + (index === GREETINGS.length - 1 ? EXIT_MS : TRANSITION_MS);
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const reduceMotion = useReducedMotion();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const durationMs = GREETINGS.reduce((total, _, index) => total + phaseDuration(index), 0);

  useEffect(() => {
    document.body.classList.add('loading-active');
    setGreetingIndex(0);

    const phaseTimers = GREETINGS.slice(0, -1).map((_, index) => window.setTimeout(
        () => setGreetingIndex(index + 1),
        GREETINGS.slice(0, index + 1).reduce((total, _greeting, phaseIndex) => total + phaseDuration(phaseIndex), 0),
      ));

    const timer = window.setTimeout(onLoadingComplete, durationMs);

    return () => {
      document.body.classList.remove('loading-active');
      phaseTimers.forEach(window.clearTimeout);
      window.clearTimeout(timer);
    };
  }, [durationMs, onLoadingComplete, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.35, ease: 'easeInOut' } }}
      className="loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      style={{
        background: '#000',
        color: '#fff',
      }}
    >
      <div className="relative z-10 flex min-h-[12rem] items-center justify-center px-6 text-center" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${greetingIndex}-${GREETINGS[greetingIndex].text}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(-20% 100% -20% -20%)' }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(-20% -20% -20% -20%)' }}
            exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.12 : TRANSITION_MS / 1000 } }}
            transition={{
              opacity: { duration: reduceMotion ? 0.22 : 0.12 },
              clipPath: { duration: reduceMotion ? 0 : DRAW_MS / 1000, ease: [0.16, 1, 0.3, 1] },
            }}
            className="block text-6xl leading-normal sm:text-8xl py-4 px-6 overflow-visible"
            style={{ fontFamily: GREETINGS[greetingIndex].fontFamily, color: '#fff' }}
          >
            {GREETINGS[greetingIndex].text}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

