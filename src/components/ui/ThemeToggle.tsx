import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../features/ThemeProvider'

export default function ThemeToggle() {
    const { scheme, toggleTheme } = useTheme()
    const isDark = scheme === 'dark'
    const reduceMotion = useReducedMotion()

    return (
        <div className="theme-toggle-wrapper">
            {/* Mode label */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={scheme}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    className="theme-toggle-label"
                >
                    {scheme.toUpperCase()} MODE
                </motion.span>
            </AnimatePresence>

            {/* Toggle track */}
            <button
                onClick={toggleTheme}
                id="theme-toggle-btn"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                aria-pressed={isDark}
                className="theme-toggle-track"
            >
                {/* Icons inside track */}
                <span className="theme-toggle-icon-left">
                    <Sun size={9} />
                </span>
                <span className="theme-toggle-icon-right">
                    <Moon size={9} />
                </span>

                {/* Thumb */}
                <motion.span
                    className="theme-toggle-thumb"
                    layout
                    animate={{ x: isDark ? 24 : 2 }}
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 30 }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={scheme}
                            initial={reduceMotion ? { opacity: 1 } : { scale: 0, rotate: -90 }}
                            animate={reduceMotion ? { opacity: 1 } : { scale: 1, rotate: 0 }}
                            exit={reduceMotion ? { opacity: 1 } : { scale: 0, rotate: 90 }}
                            transition={{ duration: reduceMotion ? 0 : 0.15 }}
                            className="flex items-center justify-center"
                        >
                            {isDark
                                ? <Moon size={10} />
                                : <Sun size={10} />
                            }
                        </motion.span>
                    </AnimatePresence>
                </motion.span>
            </button>
        </div>
    )
}
