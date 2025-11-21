import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, Keyboard, Mouse, Headphones, Smartphone, Settings, X, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

const GearsSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when modal is open
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
        { name: 'Logitech Keyboard', spec:  'Wireless Keyboard', icon: Keyboard },
        { name: 'Logitech MX Master 3S', spec: 'Performance Wireless Mouse', icon: Mouse },
        { name: 'Airdopes 131', spec: 'Noise Cancelling Headphones', icon: Headphones },
        { name: 'Samsung A34', spec: '256 GB Storage', icon: Smartphone },
      ]
    }
  ]

  return (
    <>
      <section id="gears" className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="notebook-page p-4 sm:p-6 md:p-8 lg:p-12"
          >
            <div className="mb-8">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium text-lg font-notebook">Development</h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-notebook font-bold text-gray-800 dark:text-gray-100">Setup</h2>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl flex items-center gap-6 shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-gray-100 dark:border-gray-700 hover:border-highlight-blue dark:hover:border-highlight-cyan"
            >
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Settings size={32} className="text-highlight-blue dark:text-highlight-cyan" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 font-notebook text-gray-800 dark:text-gray-100">Gears Used</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-handwriting">Productivity Tools, Gears i use to get my work done.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl overflow-y-auto"
          >
            <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-16"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-highlight-blue dark:text-highlight-cyan font-notebook">Gears</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 font-handwriting">My gears and tools i use to get my work done.</p>
                </motion.div>

                <div className="space-y-12">
                  {gears.map((category, catIndex) => (
                    <motion.div
                      key={category.category}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + catIndex * 0.1 }}
                      className="notebook-page p-6 sm:p-8 rounded-2xl"
                    >
                      <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100 border-b-2 border-gray-100 dark:border-gray-700 pb-4 font-notebook inline-block">
                        {category.category}
                      </h2>
                      <div className="grid gap-4">
                        {category.items.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="flex items-center p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-highlight-blue dark:hover:border-highlight-cyan hover:shadow-md group"
                          >
                            <div className="p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-highlight-blue dark:text-highlight-cyan mr-4 sm:mr-6 group-hover:scale-110 transition-transform">
                              <item.icon size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 font-notebook">{item.name}</h3>
                              <p className="text-gray-600 dark:text-gray-400 mt-1 font-handwriting text-lg">{item.spec}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
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
