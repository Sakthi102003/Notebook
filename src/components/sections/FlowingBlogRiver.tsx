import { useEffect, useState } from 'react'
import { FaMedium } from 'react-icons/fa'
import { Activity, Radio } from 'lucide-react'
import StealthCard from '../ui/StealthCard'

interface BlogPost {
  title: string
  link: string
  pubDate: string
  content: string
}

const FlowingBlogRiver = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@sakthimurugan102003/feed`)
        const data = await response.json()
        if (data.status === 'ok') {
          const formattedPosts = data.items.slice(0, 6).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            content: item.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
          }))
          setPosts([...formattedPosts, ...formattedPosts])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="py-12 bg-stealth-900 border-t border-b border-white/5 relative overflow-hidden">
      {/* Background Pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,229,255,0.05)_0%,transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold uppercase tracking-widest flex items-center gap-3 text-white">
            <Radio size={18} className="text-crimson animate-pulse" />
            INTEL_STREAM
          </h3>
          <div className="flex-1 h-[1px] bg-white/5" />
        </div>
      </div>

      <div className="relative">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-electric-blue border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="flex gap-6 animate-flow">
            {posts.map((post, i) => (
              <div key={i} className="w-80 shrink-0">
                <StealthCard className="p-6 h-48 group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-mono text-electric-blue/50 uppercase tracking-widest">{post.pubDate}</span>
                    <FaMedium className="text-gray-700 group-hover:text-white transition-colors" />
                  </div>
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="block cursor-none">
                    <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wide group-hover:text-electric-blue transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter line-clamp-3">
                      {post.content}
                    </p>
                  </a>
                </StealthCard>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 flex justify-center relative z-20">
        <a
          href="https://medium.com/@sakthimurugan102003"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-mono text-gray-400 hover:text-electric-blue uppercase tracking-[0.3em] transition-all flex items-center gap-2 cursor-pointer pointer-events-auto"
        >
          <Activity size={14} /> View_Full_Data_Stream
        </a>
      </div>
    </div>
  )
}

export default FlowingBlogRiver
