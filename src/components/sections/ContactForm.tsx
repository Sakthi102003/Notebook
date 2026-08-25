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
          message: 'Thanks! Your message has been received.'
        })
        const form = e.currentTarget
        if (form) {
          setTimeout(() => form.reset(), 100)
        }
      } else {
        setStatus({
          type: 'error',
          message: 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
          message: 'I couldn’t send that message. Please check your connection and try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--accent-cyan)' }}>Your name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full p-4 rounded-xl transition-all font-mono uppercase text-xs"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-soft)', color: 'var(--text-primary)' }}
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--accent-cyan)' }}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full p-4 rounded-xl transition-all font-mono uppercase text-xs"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-soft)', color: 'var(--text-primary)' }}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--accent-cyan)' }}>Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full p-4 rounded-xl transition-all font-mono uppercase text-xs resize-none"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-soft)', color: 'var(--text-primary)' }}
          placeholder="How can I help?"
        />
      </div>

      {status && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-[10px] font-mono p-3 border rounded-xl ${status.type === 'success'
            ? 'text-green-500 border-green-500/20 bg-green-500/10'
            : 'text-red-500 border-red-500/20 bg-red-500/10'
            }`}
        >
          {status.message.toUpperCase()}
        </motion.div>
      )}

      <motion.button
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        type="submit"
        className="w-full btn-primary rounded-xl justify-center py-4 text-xs disabled:opacity-50"
      >
        <Send size={16} />
          <span>{loading ? 'Sending...' : 'Send message'}</span>
      </motion.button>
    </form>
  )
}
