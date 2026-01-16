import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface HoloCardProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export default function HoloCard({ children, className = '', onClick }: HoloCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function onMouseMove({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        const { left, top, width, height } = ref.current!.getBoundingClientRect()
        const xPct = (clientX - left) / width - 0.5
        const yPct = (clientY - top) / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    function onMouseLeave() {
        x.set(0)
        y.set(0)
    }

    // Tilt effect
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7deg', '-7deg'])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7deg', '7deg'])

    // Sheen gradient position
    const sheenX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
    const sheenY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

    const sheenGradient = useMotionTemplate`radial-gradient(
    circle at ${sheenX} ${sheenY},
    rgba(0, 229, 255, 0.15),
    transparent 50%
  )`

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            style={{
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY,
            }}
            className={`relative active:scale-95 transition-all duration-200 perspective-1000 ${className}`}
        >
            <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 h-full">
                {children}
            </div>

            {/* Holographic Sheen Layer */}
            <motion.div
                style={{
                    background: sheenGradient,
                }}
                className="absolute inset-0 z-20 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Border Glow */}
            <div className="absolute inset-0 z-0 rounded-xl border border-white/5 group-hover:border-electric-blue/30 transition-colors duration-300 pointer-events-none" />
        </motion.div>
    )
}
