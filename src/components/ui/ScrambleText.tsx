import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  scrambleSpeed?: number;
  revealSpeed?: number;
}

// Printable characters available from a standard keyboard. Spaces stay intact
// so multi-word names remain easy to recognize while they resolve.
const KEYBOARD_CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?';

const randomKeyboardCharacter = () =>
  KEYBOARD_CHARACTERS[Math.floor(Math.random() * KEYBOARD_CHARACTERS.length)];

const ScrambleText = ({
  text,
  className = '',
  delay = 0,
  scrambleSpeed = 30,
  revealSpeed = 50,
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    setDisplayText(text);
    setIsStarted(false);

    const startTimeout = window.setTimeout(() => setIsStarted(true), delay * 1000);
    return () => window.clearTimeout(startTimeout);
  }, [delay, text]);

  useEffect(() => {
    if (!isStarted) return;

    const startedAt = Date.now();
    const revealDuration = Math.max(revealSpeed, text.length * revealSpeed);
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const revealedCharacters = Math.min(text.length, Math.floor(elapsed / revealSpeed));

      setDisplayText(text.split('').map((character, index) => {
        if (character === ' ' || index < revealedCharacters) return character;
        return randomKeyboardCharacter();
      }).join(''));

      if (elapsed >= revealDuration) {
        setDisplayText(text);
        window.clearInterval(interval);
      }
    }, scrambleSpeed);

    return () => window.clearInterval(interval);
  }, [isStarted, revealSpeed, scrambleSpeed, text]);

  return (
    <span className={`${className} inline-flex items-center`}>
      <span className="relative">
        {displayText}
        {isStarted && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className="inline-block h-[1.1em] w-[2px] ml-1 align-middle bg-electric-blue shadow-[0_0_8px_#00E5FF]"
          />
        )}
      </span>
    </span>
  );
};

export default ScrambleText;
