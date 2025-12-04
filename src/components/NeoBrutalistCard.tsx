import React from 'react'

interface NeoBrutalistCardProps {
  children: React.ReactNode
  className?: string
}

const NeoBrutalistCard = ({ 
  children, 
  className = "" 
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
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default NeoBrutalistCard
