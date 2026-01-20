import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

const IdCardOverlay = () => {
    const [isVisible, setIsVisible] = useState(true);



    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed -top-10 right-20 z-[100] preserve-3d"
                    initial={{ y: -500, rotateX: 45 }}
                    animate={{
                        y: 150,
                        rotateX: 0,
                        transition: {
                            type: "spring",
                            stiffness: 60,
                            damping: 12,
                            mass: 1.2
                        }
                    }}
                    exit={{
                        y: -600,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "anticipate" }
                    }}
                    style={{ perspective: 1000 }}
                >
                    {/* Realistic Thin Lanyard Rope */}
                    <div className="absolute -top-[600px] left-1/2 -translate-x-1/2 w-1.5 h-[620px] bg-[#1a1a1a] z-0 shadow-lg">
                        {/* Rope texture pattern */}
                        <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)' }} />
                    </div>

                    {/* Connector Clip (Cylindrical) */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-6 flex flex-col items-center z-10">
                        {/* Main cylinder */}
                        <div className="w-6 h-5 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 rounded-sm shadow-md border border-white/10" />
                        {/* Connecting ring */}
                        <div className="w-3 h-3 -mt-2 rounded-full border-[3px] border-gray-600" />
                    </div>

                    {/* Card Holder */}
                    <motion.div
                        className="relative z-10 w-[280px] h-[450px] bg-black border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col p-6 cursor-pointer"
                        onClick={() => setIsVisible(false)}
                        animate={{
                            rotateZ: [0, 1.5, -1.5, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Glossy Texture */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-30" />

                        {/* Top Content */}
                        <div className="relative z-20 mb-6">
                            <h2 className="text-3xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-2">
                                SAKTHI<br />MURUGAN
                            </h2>
                            <p className="text-gray-400 font-mono text-xs tracking-widest uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                                A Normal Security focused Dev
                            </p>
                            <div className="flex gap-2 mt-3">
                                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[4px] text-[8px] text-gray-400 font-mono">ID: SK_01</span>
                                <span className="px-2 py-0.5 bg-electric-blue/10 border border-electric-blue/20 rounded-[4px] text-[8px] text-electric-blue font-mono">LVL_5</span>
                            </div>
                        </div>

                        {/* Image Container - taking up remaining space */}
                        <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 group">
                            {/* Image */}
                            <img
                                src="/images/profile.jpg"
                                alt="Agent Identity"
                                className="absolute inset-0 w-full h-full object-cover object-top scale-125 origin-top transition-all duration-700"
                            />

                            {/* Overlay Pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

                            {/* Bottom Name Label overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent z-20">
                                <div className="flex justify-between items-end">
                                    <Zap size={16} className="text-electric-blue" />
                                    <div className="text-[8px] text-white/50 font-mono text-right">
                                        SECURE_ACCESS<br />GRANTED
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative side elements */}
                        <div className="absolute right-3 top-24 bottom-24 w-0.5 flex flex-col justify-between items-center opacity-20">
                            <div className="w-[1px] h-full bg-dashed-line" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IdCardOverlay;
