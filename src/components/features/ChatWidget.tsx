import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare, Send, X, Terminal, Activity } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getChatResponse } from '../../services/openai'
import { useGamification } from '../../utils/useGamification'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface QuickReply {
  text: string
  action: () => void
  fallbackResponse: string
}

const quickReplies: QuickReply[] = [
  {
    text: "Who is Sakthi?",
    action: () => { },
    fallbackResponse: "Software Engineer & Cybersecurity Enthusiast. Expert in Python, React, and building tactical digital solutions."
  },
  {
    text: "Tech Stack",
    action: () => { },
    fallbackResponse: "Core Architecture: React, TypeScript, Python, Django, Flask, Tailwind CSS. Security Environment: Kali Linux, Ubuntu."
  },
  {
    text: "Recent Operations",
    action: () => { },
    fallbackResponse: "Recent deployments: Reposocope (Analytics), Phishield (ML Detection), GuardianHash (Integrity Monitoring)."
  }
]

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { trackInteraction } = useGamification()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "RECON_ASSISTANT v2.0 READY. SECURE_CONNECTION ESTABLISHED. HOW CAN I ASSIST YOUR MISSION?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await getChatResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.toUpperCase(),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "SIGNAL_FAILURE. RE-TRYING CONNECTION...",
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-[400px] bg-stealth-900 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-stealth-800 border-b border-white/10 p-4 flex justify-between items-center bg-gradient-to-r from-stealth-800 to-stealth-900">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/images/blue avatar.png" className="w-8 h-8 border border-electric-blue/50" alt="Bot" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-electric-blue rounded-full animate-pulse shadow-[0_0_5px_#00E5FF]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">RECON_ASSISTANT</span>
                  <span className="text-[8px] text-electric-blue/60 font-mono uppercase">Status: Encrypted</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Terminate Connection"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-6 bg-stealth-900/50 flex flex-col no-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}>
                  <div className={`max-w-[85%] p-4 text-[11px] font-mono leading-relaxed transition-all ${msg.isBot
                    ? 'bg-stealth-800 border-l-2 border-electric-blue text-gray-300'
                    : 'bg-electric-blue/10 border-r-2 border-crimson text-white text-right'
                    }`}>
                    {msg.text}
                  </div>
                  <span className="text-[8px] text-white/20 mt-1 uppercase tracking-tighter">
                    {msg.timestamp.toLocaleTimeString([], { hour12: false })}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-[10px] text-electric-blue font-mono animate-pulse">
                  <Activity size={10} />
                  PROCESSING_STREAM...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && (
              <div className="p-4 bg-stealth-800/30 border-t border-white/5 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.text}
                    onClick={() => { setInput(reply.text); handleSend(); }}
                    className="text-[9px] font-mono border border-white/10 px-3 py-1.5 hover:border-electric-blue hover:text-electric-blue transition-all uppercase tracking-tighter"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-stealth-800 border-t border-white/10">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-white/20" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="EXECUTE_COMMAND..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono uppercase placeholder-white/20"
                />
                <button
                  onClick={handleSend}
                  className="p-2 text-electric-blue hover:text-white transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) trackInteraction('chat')
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-stealth-900 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-electric-blue hover:border-electric-blue transition-all group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />}
      </motion.button>
    </div>
  )
}

export default ChatWidget
