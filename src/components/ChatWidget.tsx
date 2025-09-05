import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getChatResponse } from '../services/openai'

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
    text: "About Sakthi",
    action: () => {},
    fallbackResponse: "Cybersecurity enthusiast and developer who loves breaking down security challenges and turning ideas into real tools, with experience in Python, ML, and modern web tech; I enjoy experimenting, building, and constantly learning to stay ahead—always chasing growth in both cybersecurity and development."
  },
  { 
    text: "What technologies do you work with?", 
    action: () => {}, 
    fallbackResponse: `I specialize in:
- Frontend: React.js, TypeScript, Tailwind CSS, Socket.io, Chart.js
- Backend/ML: Flask, Django, SQL, NumPy
- Machine Learning & Security tools
- Operating Systems: Ubuntu, Kali Linux, CentOS`
  },
  { 
    text: "Tell me about your recent projects", 
    action: () => {}, 
    fallbackResponse: `Here are my recent projects:
1. Reposocope - GitHub analytics tool built with React
2. Phishield - ML-based phishing detection system
3. Tech IQ - AI-powered tech stack advisor
4. GuardianHash - File integrity monitoring tool`
  },
  { 
    text: "How can I contact you for work?", 
    action: () => {}, 
    fallbackResponse: `You can reach me through:
- Email: sakthimurugan102003@gmail.com
- GitHub: https://github.com/Sakthi102003
- LinkedIn: https://www.linkedin.com/in/sakthimurugan-s/
Or use the contact form in the Contact section.`
  }
]

const ChatWidget: React.FC = () => {
  // Don't render the chat widget if OpenAI API key is not available
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    return null
  }

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello, I'm Sakthi's Portfolio Assistant — how can I help you?",
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

  const renderQuickReplies = (messageIndex: number) => {
    // Show quick replies only for the very first bot message
    const isFirstBotMessage = messageIndex === 0 && messages[0]?.isBot
    if (!isFirstBotMessage) return null

    return (
      <>
        <div className="text-gray-500 dark:text-gray-400 text-sm mt-4 mb-2">Quick questions:</div>
        <div className="flex flex-col gap-2">
          {quickReplies.map((reply) => (
            <button
              key={reply.text}
              onClick={() => handleQuickReply(reply)}
              className="w-full px-4 py-3 rounded-lg text-left text-[15px] bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-[#2a2a2a] dark:text-gray-100 dark:hover:bg-[#333] transition-colors duration-200"
            >
              {reply.text}
            </button>
          ))}
        </div>
      </>
    )
  }

  // Convert any paragraph text into bullet points, unless it already contains bullet/numbered lists
  const ensureBulletPoints = (text: string) => {
    const hasBullets = /(^|\n)\s*[-•]\s+/m.test(text)
    const hasNumbers = /(^|\n)\s*\d+\.\s+/m.test(text)
    if (hasBullets || hasNumbers) return text

    // Split into sentences and make bullets
    const sentences = text
      .split(/(?<=[.!?])\s+(?=[A-Z0-9])/g)
      .map(s => s.trim())
      .filter(Boolean)

    if (sentences.length <= 1) return text // keep as-is if we can't reliably split

    return sentences.map(s => `- ${s}`).join('\n')
  }

  // Linkify URLs and emails in message text
  const renderTextWithLinks = (text: string) => {
    const pattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([\w.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/gi
    const nodes: (string | JSX.Element)[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = pattern.exec(text)) !== null) {
      const index = match.index
      if (index > lastIndex) {
        nodes.push(text.slice(lastIndex, index))
      }

      const [full, httpUrl, wwwUrl, email] = match
      if (httpUrl || wwwUrl) {
        const url = httpUrl || `https://${wwwUrl}`
        nodes.push(
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-highlight-blue dark:text-highlight-cyan underline hover:opacity-80"
          >
            {full}
          </a>
        )
      } else if (email) {
        nodes.push(
          <a
            key={index}
            href={`mailto:${email}`}
            className="text-highlight-blue dark:text-highlight-cyan underline hover:opacity-80"
          >
            {email}
          </a>
        )
      }

      lastIndex = index + full.length
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex))
    }

    return nodes
  }

  // Render message as bullet points or numbered list when applicable, otherwise preserve line breaks
  const renderMessageContent = (text: string) => {
    const allLines = text.split(/\r?\n/)
    const lines = allLines.filter(l => l.trim() !== '')

    const isBullet = (l: string) => /^\s*[-•]\s+/.test(l)
    const isNumbered = (l: string) => /^\s*\d+\.\s+/.test(l)

    const bulletCount = lines.filter(isBullet).length
    const numberCount = lines.filter(isNumbered).length

    // If most lines are bullets, render a UL
    if (bulletCount >= Math.max(2, numberCount)) {
      // Optional header line before bullets
      const header = lines.length > 0 && !isBullet(lines[0]) ? lines[0] : null
      const bulletLines = lines.filter(isBullet).map(l => l.replace(/^\s*[-•]\s+/, ''))

      return (
        <div className="space-y-2">
          {header && (
            <div className="mb-1 text-gray-800 dark:text-gray-100 text-[15px]">
              {renderTextWithLinks(header)}
            </div>
          )}
          <ul className="list-disc pl-5 space-y-1">
            {bulletLines.map((l, i) => (
              <li key={i} className="text-gray-800 dark:text-gray-100 text-[15px] leading-relaxed">
                {renderTextWithLinks(l)}
              </li>
            ))}
          </ul>
        </div>
      )
    }

    // If most lines are numbered, render an OL
    if (numberCount >= Math.max(2, bulletCount)) {
      const header = lines.length > 0 && !isNumbered(lines[0]) ? lines[0] : null
      const numberedLines = lines.filter(isNumbered).map(l => l.replace(/^\s*\d+\.\s+/, ''))

      return (
        <div className="space-y-2">
          {header && (
            <div className="mb-1 text-gray-800 dark:text-gray-100 text-[15px]">
              {renderTextWithLinks(header)}
            </div>
          )}
          <ol className="list-decimal pl-5 space-y-1">
            {numberedLines.map((l, i) => (
              <li key={i} className="text-gray-800 dark:text-gray-100 text-[15px] leading-relaxed">
                {renderTextWithLinks(l)}
              </li>
            ))}
          </ol>
        </div>
      )
    }

    // Default: preserve line breaks
    return (
      <p className="text-gray-800 dark:text-gray-100 text-[15px] leading-relaxed mb-1 whitespace-pre-line">
        {allLines.map((ln, idx) => (
          <span key={idx}>
            {renderTextWithLinks(ln)}
            {idx < allLines.length - 1 && <br />}
          </span>
        ))}
      </p>
    )
  }

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
      const processed = ensureBulletPoints(response)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: processed,
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error getting chat response:', error)

      // Local smart fallback based on the question
      const q = input.toLowerCase()
      let fallback = "I’m offline right now. Please try the quick questions or navigate through the sections."
      if (q.includes('technolog') || q.includes('stack') || q.includes('skills')) {
        fallback = quickReplies[0].fallbackResponse
      } else if (q.includes('project')) {
        fallback = quickReplies[1].fallbackResponse
      } else if (q.includes('contact') || q.includes('hire') || q.includes('reach')) {
        fallback = quickReplies[2].fallbackResponse
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: ensureBulletPoints(fallback),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      // Do not auto-navigate on free text either
      setIsTyping(false)
    }
  }

  const handleQuickReply = async (reply: QuickReply) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply.text,
      isBot: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      const responseText = await getChatResponse(reply.text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: ensureBulletPoints(responseText),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error getting chat response:', error)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: ensureBulletPoints(reply.fallbackResponse),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } finally {
      // Removed auto-navigation on quick replies as requested
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 mx-4 sm:mx-0 w-[calc(100vw-2rem)] sm:w-[380px] md:w-[400px] bg-white dark:bg-[#1f1f1f] overflow-hidden rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
          >
            {/* Chat Header */}
            <div className="bg-white dark:bg-[#1f1f1f] px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src="/images/red avatar.png"
                  alt="Assistant avatar"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <h3 className="text-gray-800 dark:text-gray-100 font-medium text-lg truncate">Portfolio Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="h-[60vh] md:h-96 overflow-y-auto p-4 bg-white dark:bg-[#1f1f1f] space-y-4">
              {messages.map((message, idx) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="max-w-[95%]">
                    {renderMessageContent(ensureBulletPoints(message.text))}
                    <span className="text-gray-500 dark:text-gray-500 text-xs">
                      {message.timestamp.toLocaleTimeString('en-US', { 
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </span>
                    {message.isBot && renderQuickReplies(idx)}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
                >
                  <span className="text-sm">Assistant is typing</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-white dark:bg-[#1f1f1f] border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me about my work and experience..."
                  className="flex-1 p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 focus:outline-none focus:border-blue-400 dark:focus:border-gray-600 text-[15px] placeholder-gray-500"
                  aria-label="Type your message"
                />
                <button
                  onClick={handleSend}
                  className="p-3 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-[#2a2a2a] dark:text-gray-100 dark:hover:bg-[#333] rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                  aria-label="Send message"
                  title="Send"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-gray-100 p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={22} />
      </motion.button>
    </div>
  )
}

export default ChatWidget
