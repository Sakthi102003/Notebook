import { AnimatePresence, motion } from 'framer-motion';
import {
    Search,
    Terminal,
    Home,
    Folder,
    Github,
    Linkedin,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CommandOption {
    id: string;
    label: string;
    subLabel?: string;
    icon: React.ElementType;
    action: () => void;
    category: 'Navigation' | 'System' | 'External';
}

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    // Define Commands
    const commands: CommandOption[] = [
        // Navigation
        {
            id: 'nav-home',
            label: 'Go to Base',
            subLabel: '/',
            icon: Home,
            action: () => navigate('/'),
            category: 'Navigation'
        },
        {
            id: 'nav-projects',
            label: 'Access Project Archives',
            subLabel: '/projects',
            icon: Folder,
            action: () => navigate('/projects'),
            category: 'Navigation'
        },
        // System
        {
            id: 'sys-theme-blue',
            label: 'System Theme: Electric Blue',
            subLabel: 'Set accent color',
            icon: Zap,
            action: () => document.documentElement.style.setProperty('--accent-color', '0 229 255'),
            category: 'System'
        },
        {
            id: 'sys-theme-crimson',
            label: 'System Theme: Crimson Alert',
            subLabel: 'Set accent color',
            icon: Zap,
            action: () => document.documentElement.style.setProperty('--accent-color', '255 0 60'),
            category: 'System'
        },
        {
            id: 'sys-theme-green',
            label: 'System Theme: Bio-Hazard Green',
            subLabel: 'Set accent color',
            icon: Zap,
            action: () => document.documentElement.style.setProperty('--accent-color', '34 197 94'),
            category: 'System'
        },
        // External
        {
            id: 'ext-github',
            label: 'Open GitHub Protocol',
            subLabel: 'github.com/Sakthi102003',
            icon: Github,
            action: () => window.open('https://github.com/Sakthi102003', '_blank'),
            category: 'External'
        },
        {
            id: 'ext-linkedin',
            label: 'Open LinkedIn Network',
            subLabel: 'linkedin.com',
            icon: Linkedin,
            action: () => window.open('https://www.linkedin.com/in/sakthimurugan-s/', '_blank'),
            category: 'External'
        },
    ];

    // Filter commands based on query
    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.subLabel?.toLowerCase().includes(query.toLowerCase())
    );

    // Toggle Logic
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Keyboard Navigation inside Palette
    useEffect(() => {
        if (!isOpen) {
            setQuery('');
            setSelectedIndex(0);
            return;
        }

        const handleNavigation = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    filteredCommands[selectedIndex].action();
                    setIsOpen(false);
                }
            }
        };

        window.addEventListener('keydown', handleNavigation);
        return () => window.removeEventListener('keydown', handleNavigation);
    }, [isOpen, selectedIndex, filteredCommands]);

    // Grouping for display
    const groupedCommands = {
        Navigation: filteredCommands.filter(c => c.category === 'Navigation'),
        System: filteredCommands.filter(c => c.category === 'System'),
        External: filteredCommands.filter(c => c.category === 'External'),
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-stealth-900/80 backdrop-blur-sm"
                        />

                        {/* Palette Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-2xl bg-[#0A0A0B]/95 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden flex flex-col max-h-[60vh] font-stealth"
                        >
                            {/* Search Bar */}
                            <div className="flex items-center px-4 py-4 border-b border-white/5 bg-white/5 gap-3">
                                <Search className="text-gray-500 w-5 h-5" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Type a command or search..."
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setSelectedIndex(0);
                                    }}
                                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 text-lg font-mono focus:ring-0"
                                />
                                <div className="hidden sm:flex gap-2">
                                    <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-400 font-mono">ESC</kbd>
                                </div>
                            </div>

                            {/* Results List */}
                            <div className="overflow-y-auto p-2">
                                {filteredCommands.length === 0 ? (
                                    <div className="py-12 text-center text-gray-500 text-sm font-mono uppercase tracking-widest">
                                        No matching protocols found.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {Object.entries(groupedCommands).map(([category, cmds]) => (
                                            cmds.length > 0 && (
                                                <div key={category}>
                                                    <div className="px-3 py-2 text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] opacity-50">
                                                        {category}
                                                    </div>
                                                    <div className="space-y-1">
                                                        {cmds.map((cmd) => {
                                                            const isSelected = filteredCommands.indexOf(cmd) === selectedIndex;
                                                            return (
                                                                <button
                                                                    key={cmd.id}
                                                                    onClick={() => {
                                                                        cmd.action();
                                                                        setIsOpen(false);
                                                                    }}
                                                                    onMouseEnter={() => setSelectedIndex(filteredCommands.indexOf(cmd))}
                                                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group duration-200 ${isSelected
                                                                        ? 'bg-electric-blue/10 border border-electric-blue/20'
                                                                        : 'hover:bg-white/5 border border-transparent'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center gap-4">
                                                                        <div className={`p-2 rounded-md ${isSelected ? 'bg-electric-blue text-stealth-900' : 'bg-white/5 text-gray-400'
                                                                            }`}>
                                                                            <cmd.icon size={18} />
                                                                        </div>
                                                                        <div className="flex flex-col items-start">
                                                                            <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                                                                {cmd.label}
                                                                            </span>
                                                                            {cmd.subLabel && (
                                                                                <span className={`text-xs font-mono ${isSelected ? 'text-electric-blue' : 'text-gray-600'}`}>
                                                                                    {cmd.subLabel}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    {isSelected && (
                                                                        <motion.div
                                                                            layoutId="cmd-arrow"
                                                                            className="text-electric-blue hidden sm:block"
                                                                        >
                                                                            <Terminal size={14} />
                                                                        </motion.div>
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 border-t border-white/5 bg-black/20 text-[10px] text-gray-600 flex justify-between items-center font-mono">
                                <div className="flex gap-4">
                                    <span>↑↓ NAVIGATE</span>
                                    <span>ENTER TO EXECUTE</span>
                                </div>
                                <div className="text-electric-blue/50">
                                    SYSTEM_READY
                                </div>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Mobile Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed bottom-6 left-6 z-[50] p-3 bg-stealth-900/80 backdrop-blur-md border border-white/10 text-electric-blue hover:text-white hover:border-electric-blue transition-all rounded-sm group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                title="Open Command Palette"
            >
                <Terminal size={20} />
                <span className="sr-only">Open Command Palette</span>
            </button>
        </>
    );
};

export default CommandPalette;
