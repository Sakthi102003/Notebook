import { motion } from 'framer-motion'
import { Calendar, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaMedium } from 'react-icons/fa'

interface BlogPost {
  title: string
  link: string
  pubDate: string
  creator: string
  content: string
  categories: string[]
  guid: string
}

interface FlowingBlogPostsProps {
  count?: number
}

const FlowingBlogPosts = ({ count = 3 }: FlowingBlogPostsProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  // Fallback posts for demo purposes
  const fallbackPosts: BlogPost[] = [
    {
      title: "Building Secure Web Applications",
      link: "https://medium.com/@sakthimurugan102003",
      pubDate: "2024-12-15T10:00:00Z",
      creator: "Sakthi Murugan",
      content: "In this article, I explore the fundamentals of building secure web applications, covering essential security practices and common vulnerabilities...",
      categories: ["Security", "Development"],
      guid: "1"
    },
    {
      title: "ML in Cybersecurity: Detecting Phishing",
      link: "https://medium.com/@sakthimurugan102003",
      pubDate: "2024-12-10T14:30:00Z",
      creator: "Sakthi Murugan",
      content: "Exploring how machine learning algorithms can be leveraged to detect and prevent phishing attacks in real-time applications...",
      categories: ["ML", "Cybersecurity"],
      guid: "2"
    },
    {
      title: "React Performance Tips",
      link: "https://medium.com/@sakthimurugan102003",
      pubDate: "2024-12-05T09:15:00Z",
      creator: "Sakthi Murugan",
      content: "Performance is crucial for user experience. Here are practical techniques for optimizing React applications and improving load times...",
      categories: ["React", "Performance"],
      guid: "3"
    },
    {
      title: "Python Automation Scripts",
      link: "https://medium.com/@sakthimurugan102003",
      pubDate: "2024-11-28T16:45:00Z",
      creator: "Sakthi Murugan",
      content: "Automating repetitive tasks with Python can save hours of work. Let's explore some useful automation scripts for developers...",
      categories: ["Python", "Automation"],
      guid: "4"
    }
  ]

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@sakthimurugan102003/feed'
        )
        
        if (!response.ok) throw new Error('Failed to fetch posts')
        
        const data = await response.json()
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          setPosts(data.items.slice(0, count))
        } else {
          setPosts(fallbackPosts.slice(0, count))
        }
      } catch (err) {
        setPosts(fallbackPosts.slice(0, count))
        console.log('Using fallback posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMediumPosts()
  }, [count])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const extractContent = (htmlContent: string) => {
    const textContent = htmlContent.replace(/<[^>]*>/g, '')
    return textContent.length > 100 
      ? textContent.substring(0, 100) + '...'
      : textContent
  }

  if (loading) return null

  return (
    <>
      {posts.map((post, index) => (
        <motion.div
          key={post.guid}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotate: index % 2 === 0 ? -2 : 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: index % 2 === 0 ? -1 : 1 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.3,
            type: "spring",
            bounce: 0.3
          }}
          viewport={{ once: true, margin: "-100px" }}
          className={`my-16 ${index % 2 === 0 ? 'ml-4 mr-12' : 'ml-12 mr-4'} max-w-md mx-auto md:max-w-lg`}
        >
          {/* Floating blog post note */}
          <div className="sticky-note bg-yellow-200 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 shadow-sticky-note rounded-sm p-6 transform hover:rotate-0 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <Calendar size={12} />
                <span className="font-handwriting">{formatDate(post.pubDate)}</span>
              </div>
              <FaMedium className="text-gray-500 dark:text-gray-400" size={16} />
            </div>

            <h3 className="font-notebook font-bold text-lg mb-3 text-gray-800 dark:text-gray-200 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 font-handwriting leading-relaxed">
              {extractContent(post.content)}
            </p>

            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {post.categories.slice(0, 2).map((category, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-yellow-100 dark:bg-yellow-800/50 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    #{category}
                  </span>
                ))}
              </div>
            )}

            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-highlight-blue dark:text-highlight-cyan hover:underline font-medium text-sm group"
            >
              <span className="font-handwriting">Read this note</span>
              <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Tape effect */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-white/50 dark:bg-gray-600/50 border border-gray-200 dark:border-gray-600 rounded-sm shadow-sm"></div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

export default FlowingBlogPosts
