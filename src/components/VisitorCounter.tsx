import { motion } from 'framer-motion'
import { Eye, Activity } from 'lucide-react'
import { useEffect, useState } from 'react'
import { incrementVisitorCount, subscribeToVisitorCount } from '../services/firebase'

const VisitorCounter = () => {
  const [viewCount, setViewCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasIncremented, setHasIncremented] = useState(false)

  useEffect(() => {
    if (!hasIncremented) {
      incrementVisitorCount().then(() => {
        setHasIncremented(true)
      }).catch(() => {
        setIsLoading(false)
      })
    }

    const unsubscribe = subscribeToVisitorCount((count) => {
      setViewCount(count)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [hasIncremented])

  if (isLoading) {
    return (
      <div className="inline-flex items-center gap-3 px-4 py-2 bg-stealth-800/40 border border-white/5 font-mono">
        <Activity size={12} className="text-electric-blue animate-pulse" />
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Synchronizing_Pulse...</span>
      </div>
    )
  }

  const digits = viewCount.toString().padStart(6, '0').split('')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-flex items-center gap-4 px-6 py-3 bg-stealth-800/30 border border-white/10 relative group overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-electric-blue/20 to-transparent" />

      <div className="flex items-center gap-2">
        <Eye size={14} className="text-electric-blue" />
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Live_Views</span>
      </div>

      <div className="flex gap-1">
        {digits.map((digit, index) => (
          <motion.div
            key={`${index}-${digit}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-5 h-7 bg-stealth-900 border border-white/5 flex items-center justify-center"
          >
            <span className="text-sm font-bold text-electric-blue font-mono">{digit}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-1.5 h-1.5 bg-electric-blue shadow-[0_0_8px_#00E5FF]"
      />
    </motion.div>
  )
}

export default VisitorCounter
