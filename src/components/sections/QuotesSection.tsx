import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import StealthCard from '../ui/StealthCard'

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
    const previousIndex = Number(localStorage.getItem('portfolio-last-quote'))
    let quoteIndex = Math.floor(Math.random() * quotes.length)
    if (quotes.length > 1 && quoteIndex === previousIndex) quoteIndex = (quoteIndex + 1) % quotes.length
    localStorage.setItem('portfolio-last-quote', quoteIndex.toString())
    setCurrentQuote(quotes[quoteIndex])
  }, [])

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <StealthCard className="p-12 md:p-16 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 px-5 py-2 text-xs tracking-wide rounded-br-2xl" style={{ background: 'rgb(var(--accent-color) / 0.08)', color: 'var(--accent-cyan)' }}>A thought to keep</div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <Quote className="text-electric-blue mx-auto mb-8 opacity-20 group-hover:opacity-100 transition-opacity" size={32} />

              <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 italic" style={{ color: 'var(--text-secondary)' }}>
                "{currentQuote.text}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent flex-1 max-w-[100px]" />
                <cite className="font-bold tracking-wide not-italic text-sm" style={{ color: 'var(--text-primary)' }}>
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
