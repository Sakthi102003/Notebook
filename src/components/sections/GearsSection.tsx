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
        { name: 'Airdopes 131', spec: 'Tactical Audio Relay', icon: Headphones },
        { name: 'Samsung Galaxy A34', spec: 'Mobile Communication Hub', icon: Smartphone },
      ]
    }
  ]

  return (
    <>
      <section id="gears" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4 text-white">
                <span className="text-crimson font-mono opacity-50">04.</span> SYSTEM_LOADOUT
              </h2>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-crimson/30 to-transparent" />
            </div>

            <StealthCard
              accents={true}
              showScanline={true}
              className="p-8 cursor-pointer"
            >
              <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-6 group"
              >
                <div className="p-4 bg-electric-blue/5 border border-white/5 text-electric-blue group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all">
                  <Cpu size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-white uppercase tracking-widest">Inventory_Access</h3>
                  <p className="text-gray-400 text-sm font-mono uppercase tracking-tighter">Verified hardware and software specifications.</p>
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
            className="fixed inset-0 z-[100] bg-stealth-900/98 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="min-h-screen px-4 py-12 flex flex-col items-center">
              <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-16">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 border border-white/5 bg-white/5 hover:border-electric-blue transition-all text-white"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 border border-white/5 bg-white/5 hover:border-crimson transition-all text-white"
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
                  <h1 className="text-5xl font-bold mb-4 text-white uppercase tracking-[0.2em]">Hardware_Archive</h1>
                  <div className="glow-line-blue w-24 mx-auto mb-4" />
                  <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">Status: Operational // All modules active</p>
                </motion.div>

                <div className="space-y-12 pb-20">
                  {gears.map((category) => (
                    <div key={category.category} className="space-y-8">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-electric-blue tracking-[0.5em] uppercase px-4 py-1 border border-electric-blue/20 bg-electric-blue/5">
                          Category: {category.category}
                        </span>
                        <div className="flex-1 h-[1px] bg-white/5" />
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
                                <div className="p-4 bg-white/5 border border-white/5 text-gray-500 mr-6 group-hover:text-electric-blue transition-colors">
                                  <item.icon size={24} />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">{item.name}</h3>
                                  <p className="text-gray-400 mt-1 font-mono text-xs uppercase tracking-tighter opacity-70">{item.spec}</p>
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
