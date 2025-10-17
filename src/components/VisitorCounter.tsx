import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import { incrementVisitorCount, subscribeToVisitorCount } from '../services/firebase'

const VisitorCounter = () => {
  const [viewCount, setViewCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasIncremented, setHasIncremented] = useState(false)

  useEffect(() => {
    // Increment visitor count only once per session
    if (!hasIncremented) {
      incrementVisitorCount().then(() => {
        setHasIncremented(true)
        setIsLoading(false)
      }).catch((error) => {
        console.error('Error incrementing visitor count:', error)
        setIsLoading(false)
      })
    }

    // Subscribe to real-time updates
    const unsubscribe = subscribeToVisitorCount((count) => {
      setViewCount(count)
      setIsLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [hasIncremented])

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg backdrop-blur-sm">
          <div className="relative">
            <Eye size={24} className="text-highlight-blue dark:text-highlight-cyan animate-pulse" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-blue-400/20 dark:bg-cyan-400/20 rounded-full blur-md"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Loading Views
            </span>
            <div className="flex gap-1 mt-1">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                className="w-2 h-2 bg-highlight-blue dark:bg-highlight-cyan rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                className="w-2 h-2 bg-highlight-blue dark:bg-highlight-cyan rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                className="w-2 h-2 bg-highlight-blue dark:bg-highlight-cyan rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Split number into digits for individual animation
  const digits = viewCount.toString().split('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl blur-sm opacity-20 group-hover:opacity-30 transition duration-300" />
      
      {/* Main container */}
      <div className="relative inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 border border-blue-200/50 dark:border-blue-700/50 shadow-lg backdrop-blur-sm overflow-hidden">
        
        {/* Icon section */}
        <div className="relative flex items-center justify-center">
          <Eye size={20} className="text-highlight-blue dark:text-highlight-cyan" />
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 border-2 border-highlight-blue dark:border-highlight-cyan rounded-full"
          />
        </div>

        {/* Counter section */}
        <div className="flex items-center gap-2">
          {/* Animated digits */}
          <div className="flex items-center">
            {digits.map((digit, index) => (
              <motion.span
                key={`${index}-${digit}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: index * 0.03,
                  type: "spring",
                  stiffness: 300
                }}
                className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 tabular-nums"
              >
                {digit}
              </motion.span>
            ))}
          </div>

          {/* Views label */}
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            views
          </span>

          {/* Live indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex items-center gap-1 ml-1"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-green-500 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default VisitorCounter
