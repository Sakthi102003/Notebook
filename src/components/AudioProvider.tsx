
import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

const AudioProvider: React.FC = () => {
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Global Event Listeners for "Cyber-Tactile" feel

        const handleClick = () => {
            audioEngine.playClick();
        };

        // We only want to play hover sounds on interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if target is interactive
            if (target.matches('button, a, input, [role="button"], .interactive')) {
                audioEngine.playHover();
            }
            // Also check parents if we are hovering an icon inside a button
            if (target.closest('button, a, [role="button"]')) {
                // Debouncing or checking if we just played might be good, 
                // but for raw reaction let's keep it simple first.
                // Actually, closest matching on every mousemove might be heavy, 
                // but mouseover only fires on entry.
                // audioEngine.playHover(); 
                // Let's stick to direct target or closest interactive
            }
        };

        window.addEventListener('click', handleClick);
        // Use capture to ensuring we catch it
        // Adding to body to delegate
        document.body.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('click', handleClick);
            document.body.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const toggleMute = () => {
        const newState = audioEngine.toggleMute();
        setIsMuted(newState);
        if (!newState) audioEngine.playSuccess(); // Feedback when unmutes
    };

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-6 right-6 z-[50] p-3 
                 bg-stealth-900/80 backdrop-blur-md border border-white/10 
                 text-electric-blue hover:text-white hover:border-electric-blue 
                 transition-all rounded-sm group uppercase tracking-widest text-[10px] font-mono flex items-center gap-2"
            title="Toggle Audio Engine"
        >
            {isMuted ? (
                <>
                    <VolumeX size={14} className="group-hover:text-crimson transition-colors" />
                    <span className="hidden sm:inline opacity-50 group-hover:opacity-100">SILENT</span>
                </>
            ) : (
                <>
                    <Volume2 size={14} className="group-hover:text-electric-blue transition-colors" />
                    <span className="hidden sm:inline opacity-50 group-hover:opacity-100">AUDIO_ON</span>
                </>
            )}
        </button>
    );
};

export default AudioProvider;
