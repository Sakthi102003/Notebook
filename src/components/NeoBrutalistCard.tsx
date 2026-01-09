import React from 'react'
import { motion } from 'framer-motion'

interface NeoBrutalistCardProps {
  children: React.ReactNode
  className?: string
  cyberAccents?: boolean
  showScanline?: boolean
}

const NeoBrutalistCard = ({
  children,
  className = "",
  cyberAccents = true,
  showScanline = true
}: NeoBrutalistCardProps) => {
  return (
    <div
      className={`
        relative 
        bg-white dark:bg-gray-800 
        border-2 border-black dark:border-white 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]
        transition-all duration-200 
        hover:translate-x-[2px] hover:translate-y-[2px] 
        hover:shadow-none
        group overflow-hidden
        ${className}
      `}
    >
      {/* Cyber Accents (Corners) */}
      {cyberAccents && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-highlight-blue dark:border-highlight-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-highlight-blue dark:border-highlight-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-highlight-blue dark:border-highlight-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-highlight-blue dark:border-highlight-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
        </>
      )}

      {/* Scanning Line Effect */}
      {showScanline && (
        <motion.div
          initial={{ top: "-100%" }}
          whileHover={{ top: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-highlight-blue/30 dark:via-highlight-cyan/30 to-transparent pointer-events-none z-20"
        />
      )}

      {/* Subtle Digital Grid Background on Hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0.5px,_transparent_0.5px)] [background-size:12px_12px] opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none z-10" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default NeoBrutalistCard
