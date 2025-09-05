import { motion } from 'framer-motion'
import { BookOpen, Calendar, ExternalLink, FileText } from 'lucide-react'
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

const MediumBlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  // Fallback posts for demo purposes
  const fallbackPosts: BlogPost[] = [
    {
      title: "Building Secure Web Applications: A Developer's Journey",
      link: "https://medium.com/@sakthimurugan102003",
      pubDate: "2024-12-15T10:00:00Z",
      creator: "Sakthi Murugan",
      content: "In this article, I explore the fundamentals of building secure web applications, covering essential security practices, common vulnerabilities, and how to implement proper authentication and authorization mechanisms...",
      categories: ["Web Security", "Development", "Best Practices"],
      guid: "1"
    },
    {
      title: "Machine Learning in Cybersecurity: Detecting Phishing Attacks",
      link: "https://medium.com/@sakthimurugan102003",
      pubDate: "2024-12-10T14:30:00Z",
      creator: "Sakthi Murugan",
      content: "Exploring how machine learning algorithms can be leveraged to detect and prevent phishing attacks. We'll dive into feature engineering, model selection, and real-world implementation strategies...",
      categories: ["Machine Learning", "Cybersecurity", "Python"],
      guid: "2"
    },
    {
      title: "React Performance Optimization: Tips from the Trenches",
      link: "https://medium.com/@sakthimurugan102003",
      pubDate: "2024-12-05T09:15:00Z",
      creator: "Sakthi Murugan",
      content: "Performance is crucial for user experience. In this comprehensive guide, I share practical techniques for optimizing React applications, from component optimization to bundle size reduction...",
      categories: ["React", "Performance", "Frontend"],
      guid: "3"
    }
  ]

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        // Using RSS2JSON service to fetch Medium RSS feed
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@sakthimurugan102003/feed'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        
        const data = await response.json()
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          setPosts(data.items.slice(0, 6)) // Show latest 6 posts
        } else {
          // Use fallback posts if no articles are found or RSS fails
          setPosts(fallbackPosts)
        }
      } catch (err) {
        // Use fallback posts if fetch fails
        setPosts(fallbackPosts)
        console.log('Using fallback posts due to RSS fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMediumPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const extractContent = (htmlContent: string) => {
    // Remove HTML tags and get first 150 characters
    const textContent = htmlContent.replace(/<[^>]*>/g, '')
    return textContent.length > 150 
      ? textContent.substring(0, 150) + '...'
      : textContent
  }

  return (
    <section id="blog" className="py-20 md:py-28 bg-gradient-to-br from-paper-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="notebook-page p-8 md:p-12"
        >
          <div className="flex items-center justify-center mb-8">
            <FaMedium className="text-highlight-blue dark:text-highlight-cyan mr-3" size={32} />
            <h2 className="text-4xl font-notebook font-bold">Digital Inkwell</h2>
            <FileText className="text-highlight-blue dark:text-highlight-cyan ml-3" size={32} />
          </div>

          <div className="text-center mb-12">
            <p className="font-handwriting text-xl text-gray-600 dark:text-gray-300 mb-4">
              My thoughts, experiments, and discoveries scribbled down for the world to read ✍️
            </p>
            <a
              href="https://medium.com/@sakthimurugan102003"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-highlight-blue dark:text-highlight-cyan hover:underline font-medium"
            >
              <span>Follow me on Medium</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-highlight-blue dark:border-highlight-cyan"></div>
              <p className="mt-4 font-handwriting text-lg">Loading latest articles...</p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.article
                  key={post.guid}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-highlight-blue dark:border-highlight-cyan overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar size={14} />
                      <span>{formatDate(post.pubDate)}</span>
                    </div>

                    <h3 className="font-notebook font-bold text-lg mb-3 text-gray-800 dark:text-gray-200 group-hover:text-highlight-blue dark:group-hover:text-highlight-cyan transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 font-handwriting leading-relaxed">
                      {extractContent(post.content)}
                    </p>

                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.slice(0, 3).map((category, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-highlight-blue dark:text-highlight-cyan hover:underline font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors"
                    >
                      <BookOpen size={14} />
                      <span>Read Article</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="font-handwriting text-lg text-gray-600 dark:text-gray-300 mb-4">
                No articles found, but I'm always writing something new!
              </p>
              <a
                href="https://medium.com/@sakthimurugan102003"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-highlight-blue dark:bg-highlight-cyan text-white dark:text-gray-900 px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <FaMedium size={20} />
                <span>Check Medium Profile</span>
              </a>
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="https://medium.com/@sakthimurugan102003"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-highlight-blue to-blue-600 dark:from-highlight-cyan dark:to-cyan-500 text-white dark:text-gray-900 px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <FaMedium size={20} />
              <span>Read More Articles</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MediumBlogSection
