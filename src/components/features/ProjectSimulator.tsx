import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Play, Square, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface ProjectSimulatorProps {
    project: {
        title: string;
        tech: string[];
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectSimulator = ({ project, isOpen, onClose }: ProjectSimulatorProps) => {
    const [lines, setLines] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const simulationLogs = [
        `> INITIALIZING_VIRTUAL_ENVIRONMENT...`,
        `> LOADING_CORE_MODULES: ${project?.tech.join(', ')}`,
        `> ESTABLISHING_SECURE_TUNNEL...`,
        `> STATUS: 200 OK`,
        `> STARTING_APPLICATION_INSTANCE: ${project?.title?.toUpperCase()}`,
        `> --------------------------------------------------`,
        `> [SYS] Memory Allocation: Optimized`,
        `> [SYS] Thread Priority: REAL_TIME`,
        `> [APP] Hooking into system events...`,
        `> [APP] Event loop started.`,
        `> [NET] Monitoring port 443...`,
        `> [DB] Connected to secure_vault_01`,
        `> [LOG] User login detected from [REDACTED]`,
        `> [LOG] Querying analytics database...`,
        `> [LOG] Process 4242 started successfully.`,
        `> [WARN] Minor latency detected in sector 7`,
        `> [LOG] Packet inspection active...`,
        `> [LOG] Encrypting outgoing stream...`,
        `> [SYS] Peak performance reached.`,
        `> [APP] Running diagnostic check...`,
        `> [APP] Diagnostics: 0 Errors, 0 Warnings`,
        `> --------------------------------------------------`,
        `> SIMULATION_ACTIVE // MONITORING_OUTPUT`
    ];

    useEffect(() => {
        if (isOpen && !isRunning) {
            startSimulation();
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    const startSimulation = () => {
        setIsRunning(true);
        setLines([]);
        let i = 0;
        const interval = setInterval(() => {
            if (i < simulationLogs.length) {
                setLines(prev => [...prev, simulationLogs[i]]);
                i++;
            } else {
                // Keep adding random metrics after initial sequence
                const randomLogs = [
                    `> [NET] Recv: ${Math.floor(Math.random() * 1024)}kb | Sent: ${Math.floor(Math.random() * 512)}kb`,
                    `> [SYS] CPU Load: ${Math.floor(Math.random() * 20) + 10}%`,
                    `> [SYS] Mem Usage: ${Math.floor(Math.random() * 100) + 200}MB`,
                    `> [APP] Heartbeat... 200 OK`,
                ];
                setLines(prev => [...prev, randomLogs[Math.floor(Math.random() * randomLogs.length)]]);
                if (lines.length > 50) setLines(prev => prev.slice(1));
            }
        }, 300);

        return () => clearInterval(interval);
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 z-[110] bg-stealth-950/95 flex items-center justify-center p-4 md:p-12"
                    onClick={onClose}
                >
                    <div
                        className="w-full max-w-4xl h-full max-h-[70vh] bg-black border border-green-500/30 flex flex-col shadow-[0_0_50px_rgba(34,197,94,0.1)]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Title Bar */}
                        <div className="flex items-center justify-between px-4 py-2 bg-green-500/10 border-b border-green-500/20 text-green-500 font-mono text-[10px] uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Terminal size={14} />
                                <span>SIMULATION_STREAM // {project.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span>LIVE_READY</span>
                                </div>
                                <button onClick={onClose} className="hover:text-white transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Control Bar */}
                        <div className="px-4 py-2 border-b border-green-500/10 flex items-center gap-4 bg-green-500/5">
                            <button className="flex items-center gap-2 text-[9px] font-mono font-bold text-green-500 hover:text-white transition-colors uppercase">
                                <Play size={10} /> REBOOT
                            </button>
                            <button className="flex items-center gap-2 text-[9px] font-mono font-bold text-gray-500 hover:text-white transition-colors uppercase">
                                <Square size={10} /> HALT
                            </button>
                            <div className="flex-1" />
                            <div className="text-[9px] font-mono text-green-500/50 flex items-center gap-2">
                                <Loader2 size={10} className="animate-spin" />
                                STREAMING_DATA...
                            </div>
                        </div>

                        {/* Log Window */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 font-mono text-xs text-green-500/80 space-y-1 selection:bg-green-500/20 selection:text-green-500"
                        >
                            {lines.map((line, idx) => (
                                <div key={idx} className="leading-relaxed">
                                    {line}
                                </div>
                            ))}
                            <div className="flex items-center gap-1">
                                <span className="animate-pulse">_</span>
                            </div>
                        </div>

                        {/* Footer Overlay Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.4)_150%)] opacity-50" />
                        <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
                            <div className="w-full h-full opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectSimulator;
