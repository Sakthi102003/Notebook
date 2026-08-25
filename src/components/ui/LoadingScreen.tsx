import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const HELLO_ROTATION = [
  'Hello', 'வணக்கம்', 'नमस्ते', 'こんにちは', '你好',
  '안녕하세요', 'Bonjour', 'Hola', 'Ciao', 'Hallo',
];

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const reduceMotion = useReducedMotion();
  const [helloIndex, setHelloIndex] = useState(0);

  // Ten greetings at 165ms each keeps the welcome sequence visible and below two seconds.
  const stepMs = 165;
  const settleMs = 250;
  const durationMs = reduceMotion ? 120 : (HELLO_ROTATION.length * stepMs) + settleMs;

  useEffect(() => {
    document.body.classList.add('loading-active');
    setHelloIndex(0);

    let rotationTimer: number | undefined;

    if (!reduceMotion) {
      rotationTimer = window.setInterval(() => {
        setHelloIndex((prev) => {
          if (prev >= HELLO_ROTATION.length - 1) {
            if (rotationTimer) {
              window.clearInterval(rotationTimer);
            }
            return prev;
          }
          return prev + 1;
        });
      }, stepMs);
    }

    const timer = window.setTimeout(onLoadingComplete, durationMs);

    return () => {
      document.body.classList.remove('loading-active');
      if (rotationTimer) {
        window.clearInterval(rotationTimer);
      }
      window.clearTimeout(timer);
    };
  }, [durationMs, onLoadingComplete, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.35, ease: 'easeInOut' } }}
      onClick={onLoadingComplete}
      className="loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      style={{
        background: 'var(--bg-base)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(120% 90% at 12% 50%, rgb(var(--accent-color) / 0.16), transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl px-6 sm:px-10 flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-mono" style={{ color: 'var(--text-muted)' }}>
            Warming The Workspace
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-mono" style={{ color: 'var(--accent-cyan)' }}>
            A little hello
          </span>
        </div>

        <div className="min-h-[82px] sm:min-h-[98px] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${helloIndex}-${HELLO_ROTATION[helloIndex]}`}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.14, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              <h1
                className="text-4xl sm:text-6xl leading-none"
                style={{
                  fontFamily: 'var(--font-display), var(--font-display-fallbacks)',
                  color: 'var(--text-primary)',
                }}
              >
                {HELLO_ROTATION[helloIndex]}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="relative h-16 sm:h-20 overflow-hidden"
          style={{
            border: '1px solid var(--border-soft)',
            background: 'var(--bg-surface)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <motion.div
            initial={{ x: '-102%' }}
            animate={{ x: reduceMotion ? '0%' : '102%' }}
            transition={{ duration: reduceMotion ? 0 : durationMs / 1000, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-y-0 w-[42%]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgb(var(--accent-color) / 0.14) 35%, var(--accent-cyan) 65%, var(--accent-red) 100%)',
              filter: 'blur(8px)',
              opacity: 0.95,
            }}
          />
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: reduceMotion ? 0 : durationMs / 1000, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-0"
            style={{
              background: 'linear-gradient(90deg, var(--bg-surface) 0%, rgb(var(--accent-color) / 0.24) 38%, rgb(var(--accent-color) / 0.42) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 0.08) 50%, transparent 100%)',
            }}
          />
        </div>

        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-secondary)' }}>
          Loading Portfolio
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

