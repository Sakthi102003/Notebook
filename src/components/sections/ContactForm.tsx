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
          message: 'Transmission received. Signal stable.'
        })
        const form = e.currentTarget
        if (form) {
          setTimeout(() => form.reset(), 100)
        }
      } else {
        setStatus({
          type: 'error',
          message: 'Signal failure. Re-trying transmission.'
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Endpoint unreachable. Check network status.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-[10px] font-mono text-electric-blue uppercase tracking-[0.3em]">Identification</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full p-4 bg-stealth-900/50 border border-white/5 text-white focus:outline-none focus:border-electric-blue/50 transition-all font-mono uppercase text-xs"
          placeholder="Enter_Subject_Name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-[10px] font-mono text-electric-blue uppercase tracking-[0.3em]">Relay_Address</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full p-4 bg-stealth-900/50 border border-white/5 text-white focus:outline-none focus:border-electric-blue/50 transition-all font-mono uppercase text-xs"
          placeholder="Secure_Email_Channel"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-[10px] font-mono text-electric-blue uppercase tracking-[0.3em]">Payload_Description</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full p-4 bg-stealth-900/50 border border-white/5 text-white focus:outline-none focus:border-electric-blue/50 transition-all font-mono uppercase text-xs resize-none"
          placeholder="Detail_Mission_Objectives..."
        />
      </div>

      {status && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-[10px] font-mono p-3 border ${status.type === 'success'
            ? 'bg-electric-blue/10 border-electric-blue/20 text-electric-blue'
            : 'bg-crimson/10 border-crimson/20 text-crimson'
            }`}
        >
          {status.message.toUpperCase()}
        </motion.div>
      )}

      <motion.button
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        type="submit"
        className="w-full bg-electric-blue text-stealth-900 py-4 font-bold hover:shadow-[0_0_20px_#00E5FF] transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 uppercase tracking-[0.2em] text-xs"
      >
        <Send size={16} />
        <span>{loading ? 'Transmitting...' : 'Execute_Relay'}</span>
      </motion.button>
    </form>
  )
}
