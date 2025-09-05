import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useEffect, useState } from 'react'

const QuotesSection = () => {
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' })

  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
     {
    text: "You have the right to work, but never to the fruit of work.",
    author: "Bhagavad Gita"
  },
    {
      text: "Experience is the name everyone gives to their mistakes.",
      author: "Oscar Wilde"
    },
    {
      text: "The best error message is the one that never shows up.",
      author: "Thomas Fuchs"
    },
    {
      text: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci"
    },
    {
      text: "Programming isn't about what you know; it's about what you can figure out.",
      author: "Chris Pine"
    },
    {
      text: "The most important thing in life is to stop saying 'I wish' and start saying 'I will'.",
      author: "Charles Dickens"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins"
    },
    {
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay"
    },
    {
      text: "Security is not a product, but a process.",
      author: "Bruce Schneier"
    },
     {
    text: "Man is made by his belief. As he believes, so he is.",
    author: "Bhagavad Gita"
  },
    {
      text: "The function of good software is to make the complex appear to be simple.",
      author: "Grady Booch"
    },
    {
      text: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci"
    },
    {
      text: "The expert in anything was once a beginner.",
      author: "Helen Hayes"
    },
    {
      text: "Progress is impossible without change, and those who cannot change their minds cannot change anything.",
      author: "George Bernard Shaw"
    },
    {
      text: "Technology is best when it brings people together.",
      author: "Matt Mullenweg"
    }
  ]

  useEffect(() => {
    // Get the last shown quote index from localStorage
    const lastQuoteIndex = localStorage.getItem('lastQuoteIndex')
    const lastVisitDate = localStorage.getItem('lastVisitDate')
    const today = new Date().toDateString()
    
    let quoteIndex = 0
    
    // If it's a new day or first visit, show a new quote
    if (!lastVisitDate || lastVisitDate !== today) {
      // Generate a random quote index
      quoteIndex = Math.floor(Math.random() * quotes.length)
      localStorage.setItem('lastVisitDate', today)
    } else if (lastQuoteIndex !== null) {
      // If same day, cycle to next quote to ensure variety within the day
      quoteIndex = (parseInt(lastQuoteIndex) + 1) % quotes.length
    }
    
    // Update localStorage with current quote index
    localStorage.setItem('lastQuoteIndex', quoteIndex.toString())
    
    // Set the current quote
    setCurrentQuote(quotes[quoteIndex])
  }, [])

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Quote Card */}
          <div className="notebook-page p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute top-4 left-4 text-6xl text-highlight-blue dark:text-highlight-cyan">
                <Quote size={48} />
              </div>
              <div className="absolute bottom-4 right-4 text-6xl text-highlight-blue dark:text-highlight-cyan rotate-180">
                <Quote size={48} />
              </div>
            </div>

            {/* Quote content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <Quote className="text-highlight-blue dark:text-highlight-cyan mx-auto mb-6" size={32} />
              
              <blockquote className="font-handwriting text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6 italic">
                "{currentQuote.text}"
              </blockquote>
              
              <div className="flex items-center justify-center">
                <div className="h-px bg-gradient-to-r from-transparent via-highlight-blue dark:via-highlight-cyan to-transparent w-24 mr-4"></div>
                <cite className="font-notebook text-lg text-highlight-blue dark:text-highlight-cyan font-medium not-italic">
                  — {currentQuote.author}
                </cite>
                <div className="h-px bg-gradient-to-r from-transparent via-highlight-blue dark:via-highlight-cyan to-transparent w-24 ml-4"></div>
              </div>
            </motion.div>

            {/* Notebook spiral holes decoration */}
            <div className="absolute left-8 top-0 bottom-0 flex flex-col justify-evenly opacity-20">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border-2 border-gray-400 dark:border-gray-600"
                />
              ))}
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute -top-2 -right-2 bg-yellow-200 dark:bg-yellow-600 p-3 rounded-lg shadow-lg transform rotate-3 hidden md:block"
          >
            <p className="font-handwriting text-sm text-gray-800 dark:text-gray-900">
              Daily dose of inspiration! 💡
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuotesSection
