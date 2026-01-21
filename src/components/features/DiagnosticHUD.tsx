import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Shield, Wifi, Globe, Monitor, X, Database } from 'lucide-react';
import StealthCard from '../ui/StealthCard';

interface HUDProps {
    isOpen: boolean;
    onClose: () => void;
}

const DiagnosticHUD: React.FC<HUDProps> = ({ isOpen, onClose }) => {
    const [browserInfo, setBrowserInfo] = useState({
        ua: '',
        res: '',
        os: '',
        lang: ''
    });

    const [simulatedMetrics, setSimulatedMetrics] = useState({
        latency: '24ms',
        traffic: '1.2GB/s',
        packets: '99.9%',
        nodes: '12 Active'
    });

    useEffect(() => {
        const updateInfo = () => {
            if (typeof window !== 'undefined') {
                setBrowserInfo({
                    ua: navigator.userAgent.split(') ')[1] || 'Unknown',
                    res: `${window.innerWidth}x${window.innerHeight}`,
                    os: navigator.platform,
                    lang: navigator.language
                });
            }
        };

        updateInfo();
        window.addEventListener('resize', updateInfo);

        const interval = setInterval(() => {
            setSimulatedMetrics({
                latency: `${Math.floor(Math.random() * 20) + 15}ms`,
                traffic: `${(Math.random() * 2 + 0.5).toFixed(2)}GB/s`,
                packets: `${(Math.random() * 0.5 + 99.4).toFixed(1)}%`,
                nodes: `${Math.floor(Math.random() * 5) + 10} Active`
            });
        }, 2000);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', updateInfo);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-stealth-950/90 backdrop-blur-xl flex items-start justify-center p-4 overflow-y-auto pt-20 pb-10"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-16 md:-top-12 right-0 bg-white/5 border border-white/10 p-2 md:bg-transparent md:border-none text-white/40 hover:text-white flex items-center gap-2 group transition-all z-[201]"
                    >
                        <span className="text-[10px] font-mono tracking-widest opacity-0 group-hover:opacity-100 uppercase transition-all hidden md:inline">Terminate_overlay</span>
                        <X size={20} />
                    </button>

                    {/* Left Panel: Hardware/System */}
                    <div className="space-y-6">
                        <StealthCard className="p-6 border-electric-blue/20">
                            <div className="flex items-center gap-3 mb-6">
                                <Cpu className="text-electric-blue" size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">System_Core</h3>
                            </div>
                            <div className="space-y-4 font-mono text-[10px] uppercase">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Power_Output</span>
                                    <span className="text-electric-blue">OVERLOADED</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `100%` }}
                                        className="h-full bg-electric-blue shadow-[0_0_10px_#00E5FF]"
                                    />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <span className="text-gray-500">Status</span>
                                    <span className="text-green-500 animate-pulse">Operational</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Architecture</span>
                                    <span className="text-white">x86_64 Stealth</span>
                                </div>
                            </div>
                        </StealthCard>

                        <StealthCard className="p-6 border-crimson/20">
                            <div className="flex items-center gap-3 mb-6">
                                <Activity className="text-crimson" size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Live_Metrics</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 font-mono text-[10px] uppercase">
                                <div>
                                    <div className="text-gray-500 mb-1">Latency</div>
                                    <div className="text-white">{simulatedMetrics.latency}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">Traffic</div>
                                    <div className="text-white">{simulatedMetrics.traffic}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">Packets</div>
                                    <div className="text-white">{simulatedMetrics.packets}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">Nodes</div>
                                    <div className="text-white">{simulatedMetrics.nodes}</div>
                                </div>
                            </div>
                        </StealthCard>
                    </div>

                    {/* Middle Panel: Visual Scanner */}
                    <div className="md:col-span-1 flex flex-col items-center justify-center p-8 bg-stealth-800/10 border-x border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/5 to-transparent pointer-events-none" />

                        {/* Spinning Radar */}
                        <div className="relative w-36 h-36 md:w-48 md:h-48 mb-8">
                            <div className="absolute inset-0 rounded-full border border-electric-blue/20 animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-0 rounded-full border-t-2 border-electric-blue shadow-[0_0_20px_#00E5FF] animate-[spin_3s_linear_infinite]" />
                            <div className="absolute inset-4 rounded-full border border-white/5" />
                            <div className="absolute inset-[30%] bg-electric-blue/10 rounded-full flex items-center justify-center">
                                <Shield className="text-electric-blue" size={32} />
                            </div>
                            {/* Radar Pips */}
                            <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-electric-blue rounded-full animate-pulse" />
                            <div className="absolute bottom-[30%] right-[15%] w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
                        </div>

                        <div className="text-center font-mono uppercase">
                            <h2 className="text-lg font-bold text-white tracking-[0.3em] mb-2">Diagnostic_Running</h2>
                            <p className="text-[10px] text-gray-500">Scanning network perimeter for threats...</p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex flex-col items-center">
                                <Wifi size={16} className="text-electric-blue mb-1" />
                                <span className="text-[8px] text-gray-600 font-bold">W-FI</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Globe size={16} className="text-electric-blue mb-1" />
                                <span className="text-[8px] text-gray-600 font-bold">WAN</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Database size={16} className="text-electric-blue mb-1" />
                                <span className="text-[8px] text-gray-600 font-bold">SQL</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Browser Intel */}
                    <div className="space-y-6">
                        <StealthCard className="p-6 border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <Monitor className="text-gray-400" size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Browser_Intel</h3>
                            </div>
                            <div className="space-y-4 font-mono text-[10px] uppercase">
                                <div className="border-b border-white/5 pb-2">
                                    <div className="text-gray-500 mb-1">User_Agent</div>
                                    <div className="text-white truncate">{browserInfo.ua}</div>
                                </div>
                                <div className="border-b border-white/5 pb-2 text-right">
                                    <div className="text-gray-500 mb-1">Resolution</div>
                                    <div className="text-white">{browserInfo.res}</div>
                                </div>
                                <div className="border-b border-white/5 pb-2">
                                    <div className="text-gray-500 mb-1">Operating_System</div>
                                    <div className="text-white">{browserInfo.os}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-500 mb-1">Language</div>
                                    <div className="text-white">{browserInfo.lang}</div>
                                </div>
                            </div>
                        </StealthCard>

                        <StealthCard className="p-6 bg-crimson/5 border-crimson/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="text-crimson" size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-crimson">Threat_Vector</h3>
                            </div>
                            <div className="font-mono text-[9px] text-crimson/80 leading-relaxed uppercase">
                                Active monitoring enabled. All incoming requests filtered via stealth-protocol. Encryption layer: V3-PROXIMA.
                            </div>
                        </StealthCard>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DiagnosticHUD;
