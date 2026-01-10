import { motion } from 'framer-motion'
import { Quote, Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'
import StealthCard from './StealthCard'

const QuotesSection = () => {
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' })

  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Security is not a product, but a process.", author: "Bruce Schneier" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" }
  ]

  useEffect(() => {
    const today = new Date().toDateString()
    const lastVisitDate = localStorage.getItem('lastVisitDate')
    let quoteIndex = 0

    if (!lastVisitDate || lastVisitDate !== today) {
      quoteIndex = Math.floor(Math.random() * quotes.length)
      localStorage.setItem('lastVisitDate', today)
      localStorage.setItem('lastQuoteIndex', quoteIndex.toString())
    } else {
      const storedIndex = parseInt(localStorage.getItem('lastQuoteIndex') || '0')
      // Ensure stored index is within current bounds
      quoteIndex = storedIndex < quotes.length ? storedIndex : 0
    }

    setCurrentQuote(quotes[quoteIndex] || quotes[0])
  }, [])

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <StealthCard className="p-12 md:p-16 text-center relative overflow-hidden group">
            {/* Terminal Header Decoration */}
            <div className="absolute top-0 left-0 px-4 py-1 bg-white/5 border-b border-r border-white/5 text-[10px] font-mono tracking-widest text-electric-blue flex items-center gap-2">
              <Terminal size={12} />
              DECRYPTED_LOG_v2.0
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <Quote className="text-electric-blue mx-auto mb-8 opacity-20 group-hover:opacity-100 transition-opacity" size={32} />

              <blockquote className="font-mono text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 italic">
                "{currentQuote.text}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent flex-1 max-w-[100px]" />
                <cite className="font-bold text-white uppercase tracking-[0.3em] not-italic text-sm">
                  {currentQuote.author}
                </cite>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent flex-1 max-w-[100px]" />
              </div>
            </motion.div>
          </StealthCard>
        </motion.div>
      </div>
    </section>
  )
}

export default QuotesSection
