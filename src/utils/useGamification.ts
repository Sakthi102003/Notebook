import { useState, useEffect, useCallback } from 'react';

/**
 * Tracks user engagement and "Power Level"
 */
export const useGamification = () => {
    const [powerLevel, setPowerLevel] = useState(0);
    const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
    const [interactions, setInteractions] = useState<Set<string>>(new Set());

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('sakthi_gamification');
        if (saved) {
            const data = JSON.parse(saved);
            setVisitedSections(new Set(data.visitedSections || []));
            setInteractions(new Set(data.interactions || []));
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('sakthi_gamification', JSON.stringify({
            visitedSections: Array.from(visitedSections),
            interactions: Array.from(interactions)
        }));

        // Calculate power level
        // 10% per unique section visited (max 7 sections = 70%)
        // 5% per unique interaction (chat, command palette, terminal, projects) - max 30%
        const sectionScore = Math.min(visitedSections.size * 10, 70);
        const interactionScore = Math.min(interactions.size * 5, 30);
        setPowerLevel(sectionScore + interactionScore);
    }, [visitedSections, interactions]);

    const trackSection = useCallback((sectionId: string) => {
        setVisitedSections(prev => {
            if (prev.has(sectionId)) return prev;
            const next = new Set(prev);
            next.add(sectionId);
            return next;
        });
    }, []);

    const trackInteraction = useCallback((interactionId: string) => {
        setInteractions(prev => {
            if (prev.has(interactionId)) return prev;
            const next = new Set(prev);
            next.add(interactionId);
            return next;
        });
    }, []);

    return { powerLevel, trackSection, trackInteraction };
};
