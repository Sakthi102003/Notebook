import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';

const IdCardOverlay = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide after 5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed top-0 right-10 z-[100] preserve-3d"
                    initial={{ y: -300, rotateX: 45 }}
                    animate={{
                        y: 0,
                        rotateX: 0,
                        transition: {
                            type: "spring",
                            stiffness: 120,
                            damping: 15,
                            mass: 1.2
                        }
                    }}
                    exit={{
                        y: -300,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut" }
                    }}
                    style={{ perspective: 1000 }}
                >
                    {/* Lanyard Strap & Clip */}
                    <div className="absolute -top-[400px] left-1/2 -translate-x-1/2 w-4 h-[420px] bg-[#0f0f0f] z-0 shadow-2xl border-x border-white/5">
                        <div className="w-full h-full opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, white 2px, white 3px)' }} />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-gray-700 to-gray-500 rounded-b-md shadow-lg" />
                    </div>

                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                        <div className="w-10 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded shadow-lg border-t border-white/50 flex flex-col items-center justify-center gap-0.5">
                            <div className="w-6 h-0.5 bg-black/20" />
                            <div className="w-6 h-0.5 bg-black/20" />
                            <div className="w-6 h-0.5 bg-black/20" />
                        </div>
                    </div>

                    {/* Card Holder */}
                    <motion.div
                        className="relative z-10 w-72 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                        animate={{
                            rotateZ: [0, 2, -1, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20" />

                        {/* Top Bar */}
                        <div className="h-12 bg-stealth-800 border-b border-white/10 flex items-center justify-between px-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-electric-blue/5 animate-pulse" />
                            <div className="flex items-center gap-2 z-10">
                                <Shield size={14} className="text-electric-blue" />
                                <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">Identity_Verified</span>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        </div>

                        {/* Main Content */}
                        <div className="p-6 flex flex-col items-center relative">
                            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent" />

                            <div className="relative mb-4 group">
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-electric-blue to-purple-600 opacity-20 group-hover:opacity-40 blur transition-opacity" />
                                <img
                                    src="/images/profile.jpg"
                                    alt="Agent Identity"
                                    className="w-24 h-24 rounded-full border-2 border-white/10 relative z-10 object-cover"
                                />
                                <div className="absolute bottom-0 right-0 bg-black border border-white/10 p-1 rounded-full z-20">
                                    <Zap size={12} className="text-electric-blue" />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-white tracking-wider mb-1">
                                SAKTHIMURUGAN
                            </h2>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-2 py-0.5 bg-electric-blue/10 border border-electric-blue/20 rounded text-[9px] font-mono text-electric-blue uppercase">
                                    Class A Clearance
                                </span>
                            </div>

                            <div className="w-full space-y-2 mt-2">
                                <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono border-b border-white/5 pb-1">
                                    <span>ID</span>
                                    <span className="text-white">SAKTHI_01</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono border-b border-white/5 pb-1">
                                    <span>ROLE</span>
                                    <span className="text-white">FULL STACK</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                                    <span>ACCESS</span>
                                    <span className="text-green-400">GRANTED</span>
                                </div>
                            </div>

                            {/* Barcode / Strip */}
                            <div className="w-full h-8 mt-6 bg-white/5 rounded flex items-center justify-between px-2 overflow-hidden">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-gray-600 h-full opacity-30"
                                        style={{ height: Math.random() * 100 + '%' }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Bottom Accent */}
                        <div className="h-1 w-full bg-gradient-to-r from-electric-blue via-purple-500 to-electric-blue" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IdCardOverlay;
