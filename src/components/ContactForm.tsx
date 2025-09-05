import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useRef, useState } from 'react'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({ type: 'error', message: 'Email service is not configured. Please set env variables.' })
      return
    }

    const form = formRef.current
    if (!form) return

    setLoading(true)
    try {
      const result = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY })
      if (result.status === 200) {
        setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you soon.' })
        form.reset()
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6" aria-describedby="contact-form-status">
      <div>
        <label htmlFor="user_name" className="block font-notebook font-medium mb-2">Name</label>
        <input
          id="user_name"
          name="user_name"
          type="text"
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:border-highlight-blue dark:focus:border-highlight-cyan focus:outline-none transition-colors"
          placeholder="Your awesome name"
        />
      </div>

      <div>
        <label htmlFor="user_email" className="block font-notebook font-medium mb-2">Email</label>
        <input
          id="user_email"
          name="user_email"
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
