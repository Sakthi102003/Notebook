import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, Keyboard, Mouse, Headphones, Smartphone, X, ArrowLeft, Cpu } from 'lucide-react'
import { useState, useEffect } from 'react'
import StealthCard from '../ui/StealthCard'

const GearsSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const gears = [
    {
      category: "Devices",
      items: [
        { name: 'HP Laptop 15s"', spec: 'Ryzen 3 5300 Series, 8GB RAM', icon: Laptop },
        { name: 'Logitech Keyboard', spec: 'Wireless Multi-Device', icon: Keyboard },
        { name: 'Logitech MX Anywhere 3', spec: 'Precision Wireless Mouse', icon: Mouse },
        { name: 'Samsung Galaxy Buds Core', spec: 'Everyday wireless audio', icon: Headphones },
        { name: 'Samsung Galaxy A34', spec: 'Everyday mobile companion', icon: Smartphone },
      ]
    }
  ]

  return (
    <>
      <section id="gears" className="py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4" style={{ color: 'var(--text-primary)' }}>
                <span className="font-mono opacity-50" style={{ color: 'var(--accent-cyan)' }}>04.</span> MY WORKSPACE
              </h2>
              <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), transparent)' }} />
            </div>

            <StealthCard
              accents={false}
              showScanline={false}
              className="p-8 cursor-pointer"
            >
              <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-6 group"
              >
                <div className="p-4 rounded-xl" style={{ background: 'rgba(var(--accent-color)/0.1)', color: 'var(--accent-cyan)' }}>
                  <Cpu size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>The tools I use</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>A little look at the everyday setup behind my work.</p>
                </div>
              </div>
            </StealthCard>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] backdrop-blur-2xl overflow-y-auto"
            style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
          >
            <div className="min-h-screen px-4 py-12 flex flex-col items-center">
              <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-16">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 border rounded-xl transition-all"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 border rounded-xl transition-all"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center mb-20"
                >
                  <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>My workspace</h1>
                  <div className="glow-line-blue w-24 mx-auto mb-4" />
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>The gear that helps me stay curious and create.</p>
                </motion.div>

                <div className="space-y-12 pb-20">
                  {gears.map((category) => (
                    <div key={category.category} className="space-y-8">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono tracking-[0.5em] uppercase px-4 py-1 border rounded-full" style={{ background: 'rgba(var(--accent-color)/0.1)', borderColor: 'var(--border-soft)', color: 'var(--accent-cyan)' }}>
                          Category: {category.category}
                        </span>
                        <div className="flex-1 h-[1px]" style={{ background: 'var(--border-subtle)' }} />
                      </div>

                      <div className="grid gap-6">
                        {category.items.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                          >
                            <StealthCard className="p-6">
                              <div className="flex items-center">
                                <div className="p-4 rounded-xl mr-6" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--accent-cyan)' }}>
                                  <item.icon size={24} />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                                  <p className="mt-1 text-sm opacity-70" style={{ color: 'var(--text-secondary)' }}>{item.spec}</p>
                                </div>
                              </div>
                            </StealthCard>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GearsSection
