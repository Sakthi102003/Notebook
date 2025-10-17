import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaMedium } from 'react-icons/fa'

interface BlogPost {
  title: string
  link: string
  pubDate: string
  content: string
}

const FlowingBlogRiver = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Add cache buster and timeout
        const timestamp = new Date().getTime()
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@sakthimurugan102003/feed&_cb=${timestamp}`,
          {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          }
        )
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts (${response.status})`)
        }
        
        const data = await response.json()
        
        if (data.status === 'ok' && data.items?.length > 0) {
          // Format and duplicate posts for infinite scroll effect
          const formattedPosts = data.items.slice(0, 5).map((item: any) => ({
            title: item.title || 'Untitled Post',
            link: item.link || 'https://medium.com/@sakthimurugan102003',
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            content: item.content ? item.content.replace(/<[^>]*>/g, '').substring(0, 70) + '...' : 'Check out this interesting article...'
          }))
          setPosts([...formattedPosts, ...formattedPosts]) // Duplicate for seamless loop
          setError(null)
        } else {
          throw new Error('No posts found')
        }
      } catch (error: any) {
        console.error('Error fetching posts:', error)
        setError(error.message || 'Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="relative py-12 overflow-hidden bg-gradient-to-r from-paper-50 via-blue-50 to-paper-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
      {/* Flowing river background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          className="w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 0% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center space-x-3 mb-4"
        >
          <FaMedium className="text-highlight-blue dark:text-highlight-cyan" size={24} />
          <h3 className="font-notebook text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
            From My Digital Inkwell
          </h3>
          <div className="w-6 md:w-8 h-0.5 bg-highlight-blue dark:bg-highlight-cyan"></div>
        </motion.div>
        <p className="font-handwriting text-base md:text-lg text-gray-600 dark:text-gray-300">
          Thoughts flowing like a gentle stream 📝
        </p>
      </div>

      {/* Flowing blog posts container */}
      <div className="relative overflow-hidden">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-highlight-blue dark:border-highlight-cyan"></div>
            <p className="mt-4 font-handwriting text-gray-600 dark:text-gray-300">Loading latest posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="font-handwriting text-gray-600 dark:text-gray-300">{error} 📝</p>
            <a 
              href="https://medium.com/@sakthimurugan102003" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-highlight-blue dark:text-highlight-cyan hover:underline mt-2 inline-block"
            >
              Visit my Medium profile →
            </a>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-handwriting text-gray-600 dark:text-gray-300">No posts available yet. Check back soon! ✍️</p>
          </div>
        ) : (
          <div className="flex space-x-4 md:space-x-6 animate-flow">
          {posts.map((post, index) => (
            <motion.div
              key={`${post.title}-${index}`}
              className="flex-shrink-0 w-72 md:w-80 group"
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 border-highlight-blue dark:border-highlight-cyan p-4 md:p-6 h-36 md:h-40 flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:border-l-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {post.pubDate}
                  </span>
                  <FaMedium className="text-gray-400 group-hover:text-highlight-blue dark:group-hover:text-highlight-cyan transition-colors flex-shrink-0" size={14} />
                </div>
                
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block flex-1 min-h-0"
                >
                  <h4 className="font-notebook font-bold text-sm md:text-base mb-2 text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-highlight-blue dark:group-hover:text-highlight-cyan transition-colors leading-tight cursor-pointer">
                    {post.title}
                  </h4>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-handwriting leading-relaxed line-clamp-3 overflow-hidden">
                    {post.content}
                  </p>
                </a>
              </div>
            </motion.div>
          ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-8 relative z-10 px-4">
        <motion.a
          href="https://medium.com/@sakthimurugan102003"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 bg-highlight-blue dark:bg-highlight-cyan text-white dark:text-gray-900 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
        >
          <FaMedium size={16} />
          <span>Follow the Stream</span>
        </motion.a>
      </div>
    </div>
  )
}

export default FlowingBlogRiver
