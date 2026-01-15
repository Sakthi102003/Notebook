import React from 'react'
import { motion } from 'framer-motion'

interface StealthCardProps {
    children: React.ReactNode
    className?: string
    accents?: boolean
    showScanline?: boolean
    glow?: 'blue' | 'crimson'
}

const StealthCard = ({
    children,
    className = "",
    accents = true,
    showScanline = true,
    glow = 'blue'
}: StealthCardProps) => {
    const accentColor = glow === 'blue' ? 'border-electric-blue' : 'border-crimson'

    return (
        <div
            className={`
        relative 
        bg-stealth-800/30 backdrop-blur-md
        border border-white/5
        hover:border-white/10
        transition-all duration-500 
        group overflow-hidden
        ${className}
      `}
        >
            {/* Stealth Accents (Razor-sharp Corners) */}
            {accents && (
                <>
                    <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${accentColor} opacity-20 group-hover:opacity-100 transition-opacity duration-300 z-30`} />
                    <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${accentColor} opacity-20 group-hover:opacity-100 transition-opacity duration-300 z-30`} />
                    <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${accentColor} opacity-20 group-hover:opacity-100 transition-opacity duration-300 z-30`} />
                    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${accentColor} opacity-20 group-hover:opacity-100 transition-opacity duration-300 z-30`} />
                </>
            )}

            {/* Scanning Line Effect */}
            {showScanline && (
                <motion.div
                    animate={{ top: ["-100%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className={`absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${glow === 'blue' ? 'electric-blue' : 'crimson'}/40 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none z-20`}
                />
            )}

            {/* Subtle Digital Art Style Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-10" />

            <div className="relative z-20">
                {children}
            </div>
        </div>
    )
}

export default StealthCard
