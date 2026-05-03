import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Briefcase } from 'lucide-react'
import { useTheme } from '../features/ThemeProvider'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const isCorporate = theme === 'corporate'

    return (
        <div className="theme-toggle-wrapper">
            {/* Mode label */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="theme-toggle-label"
                >
                    {isCorporate ? 'CORPORATE ACCESS' : 'STEALTH MODE'}
                </motion.span>
            </AnimatePresence>

            {/* Toggle track */}
            <button
                onClick={toggleTheme}
                id="theme-toggle-btn"
                aria-label={`Switch to ${isCorporate ? 'stealth' : 'corporate'} mode`}
                aria-pressed={isCorporate}
                className="theme-toggle-track"
            >
                {/* Icons inside track */}
                <span className="theme-toggle-icon-left">
                    <Shield size={9} />
                </span>
                <span className="theme-toggle-icon-right">
                    <Briefcase size={9} />
                </span>

                {/* Thumb */}
                <motion.span
                    className="theme-toggle-thumb"
                    layout
                    animate={{ x: isCorporate ? 22 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={theme}
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center justify-center"
                        >
                            {isCorporate
                                ? <Briefcase size={10} />
                                : <Shield size={10} />
                            }
                        </motion.span>
                    </AnimatePresence>
                </motion.span>
            </button>
        </div>
    )
}
