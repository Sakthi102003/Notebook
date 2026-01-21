import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
    onCommand?: (cmd: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onCommand }) => {
    const [history, setHistory] = useState<{ type: 'input' | 'output' | 'error', content: string }[]>([
        { type: 'output', content: 'SAKTHI_OS [Version 2.0.42]' },
        { type: 'output', content: '(c) SakthiLabs Corporation. All rights reserved.' },
        { type: 'output', content: 'Type "help" for a list of available commands.' },
    ]);
    const [input, setInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setHistory([
                { type: 'output', content: 'SAKTHI_OS [Version 2.0.42]' },
                { type: 'output', content: '(c) SakthiLabs Corporation. All rights reserved.' },
                { type: 'output', content: 'Type "help" for a list of available commands.' },
            ]);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        setHistory(prev => [...prev, { type: 'input', content: input }]);

        processCommand(cmd);
        setInput('');
    };

    const processCommand = (cmd: string) => {
        if (onCommand) onCommand(cmd);

        switch (cmd) {
            case 'help':
                setHistory(prev => [...prev, { type: 'output', content: 'AVAILABLE_COMMANDS:\n  help      - Show this help menu\n  whoami    - Display current user profile\n  ls        - List available sectors\n  cat [id]  - Read sector intelligence\n  status    - Launch Diagnostic HUD\n  clear     - Wipe terminal history\n  exit      - Terminate connection' }]);
                break;
            case 'whoami':
                setHistory(prev => [...prev, { type: 'output', content: 'IDENTITY: Sakthi Murugan\nROLE: Software Engineer & Cybersecurity Enthusiast\nSTATUS: Active / Available\nLOCATION: [REDACTED]' }]);
                break;
            case 'ls':
                setHistory(prev => [...prev, { type: 'output', content: 'Available Sectors:\n - home\n - about\n - skills\n - projects\n - gears\n - contact' }]);
                break;
            case 'status':
                setHistory(prev => [...prev, { type: 'output', content: 'INITIALIZING_DIAGNOSTIC_HUD...' }]);
                // Trigger HUD via parent if needed, but the parent handles it via onCommand
                break;
            case 'clear':
                setHistory([]);
                break;
            case 'exit':
                onClose();
                break;
            case (cmd.match(/^cat /) || {}).input:
                const sector = cmd.split(' ')[1];
                const content: Record<string, string> = {
                    home: "SYSTEM_INITIALIZATION: All systems operational. Terminal session established. Welcome back, agent.",
                    about: "MISSION_LOG: Passionate about building secure, scalable applications. Expertise in full-stack development and security research.",
                    skills: "INTEL: Core Stack includes React, TypeScript, Python, and Django. Special interest in Offensive Security.",
                    projects: "DEPLOYMENTS: Multiple successful operations launched including analytics tools and security scanners.",
                    gears: "LOADOUT: Primary workstation: HP Laptop 15s. Tactical relay: BoAt Airdopes. Navigation: Logitech MX Anywhere 3.",
                    contact: "COMM_SENSORS: Multiple channels active. Reach out via [GITHUB](https://github.com/Sakthi102003), [LINKEDIN](https://linkedin.com/in/sakthimurugan-s), or [SECURE_MAIL](sakthimurugan102003@gmail.com)."
                };
                if (content[sector]) {
                    setHistory(prev => [...prev, { type: 'output', content: content[sector] }]);
                } else {
                    setHistory(prev => [...prev, { type: 'error', content: `ERROR: UNKNOWN_SECTOR "${sector}"` }]);
                }
                break;
            default:
                setHistory(prev => [...prev, { type: 'error', content: `COMMAND_NOT_FOUND: ${cmd}. Type "help" for options.` }]);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: isMinimized ? 'calc(100% - 40px)' : 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] bg-stealth-900/95 backdrop-blur-md border-t border-electric-blue/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                    style={{ height: isMinimized ? '40px' : '40vh' }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 h-10 border-b border-white/5 bg-stealth-800/50">
                        <div className="flex items-center gap-2">
                            <TerminalIcon size={14} className="text-electric-blue" />
                            <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest">INTELLIGENCE_TERMINAL_v2.0</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="text-gray-500 hover:text-white transition-colors"
                                title={isMinimized ? "Restore" : "Minimize"}
                            >
                                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                            </button>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-crimson transition-colors"
                                title="Terminate Session"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <div
                            className="p-4 font-mono text-xs overflow-y-auto h-[calc(40vh-80px)] selection:bg-electric-blue/30 no-scrollbar"
                            ref={terminalRef}
                            onClick={() => inputRef.current?.focus()}
                        >
                            <div className="space-y-1">
                                {history.map((line, i) => (
                                    <div key={i} className={`whitespace-pre-wrap ${line.type === 'input' ? 'text-white flex gap-2' :
                                        line.type === 'error' ? 'text-crimson' :
                                            'text-electric-blue/80'
                                        }`}>
                                        {line.type === 'input' && <ChevronRight size={14} className="text-electric-blue shrink-0 mt-0.5" />}
                                        {line.content.split(/(\[.*?\]\(.*?\))/).map((part, index) => {
                                            const match = part.match(/\[(.*?)\]\((.*?)\)/);
                                            if (match) {
                                                const [, label, url] = match;
                                                const isEmail = url.includes('@') && !url.startsWith('http');
                                                return (
                                                    <a
                                                        key={index}
                                                        href={isEmail ? `mailto:${url}` : url}
                                                        target={isEmail ? undefined : "_blank"}
                                                        rel="noopener noreferrer"
                                                        className="text-white underline hover:text-electric-blue transition-colors px-1 font-bold"
                                                    >
                                                        {label}
                                                    </a>
                                                );
                                            }

                                            return part.split(/(\s+|[,().])/).map((subPart, subIndex) => {
                                                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subPart);
                                                const isUrl = /^https?:\/\/\S+$/.test(subPart);
                                                if (isEmail) return <a key={`${index}-${subIndex}`} href={`mailto:${subPart}`} className="text-white underline hover:text-electric-blue transition-colors px-1">{subPart}</a>;
                                                if (isUrl) return <a key={`${index}-${subIndex}`} href={subPart} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-electric-blue transition-colors px-1">{subPart}</a>;
                                                return subPart;
                                            });
                                        })}
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleCommand} className="flex gap-2 mt-2">
                                <ChevronRight size={14} className="text-electric-blue shrink-0 mt-0.5" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="bg-transparent border-none outline-none text-white w-full uppercase"
                                    autoFocus
                                    spellCheck={false}
                                    autoComplete="off"
                                />
                            </form>
                        </div>
                    )}

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;
