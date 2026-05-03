import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  Maximize,
  Box,
  Grid,
  Package,
  UserCircle,
  Mail,
  Terminal,
  ChevronRight,
  Code2,
  Server,
  Database,
  Layout,
  BrainCircuit,
  BoxSelect,
  ShieldAlert,
  Activity,
  Phone,
  Link as LinkIcon,
  Github,
  Linkedin
} from 'lucide-react';
import { projects } from '../data/projects';
import ThemeToggle from '../components/ui/ThemeToggle';
import { skills } from '../data/techStack';

export default function CorporateDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Medium Posts for Intelligence Tab
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@sakthimurugan102003/feed`);
        const data = await response.json();
        if (data.status === 'ok') {
          const formattedPosts = data.items.slice(0, 6).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            content: item.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
          }));
          setPosts(formattedPosts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  });

  const navItems = [
    { id: 'overview', label: 'OVERVIEW', subLabel: 'DASHBOARD', icon: Box },
    { id: 'capabilities', label: 'CAPABILITIES', subLabel: 'MATRIX', icon: Grid },
    { id: 'assets', label: 'ASSETS', subLabel: 'PROJECTS', icon: Package },
    { id: 'intelligence', label: 'INTELLIGENCE', subLabel: 'RESEARCH LOG', icon: BrainCircuit },
    { id: 'identity', label: 'IDENTITY', subLabel: 'PROFILE', icon: UserCircle },
    { id: 'contact', label: 'CONTACT', subLabel: 'CHANNEL', icon: Mail },
    { id: 'terminal', label: 'TERMINAL', subLabel: 'ACCESS', icon: Terminal },
  ];

  return (
    <div className="flex h-screen bg-[#f5f5f7] text-[#0a0a0b] font-inter overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-[#e8e8ec] flex-col z-20">
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-[#e8e8ec]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-sm transform rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 bg-white transform -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}></div>
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-widest text-[#0a0a0b]">PORTFOLIO.SYSTEM</h1>
              <p className="text-[9px] text-[#9ca3af] tracking-widest uppercase">Secure Access Interface</p>
            </div>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full ml-auto animate-pulse"></div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 relative transition-colors ${
                  isActive ? 'bg-[#f8f8fa]' : 'hover:bg-[#f8f8fa]'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                )}
                <item.icon size={20} className={isActive ? 'text-red-500' : 'text-[#9ca3af]'} />
                <div className="text-left">
                  <div className={`text-xs font-bold tracking-widest ${isActive ? 'text-[#0a0a0b]' : 'text-[#4b5563]'}`}>
                    {item.label}
                  </div>
                  <div className="text-[10px] text-[#9ca3af] tracking-wider mt-0.5">{item.subLabel}</div>
                </div>
                {isActive && <div className="ml-auto w-1.5 h-1.5 bg-red-500 rounded-full"></div>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Status */}
        <div className="p-6 border-t border-[#e8e8ec]">
          <div className="mb-4">
            <div className="text-[10px] text-[#9ca3af] tracking-widest mb-1">SYSTEM STATUS</div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00e5ff]">
              SECURE <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#9ca3af] tracking-widest mb-1">LAST SYNC</div>
            <div className="text-xs font-mono text-[#00e5ff]">
              {currentTime.toLocaleString('en-US', { 
                month: 'short', 
                day: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: false
              }).toUpperCase()}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-[#e8e8ec] flex items-center justify-between md:justify-end px-4 md:px-8 z-10">

          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="text-[#0a0a0b]">
              <Menu size={24} />
            </button>
            <div className="w-6 h-6 bg-red-500 rounded-sm transform rotate-45 flex items-center justify-center">
              <div className="w-3 h-3 bg-white transform -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}></div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-4 md:border-r md:border-[#e8e8ec] md:pr-8">
               <ThemeToggle />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] text-[#9ca3af] tracking-widest mb-0.5">CLEARANCE LEVEL</div>
                <div className="text-xs font-bold text-red-500 tracking-wider">RED / LEVEL 7</div>
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-red-500"></div>
                <div className="w-1 h-3 bg-red-500"></div>
                <div className="w-1 h-3 bg-red-500 opacity-50"></div>
                <div className="w-1 h-3 bg-red-500 opacity-20"></div>
              </div>
            </div>
            <button className="hidden md:flex w-10 h-10 border border-[#e8e8ec] rounded-md items-center justify-center text-[#4b5563] hover:text-[#0a0a0b] hover:bg-[#f8f8fa] transition-colors">
              <Maximize size={18} />
            </button>
          </div>
        </header>

        {/* Scrollable Dashboard */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {/* Background decorative elements */}
           <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#e8e8ec 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5 }}></div>

          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            {activeTab === 'overview' && (
              <>
                {/* Top Row: Welcome & Badge */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Welcome Card */}
                  <div className="xl:col-span-2 bg-white rounded-xl border border-[#e8e8ec] p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
                    
                    <div className="text-[10px] font-bold text-red-500 tracking-widest mb-4">WELCOME, AGENT</div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#0a0a0b] mb-4 flex items-center gap-2 sm:gap-4">
                      SAKTHIMURUGAN S <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-sm flex-shrink-0"></div>
                    </h2>
                    <div className="text-sm font-bold tracking-widest text-[#4b5563] mb-8">DEV & SECURITY ENTHUSIAST</div>
                    
                    <p className="text-sm font-mono text-[#9ca3af] mb-12 uppercase tracking-wider">
                      &gt; Specializing in razor-sharp web experiences. Focused on security research.
                    </p>

                    <div className="flex items-center gap-12 mt-auto">
                      <div>
                        <div className="text-[10px] text-[#9ca3af] tracking-widest mb-1">CLEARANCE STATUS</div>
                        <div className="text-xs font-bold text-[#00e5ff] flex items-center gap-2">VERIFIED <div className="w-1.5 h-1.5 bg-[#00e5ff]"></div></div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#9ca3af] tracking-widest mb-1">AGENT ID</div>
                        <div className="text-xs font-mono font-bold text-[#0a0a0b]">SM-10X-03</div>
                        <div className="h-1 w-full bg-[#e8e8ec] mt-1 flex">
                          <div className="w-1/3 bg-[#9ca3af]"></div>
                          <div className="w-1/6 bg-transparent"></div>
                          <div className="w-1/2 bg-[#9ca3af]"></div>
                        </div>
                      </div>
                    </div>

                    {/* City background illustration placeholder */}
                    <div className="absolute right-0 bottom-0 w-2/3 h-4/5 pointer-events-none opacity-20" style={{ background: 'linear-gradient(to right, transparent, #e8e8ec)' }}>
                      {/* In a real scenario, this would be an SVG or image of the futuristic city */}
                    </div>
                  </div>

                  {/* Identity Badge */}
                  <div className="bg-white rounded-xl border border-[#e8e8ec] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-2 h-2 bg-red-500"></div>
                      <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">DIGITAL IDENTITY BADGE</div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-32 h-40 relative rounded-lg overflow-hidden border-2 border-transparent group mx-auto sm:mx-0 flex-shrink-0">
                        <div className="absolute inset-0 border-2 border-red-500 opacity-50 z-10" style={{ clipPath: 'polygon(0 0, 20% 0, 20% 5%, 5% 5%, 5% 20%, 0 20%, 0 100%, 100% 100%, 100% 0)' }}></div>
                        <img src="/images/blue avatar.png" alt="Profile" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-[#00e5ff] mix-blend-overlay opacity-20"></div>
                        {/* Corner accents */}
                        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red-500 z-20"></div>
                        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-500 z-20"></div>
                        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-500 z-20"></div>
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red-500 z-20"></div>
                      </div>

                      <div className="flex-1 pt-2">
                        <h3 className="text-xl font-bold tracking-tight text-[#0a0a0b] flex items-center gap-2 mb-1">
                          SAKTHI <div className="w-1.5 h-1.5 bg-red-500 rounded-sm"></div>
                        </h3>
                        <div className="text-[9px] font-bold tracking-widest text-[#4b5563] mb-4">SECURITY RESEARCHER</div>
                        
                        <div className="inline-block px-2 py-0.5 border border-red-500 text-red-500 text-[8px] tracking-widest font-bold mb-4 bg-red-50">
                          LEVEL 7 CLEARANCE
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-[#e8e8ec] pb-1">
                            <span className="text-[9px] tracking-widest text-[#9ca3af]">AGENT ID</span>
                            <span className="text-[10px] font-mono text-[#0a0a0b]">SM-10X-03</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-[#e8e8ec] pb-1">
                            <span className="text-[9px] tracking-widest text-[#9ca3af]">DIVISION</span>
                            <span className="text-[10px] font-mono text-[#0a0a0b]">R&D / SECURITY</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-[#e8e8ec] pb-1">
                            <span className="text-[9px] tracking-widest text-[#9ca3af]">LOCATION</span>
                            <span className="text-[10px] font-mono text-[#0a0a0b]">INDIA / TN</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] tracking-widest text-[#9ca3af]">STATUS</span>
                            <span className="text-[10px] font-mono text-[#00e5ff] flex items-center gap-1">ACTIVE <div className="w-1 h-1 bg-[#00e5ff]"></div></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#e8e8ec] flex items-center justify-center text-[#00e5ff]">
                          <Activity size={14} />
                        </div>
                        <div>
                          <div className="text-[9px] font-bold tracking-widest text-[#00e5ff]">BIOMETRIC VERIFIED</div>
                          <div className="text-[8px] font-mono text-[#9ca3af]">LAST VERIFIED: MAY 15, 2025</div>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-[#f8f8fa] border border-[#e8e8ec] p-1 grid grid-cols-3 grid-rows-3 gap-0.5">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className={`bg-[#4b5563] ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-20'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Row: Matrix & Snapshot */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Capability Matrix */}
                  <div className="xl:col-span-2 bg-white rounded-xl border border-[#e8e8ec] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500"></div>
                        <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">CORPORATE CAPABILITY MATRIX</div>
                      </div>
                      <button onClick={() => setActiveTab('capabilities')} className="text-[10px] font-bold tracking-widest text-[#9ca3af] hover:text-[#0a0a0b] flex items-center gap-1 transition-colors">
                        VIEW FULL MATRIX <ChevronRight size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { title: 'FRONTEND', desc: 'REACT, TYPESCRIPT, TAILWIND', val: 95, icon: Code2 },
                        { title: 'BACKEND', desc: 'PYTHON, FLASK, NODE.JS', val: 90, icon: Server },
                        { title: 'SYSTEM DESIGN', desc: 'ARCHITECTURE, SCALABILITY', val: 88, icon: Layout },
                        { title: 'SECURITY', desc: 'PENETRATION TESTING, RESEARCH', val: 92, icon: ShieldAlert },
                        { title: 'DATABASE', desc: 'SQL, FIREBASE', val: 85, icon: Database },
                        { title: 'PROBLEM SOLVING', desc: 'ALGORITHMS, DSA', val: 92, icon: BrainCircuit },
                      ].map((skill, idx) => (
                        <div key={idx} className="bg-[#f8f8fa] border border-[#e8e8ec] rounded-lg p-4 relative group hover:border-[#00e5ff] transition-colors">
                          <div className="flex items-start gap-4 mb-4">
                            <skill.icon size={24} className="text-[#9ca3af] group-hover:text-[#00e5ff] transition-colors" />
                            <div>
                              <div className="text-xs font-bold tracking-widest text-[#0a0a0b] mb-1">{skill.title}</div>
                              <div className="text-[9px] font-mono text-[#9ca3af]">{skill.desc}</div>
                            </div>
                          </div>
                          <div className="flex items-end justify-between">
                            <div className="text-lg font-bold text-[#0a0a0b]">{skill.val}%</div>
                            <div className="w-3/4">
                              <div className="h-1 w-full bg-[#e8e8ec] rounded-full overflow-hidden flex items-center justify-end relative">
                                <div className="absolute left-0 top-0 bottom-0 bg-red-500" style={{ width: `${skill.val}%` }}></div>
                                <div className="text-[6px] font-mono text-[#9ca3af] mr-1 relative z-10 bg-white px-1">Lvl</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agent Snapshot */}
                  <div className="bg-white rounded-xl border border-[#e8e8ec] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-2 h-2 bg-red-500"></div>
                      <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">AGENT SNAPSHOT</div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 flex-1">
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="text-[9px] tracking-widest text-[#9ca3af] mb-1">DEPLOYMENTS</div>
                          <div className="text-3xl font-bold text-[#0a0a0b]">{projects.length}</div>
                          <div className="text-[9px] tracking-widest text-[#9ca3af]">COMPLETED</div>
                        </div>
                        <BoxSelect size={18} className="text-[#00e5ff] mt-2" />
                      </div>
                      
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="text-[9px] tracking-widest text-[#9ca3af] mb-1">SYSTEM UPTIME</div>
                          <div className="text-3xl font-bold text-[#0a0a0b]">100%</div>
                          <div className="text-[9px] tracking-widest text-[#9ca3af]">RELIABILITY</div>
                        </div>
                        <Activity size={18} className="text-[#00e5ff] mt-2" />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="text-[9px] tracking-widest text-[#9ca3af] mb-1">CODE EFFICIENCY</div>
                          <div className="text-3xl font-bold text-[#0a0a0b]">97%</div>
                          <div className="text-[9px] tracking-widest text-[#9ca3af]">OPTIMIZED</div>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-[#00e5ff] mt-2 relative">
                          <div className="absolute inset-0 border-t-2 border-transparent rounded-full transform -rotate-45"></div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="text-[9px] tracking-widest text-[#9ca3af] mb-1">THREAT LEVEL</div>
                          <div className="text-3xl font-bold text-[#0a0a0b]">LOW</div>
                          <div className="text-[9px] tracking-widest text-[#9ca3af]">RISK STATUS</div>
                        </div>
                        <ShieldAlert size={18} className="text-[#00e5ff] mt-2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Deployments & Comms */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-12">
                  {/* Deployments */}
                  <div className="xl:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500"></div>
                        <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">TRACKED DEPLOYMENTS</div>
                      </div>
                      <button onClick={() => setActiveTab('assets')} className="text-[10px] font-bold tracking-widest text-[#9ca3af] hover:text-[#0a0a0b] flex items-center gap-1 transition-colors">
                        ACCESS ALL ASSETS <ChevronRight size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {projects.slice(0,4).map((project, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-[#e8e8ec] p-4 flex flex-col h-48 group hover:border-[#00e5ff] transition-colors relative overflow-hidden">
                          {idx === 0 && <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>}
                          <div className="mb-auto">
                            <div className="text-[10px] font-bold tracking-widest text-[#0a0a0b] mb-1 truncate">{project.title}</div>
                            <div className="text-[8px] font-mono text-[#9ca3af] uppercase">{project.tech.slice(0,2).join(', ')}</div>
                          </div>
                          
                          {/* Placeholder for project thumbnail */}
                          <div className="h-16 bg-[#f8f8fa] rounded my-4 overflow-hidden border border-[#e8e8ec] group-hover:opacity-80 transition-opacity flex items-center justify-center">
                            <Code2 size={20} className="text-[#d1d5db]" />
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            <div>
                              <div className="text-[8px] tracking-widest text-[#9ca3af] mb-0.5">STATUS</div>
                              <div className="text-[9px] font-bold text-[#00e5ff] uppercase">{project.status === 'Completed' ? 'DEPLOYED' : 'ACTIVE'}</div>
                            </div>
                            <a href={project.demoLink || project.link} target="_blank" rel="noreferrer" className="w-6 h-6 rounded border border-[#e8e8ec] flex items-center justify-center text-[#9ca3af] group-hover:bg-[#00e5ff] group-hover:text-white group-hover:border-[#00e5ff] transition-all">
                              <LinkIcon size={10} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Secure Comms */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-2 h-2 bg-red-500"></div>
                      <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">SECURE COMMUNICATION CHANNEL</div>
                    </div>

                    <div className="bg-white rounded-xl border border-[#e8e8ec] shadow-sm overflow-hidden">
                      {[
                        { icon: Mail, title: 'EMAIL ENCRYPTED', val: 'sakthimurugan102003@gmail.com', href: 'mailto:sakthimurugan102003@gmail.com' },
                        { icon: Linkedin, title: 'LINKEDIN PROFILE', val: 'linkedin.com/in/sakthimurugan-s', href: 'https://www.linkedin.com/in/sakthimurugan-s/' },
                        { icon: Github, title: 'GITHUB REPOSITORY', val: 'github.com/Sakthi102003', href: 'https://github.com/Sakthi102003' },
                        { icon: Phone, title: 'DIRECT LINE', val: 'REQUEST VIA EMAIL', href: '#' },
                      ].map((contact, idx) => (
                        <a key={idx} href={contact.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 border-b border-[#e8e8ec] hover:bg-[#f8f8fa] transition-colors group">
                          <div className="w-8 h-8 rounded bg-[#f8f8fa] border border-[#e8e8ec] flex items-center justify-center text-[#4b5563] group-hover:text-[#00e5ff] group-hover:border-[#00e5ff] transition-colors">
                            <contact.icon size={14} />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="text-[10px] font-bold tracking-widest text-[#0a0a0b] truncate">{contact.title}</div>
                            <div className="text-[9px] font-mono text-[#9ca3af] truncate mt-0.5">{contact.val}</div>
                          </div>
                          <ChevronRight size={14} className="text-[#9ca3af] group-hover:text-[#0a0a0b] transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'capabilities' && (
              <div className="bg-white rounded-xl border border-[#e8e8ec] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 bg-red-500"></div>
                  <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">TECHNICAL CAPABILITY MATRIX</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="bg-[#f8f8fa] border border-[#e8e8ec] rounded-lg p-4 flex flex-col items-center justify-center gap-3 group hover:border-[#00e5ff] hover:bg-white transition-all shadow-sm">
                      <skill.icon size={28} className="text-[#9ca3af] group-hover:text-[#00e5ff] transition-colors" />
                      <div className="text-xs font-bold tracking-widest text-[#0a0a0b] text-center">{skill.name}</div>
                      <div className="w-full h-1 bg-[#e8e8ec] rounded-full overflow-hidden mt-2">
                         <div className="h-full bg-red-500" style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'assets' && (
              <div className="bg-white rounded-xl border border-[#e8e8ec] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 bg-red-500"></div>
                  <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">REGISTERED ASSETS & DEPLOYMENTS</div>
                </div>
                <div className="space-y-4">
                  {projects.map((project, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-6 p-6 border border-[#e8e8ec] rounded-lg hover:border-[#00e5ff] transition-colors group">
                      <div className="w-full md:w-48 h-32 bg-[#f8f8fa] border border-[#e8e8ec] rounded-md flex items-center justify-center flex-shrink-0">
                        <Code2 size={32} className="text-[#d1d5db]" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-[#0a0a0b] tracking-tight">{project.title}</h3>
                            <div className="text-[10px] font-bold text-[#00e5ff] uppercase px-2 py-1 bg-[#00e5ff]/10 rounded border border-[#00e5ff]/20">
                              {project.status || 'ACTIVE'}
                            </div>
                          </div>
                          <p className="text-sm text-[#4b5563] mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                              <span key={i} className="text-[10px] font-mono text-[#4b5563] bg-[#f8f8fa] border border-[#e8e8ec] px-2 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noreferrer" className="text-xs font-bold tracking-widest flex items-center gap-1 text-[#0a0a0b] hover:text-[#00e5ff] transition-colors">
                              <Github size={14} /> SOURCE
                            </a>
                          )}
                          {project.demoLink && (
                            <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-xs font-bold tracking-widest flex items-center gap-1 text-[#0a0a0b] hover:text-[#00e5ff] transition-colors">
                              <LinkIcon size={14} /> LIVE DEMO
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'intelligence' && (
              <div className="bg-white rounded-xl border border-[#e8e8ec] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500"></div>
                    <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">INTELLIGENCE & RESEARCH LOG</div>
                  </div>
                  <a href="https://medium.com/@sakthimurugan102003" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-widest text-[#9ca3af] hover:text-[#0a0a0b] flex items-center gap-1">
                    VIEW FULL ARCHIVE <ChevronRight size={12} />
                  </a>
                </div>
                
                {loadingPosts ? (
                  <div className="py-12 flex justify-center">
                    <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post, idx) => (
                      <a key={idx} href={post.link} target="_blank" rel="noreferrer" className="block p-6 border border-[#e8e8ec] rounded-lg hover:border-[#00e5ff] transition-colors group bg-[#f8f8fa] hover:bg-white">
                        <div className="text-[9px] font-mono text-[#9ca3af] mb-3 uppercase tracking-widest">{post.pubDate}</div>
                        <h4 className="text-sm font-bold text-[#0a0a0b] mb-2 leading-tight group-hover:text-[#00e5ff] transition-colors">{post.title}</h4>
                        <p className="text-xs text-[#4b5563] font-mono leading-relaxed">{post.content}</p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'identity' && (
              <div className="bg-white rounded-xl border border-[#e8e8ec] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 bg-red-500"></div>
                  <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">AGENT DOSSIER</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1 border-r border-[#e8e8ec] pr-8">
                    <div className="w-full aspect-square bg-[#f8f8fa] border border-[#e8e8ec] rounded-lg mb-6 overflow-hidden relative">
                       <img src="/images/blue avatar.png" alt="Profile" className="w-full h-full object-cover filter grayscale" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[#0a0a0b] mb-1">SAKTHIMURUGAN S</h3>
                    <div className="text-[10px] font-bold tracking-widest text-red-500 mb-6">SECURITY RESEARCHER & DEVELOPER</div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-[9px] tracking-widest text-[#9ca3af] mb-1">CLEARANCE</div>
                        <div className="text-xs font-mono text-[#0a0a0b]">LEVEL 7 / RED</div>
                      </div>
                      <div>
                        <div className="text-[9px] tracking-widest text-[#9ca3af] mb-1">LOCATION</div>
                        <div className="text-xs font-mono text-[#0a0a0b]">COIMBATORE, INDIA</div>
                      </div>
                      <div>
                        <div className="text-[9px] tracking-widest text-[#9ca3af] mb-1">STATUS</div>
                        <div className="text-xs font-mono text-[#00e5ff]">OPEN TO DEPLOYMENT</div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-[#0a0a0b] mb-3 border-b border-[#e8e8ec] pb-2">MISSION OBJECTIVE</h4>
                      <p className="text-sm text-[#4b5563] leading-relaxed">
                        Turning complex problems into elegant, secure codebases. Developing real-world projects powered by Python, ML, and React. Turning messy ideas into tactical tools that behave under pressure.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-[#0a0a0b] mb-3 border-b border-[#e8e8ec] pb-2">BACKGROUND CHECK</h4>
                      <p className="text-sm text-[#4b5563] leading-relaxed mb-4">
                        Cybersecurity researcher with a passion for modern web engineering. Currently investigating Machine Learning integration & Security outsmarting.
                      </p>
                      <p className="text-sm text-[#4b5563] leading-relaxed">
                        Staying ahead isn't just work—it's a favorite cure for boredom. Keeping this workspace full of experiments and breakthroughs.
                      </p>
                    </div>

                    <div className="bg-[#f8f8fa] border border-[#e8e8ec] p-6 rounded-lg">
                      <div className="text-[10px] font-bold tracking-widest text-[#9ca3af] mb-4">VERIFIED QUOTE LOG</div>
                      <div className="space-y-4 font-mono text-xs text-[#0a0a0b] border-l-2 border-red-500 pl-4">
                        <p>"There are two types of companies: those that have been hacked, and those that don't know they have been hacked." - Dmitri Alperovitch</p>
                        <p className="text-[#9ca3af]">"If you think technology can solve your security problems, then you don't understand the problems and you don't understand the technology." - Bruce Schneier</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="bg-white rounded-xl border border-[#e8e8ec] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 bg-red-500"></div>
                  <div className="text-[10px] font-bold tracking-widest text-[#4b5563]">OFFICIAL COMMUNICATION CHANNEL</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0a0a0b] tracking-tight mb-4">INITIATE SECURE TRANSMISSION</h3>
                    <p className="text-sm text-[#4b5563] mb-8">
                      For secure collaborations, contract work, or classified intelligence sharing. All messages are logged and monitored.
                    </p>
                    
                    <div className="space-y-6">
                      <a href="mailto:sakthimurugan102003@gmail.com" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-[#f8f8fa] border border-[#e8e8ec] rounded flex items-center justify-center text-[#4b5563] group-hover:text-red-500 transition-colors">
                          <Mail size={20} />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold tracking-widest text-[#9ca3af]">DIRECT EMAIL</div>
                          <div className="text-sm font-bold text-[#0a0a0b] group-hover:text-red-500 transition-colors">sakthimurugan102003@gmail.com</div>
                        </div>
                      </a>
                      
                      <a href="https://linkedin.com/in/sakthimurugan-s" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-[#f8f8fa] border border-[#e8e8ec] rounded flex items-center justify-center text-[#4b5563] group-hover:text-[#0077b5] transition-colors">
                          <Linkedin size={20} />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold tracking-widest text-[#9ca3af]">PROFESSIONAL NETWORK</div>
                          <div className="text-sm font-bold text-[#0a0a0b] group-hover:text-[#0077b5] transition-colors">linkedin.com/in/sakthimurugan-s</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-[#4b5563] mb-2">IDENTIFIER (NAME)</label>
                      <input type="text" className="w-full bg-[#f8f8fa] border border-[#e8e8ec] rounded p-3 text-sm focus:outline-none focus:border-[#00e5ff] transition-colors" placeholder="Agent Name" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-[#4b5563] mb-2">RETURN ADDRESS (EMAIL)</label>
                      <input type="email" className="w-full bg-[#f8f8fa] border border-[#e8e8ec] rounded p-3 text-sm focus:outline-none focus:border-[#00e5ff] transition-colors" placeholder="agent@division.com" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-[#4b5563] mb-2">ENCRYPTED PAYLOAD (MESSAGE)</label>
                      <textarea rows={4} className="w-full bg-[#f8f8fa] border border-[#e8e8ec] rounded p-3 text-sm focus:outline-none focus:border-[#00e5ff] transition-colors resize-none" placeholder="Enter transmission details..."></textarea>
                    </div>
                    <button type="button" className="w-full bg-red-500 text-white font-bold tracking-widest text-xs py-4 rounded hover:bg-red-600 transition-colors">
                      TRANSMIT DATA
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'terminal' && (
              <div className="bg-white rounded-xl border border-[#e8e8ec] p-8 shadow-sm">
                <h3 className="text-2xl font-bold tracking-widest text-[#0a0a0b] mb-4">ACCESS DENIED</h3>
                <p className="text-[#4b5563]">Terminal access requires LEVEL 9 clearance.</p>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#0a0a0b]/50 backdrop-blur-sm z-[90] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-64 bg-white border-r border-[#e8e8ec] z-[100] md:hidden flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-[#e8e8ec]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-sm transform rotate-45 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white transform -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}></div>
                  </div>
                  <h1 className="font-bold text-xs tracking-widest text-[#0a0a0b]">PORTFOLIO</h1>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-[#9ca3af] hover:text-[#0a0a0b]">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-4 px-6 py-4 relative transition-colors ${
                        isActive ? 'bg-[#f8f8fa]' : 'hover:bg-[#f8f8fa]'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                      )}
                      <item.icon size={20} className={isActive ? 'text-red-500' : 'text-[#9ca3af]'} />
                      <div className="text-left">
                        <div className={`text-xs font-bold tracking-widest ${isActive ? 'text-[#0a0a0b]' : 'text-[#4b5563]'}`}>
                          {item.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
