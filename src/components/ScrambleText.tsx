import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
    text: string;
    className?: string;
    delay?: number;
    scrambleSpeed?: number;
    revealSpeed?: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>[]{}-=~/?|\\§±';

const ScrambleText: React.FC<ScrambleTextProps> = ({
    text,
    className = '',
    delay = 0,
    scrambleSpeed = 30, // ms between character scrambles
    revealSpeed = 50    // ms between revealing next character
}) => {
    const [displayText, setDisplayText] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setIsStarted(true);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!isStarted) return;

        let currentIndex = 0;
        let scrambleInterval: NodeJS.Timeout;

        const revealNextCharacter = () => {
            if (currentIndex > text.length) {
                clearInterval(scrambleInterval);
                return;
            }

            const updateText = () => {
                const scrambled = text.split('').map((char, index) => {
                    if (index < currentIndex) {
                        return text[index];
                    }
                    if (char === ' ') return ' ';
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join('');

                setDisplayText(scrambled);
            };

            // Continuous scramble for characters not yet revealed
            if (!scrambleInterval) {
                scrambleInterval = setInterval(updateText, scrambleSpeed);
            }

            currentIndex++;

            if (currentIndex <= text.length) {
                setTimeout(revealNextCharacter, revealSpeed);
            }
        };

        revealNextCharacter();

        return () => {
            if (scrambleInterval) clearInterval(scrambleInterval);
        };
    }, [isStarted, text, scrambleSpeed, revealSpeed]);

    return (
        <span className={`${className} inline-flex items-center`}>
            <span className="relative">
                {displayText || (isStarted ? '' : '')}
                {isStarted && (
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-[2px] h-[1.2em] bg-highlight-blue dark:bg-highlight-cyan ml-1 align-middle"
                    />
                )}
            </span>
        </span>
    );
};

export default ScrambleText;
