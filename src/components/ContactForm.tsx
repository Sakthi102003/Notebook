import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    // Add Web3Forms access key
    formData.append("access_key", WEB3FORMS_ACCESS_KEY)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setStatus({ 
          type: 'success', 
          message: 'Message sent successfully! I will get back to you soon. ✉️' 
        })
        // Safely reset form
        const form = e.currentTarget
        if (form) {
          setTimeout(() => form.reset(), 100)
        }
      } else {
        console.error("Form submission error:", data)
        setStatus({ 
          type: 'error', 
          message: data.message || 'Failed to send message. Please try again.' 
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" aria-describedby="contact-form-status">
      <div>
        <label htmlFor="name" className="block font-notebook font-medium mb-2">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:border-highlight-blue dark:focus:border-highlight-cyan focus:outline-none transition-colors"
          placeholder="Your awesome name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-notebook font-medium mb-2">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:border-highlight-blue dark:focus:border-highlight-cyan focus:outline-none transition-colors"
          placeholder="your.email@domain.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-notebook font-medium mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:border-highlight-blue dark:focus:border-highlight-cyan focus:outline-none transition-colors resize-none"
          placeholder="Tell me about your awesome project idea..."
        />
      </div>

      {status && (
        <div
          id="contact-form-status"
          role="status"
          aria-live="polite"
          className={`text-sm rounded-md p-3 ${
            status.type === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
              : status.type === 'error'
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
          }`}
        >
          {status.message}
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        disabled={loading}
        type="submit"
        className="w-full bg-highlight-blue dark:bg-highlight-cyan text-white dark:text-gray-900 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <Send size={20} />
        <span>{loading ? 'Sending...' : 'Send Message'}</span>
      </motion.button>
    </form>
  )
}
