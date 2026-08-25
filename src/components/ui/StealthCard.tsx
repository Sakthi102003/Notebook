import React from 'react'

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
}: StealthCardProps) => {
    return (
        <div
            className={`
        relative 
        portfolio-card
        rounded-2xl
        transition-all duration-500 
        group overflow-hidden
        ${className}
      `}
            style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
            }}
        >
            <div className="relative z-20">
                {children}
            </div>
        </div>
    )
}

export default StealthCard
