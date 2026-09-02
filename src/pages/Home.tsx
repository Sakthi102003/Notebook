import { useState, useEffect } from 'react';
import { SiX, SiLinkedin, SiGithub, SiGmail, SiDiscord } from 'react-icons/si';
import { projects } from '../data/projects';
import ThemeToggle from '../components/ui/ThemeToggle';
import LatestCommit from '../components/features/LatestCommit';
import GithubHeatmap from '../components/features/GithubHeatmap';
import ContactForm from '../components/sections/ContactForm';
import SkillsMarquee from '../components/sections/SkillsMarquee';
import WakatimeStats from '../components/features/WakatimeStats';
import VisitorCounter from '../components/features/VisitorCounter';
import FlowingBlogRiver from '../components/sections/FlowingBlogRiver';
import { useTheme } from '../components/features/ThemeProvider';
import { Mail, Github, Linkedin, Instagram, Monitor } from 'lucide-react';

// Components
const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-2 py-0.5 mx-1 font-mono text-[0.8rem] rounded-md transition-colors cursor-default" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}>
    {children}
  </span>
);

const Tag = ({ label }: { label: string }) => (
  <span className="inline-block px-2 py-0.5 text-[0.7rem] uppercase tracking-widest font-mono rounded-full" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}>
    {label}
  </span>
);

export default function Home() {
  const { theme } = useTheme();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [showWakatime, setShowWakatime] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@sakthimurugan102003/feed`);
        const data = await response.json();
        if (data.status === 'ok') {
          const formattedPosts = data.items.slice(0, 4).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            tag: item.categories?.[0] || 'writing'
          }));
          setBlogPosts(formattedPosts);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredProject = projects.find(p => p.title === 'OpenNote') || projects[0];
  const restProjects = projects.filter(p => p.title !== featuredProject.title);

  return (
    <div className="min-h-screen pb-32 transition-colors duration-500" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Header just for Theme Toggle */}
      <header className="fixed top-0 right-0 p-6 z-50">
        <ThemeToggle />
      </header>

      <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-24 space-y-32">
        {/* 1. HERO */}
        <section className="space-y-8 pt-10">
          
          {/* Avatar Feature */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 z-50">
            <img
              src={theme === 'dark' ? '/images/red avatar.png' : '/images/blue avatar.png'}
              alt="Sakthi"
              className="w-full h-full rounded-full border-2 shadow-2xl transition-all duration-500"
              style={{ borderColor: 'var(--border-subtle)' }}
            />
            <div
              onMouseEnter={() => setShowWakatime(true)}
              onMouseLeave={() => setShowWakatime(false)}
              className="absolute -bottom-1 -right-1 rounded-xl p-1.5 shadow-lg transition-colors cursor-pointer"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-soft)' }}
            >
              <img src="/images/vscode.png" alt="VS Code Stats" className="w-4 h-4 object-contain transition-transform hover:scale-110" />
            </div>

            {showWakatime && (
              <div
                className="absolute left-[-30px] top-[90px] z-[60] w-[min(90vw,440px)]"
                onMouseEnter={() => setShowWakatime(true)}
                onMouseLeave={() => setShowWakatime(false)}
              >
                <div
                  className="rounded-[18px] border p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.7)] backdrop-blur-sm"
                  style={{
                    background: theme === 'dark' ? 'rgba(10, 10, 10, 0.96)' : 'rgba(255, 255, 255, 0.96)',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
                    boxShadow: theme === 'dark'
                      ? '0 0 0 1px rgba(255,255,255,0.04), 0 12px 30px rgba(0,0,0,0.7)'
                      : '0 0 0 1px rgba(0,0,0,0.04), 0 12px 30px rgba(17,24,39,0.08)'
                  }}
                >
                  <WakatimeStats />
                </div>
              </div>
            )}
          </div>

          <div className="font-mono text-sm tracking-wide flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent)' }}>$</span> whoami
            <br className="hidden" />
            <span className="ml-2 block sm:inline mt-2 sm:mt-0 opacity-80">
              {'>'} Sakthimurugan S. Developer & security researcher.
              <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse align-middle" />
            </span>
          </div>

          <h1 className="font-display text-[2.8rem] sm:text-[5rem] md:text-[6.5rem] leading-[1.1] tracking-tight">
            Sakthimurugan S
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
            I turn ideas into friendly, useful web experiences with <Pill>TypeScript</Pill>, <Pill>React</Pill>, and <Pill>Tailwind</Pill>, and explore security research with <Pill>Python</Pill>, plus high-performance development.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button onClick={() => scrollTo('work')} className="px-6 py-3 font-mono text-sm uppercase tracking-widest font-bold transition-all hover:-translate-y-1" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
              ./view-work
            </button>
            <button onClick={() => scrollTo('contact')} className="px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all hover:-translate-y-1 hover:bg-white/5" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}>
              ./contact
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-x-12 md:gap-y-6 pt-8">
            <div className="flex flex-wrap gap-6">
              {[
                { icon: SiX, href: 'https://x.com/sakthimurugans_', label: 'X' },
                { icon: SiLinkedin, href: 'https://www.linkedin.com/in/sakthimurugan-s/', label: 'LinkedIn' },
                { icon: SiGithub, href: 'https://github.com/Sakthi102003', label: 'GitHub' },
                { icon: SiGmail, href: 'mailto:sakthimurugan102003@gmail.com', label: 'Email' },
                { icon: SiDiscord, href: 'https://discord.com/users/1074201854143123560', label: 'Discord' }
              ].map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity" title={social.label}>
                  <social.icon size={22} />
                </a>
              ))}
            </div>
            
            <div className="w-full sm:w-auto flex-grow max-w-full sm:max-w-[300px]">
              <LatestCommit isSmall />
            </div>
          </div>

        </section>

        {/* 2. WHAT I DO */}
        <section className="space-y-10">
          <h2 className="font-display text-4xl sm:text-5xl">What I Do</h2>
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            My work is a single continuous practice that moves naturally between creating robust full-stack applications and diving deep into security vulnerabilities. I build intuitive digital products using <Pill>React</Pill> and <Pill>TypeScript</Pill> on the frontend, while leveraging <Pill>FastAPI</Pill>, <Pill>Python</Pill>, and <Pill>MongoDB</Pill> to ensure backend performance and resilience. At the same time, I analyze threats, develop ML-based detection systems, and write secure code, ensuring that everything I deploy is as impenetrable as it is user-friendly.
          </p>
          <div className="w-full -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-0 pt-8">
            <SkillsMarquee />
          </div>
        </section>

        {/* 3. SELECTED WORK */}
        <section id="work" className="space-y-12">
          <h2 className="font-display text-4xl sm:text-5xl mb-12">Selected Work</h2>
          
          {/* Featured Project */}
          <div className="space-y-6 pb-12" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="font-display text-3xl sm:text-4xl">{featuredProject.title}</h3>
              <Tag label="full-stack" />
            </div>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {featuredProject.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {featuredProject.tech.map(t => (
                <span key={t} className="text-xs font-mono opacity-60">#{t}</span>
              ))}
            </div>
            <div className="pt-4">
              <a href={featuredProject.link} target="_blank" rel="noopener noreferrer" className="inline-block pb-1 font-mono text-sm uppercase tracking-widest transition-opacity hover:opacity-70" style={{ borderBottom: '1px solid var(--accent)', color: 'var(--accent)' }}>
                View case study
              </a>
            </div>
          </div>

          {/* Compact List */}
          <div className="flex flex-col">
            {restProjects.map((project) => (
              <div key={project.title} className="py-6 flex flex-col sm:flex-row sm:items-baseline gap-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="sm:w-1/3 flex flex-wrap items-center gap-3">
                  <h4 className="font-bold text-lg">{project.title}</h4>
                  <Tag label={['CyberTrench', 'Phishield', 'CyberBuddy', 'GuardianHash'].includes(project.title) ? 'security' : 'full-stack'} />
                </div>
                <div className="sm:w-2/3 space-y-3">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description.split('.')[0] + '.'}</p>
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0,3).map(t => (
                        <span key={t} className="text-[10px] font-mono opacity-50 uppercase">{t}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs font-mono uppercase tracking-widest hover:underline" style={{ color: 'var(--accent)' }}>
                      Source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WRITING */}
        <section className="space-y-10">
          <h2 className="font-display text-4xl sm:text-5xl">Writing</h2>
          <div className="flex flex-col">
            {blogPosts.map((post, i) => (
              <a key={i} href={post.link} target="_blank" rel="noopener noreferrer" className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-white/[0.02] -mx-4 px-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="flex flex-wrap items-center gap-4">
                  <h4 className="font-bold text-lg group-hover:underline">{post.title}</h4>
                  <Tag label={post.tag || 'security'} />
                </div>
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-right" style={{ color: 'var(--text-muted)' }}>
                  <span>{post.pubDate}</span>
                  <span className="opacity-50">&bull;</span>
                  <span>MEDIUM</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <div className="pt-8">
            <GithubHeatmap />
          </div>
        </section>

        {/* 5. CONTACT */}
        <section id="contact" className="space-y-10 pb-16">
          <h2 className="font-display text-4xl sm:text-5xl">Contact</h2>
          
          <div className="p-8 sm:p-12 relative overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Monitor size={120} />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h3 className="font-display text-2xl tracking-wide">Start a conversation</h3>
                        <p className="font-mono text-sm leading-relaxed uppercase tracking-tighter" style={{ color: 'var(--text-secondary)' }}>
                            Have an idea, a project, or simply want to say hello?
                            I'd love to hear from you.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 w-fit rounded-full" style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', color: 'var(--accent)' }}>
                            <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(226,163,61,0.4)] animate-pulse" style={{ background: 'var(--accent)' }} />
                            Available for freelance work
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { icon: Mail, label: 'EMAIL', value: 'sakthimurugan102003@gmail.com', href: 'mailto:sakthimurugan102003@gmail.com' },
                            { icon: Github, label: 'GITHUB', value: 'github.com/Sakthi102003', href: 'https://github.com/Sakthi102003' },
                            { icon: Linkedin, label: 'LINKEDIN', value: 'linkedin.com/in/sakthimurugan-s', href: 'https://www.linkedin.com/in/sakthimurugan-s/' },
                            { icon: Instagram, label: 'INSTAGRAM', value: 'instagram.com/sakthiii_techh', href: 'https://www.instagram.com/sakthiii_techh/' }
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-6 group">
                                <div className="p-3 rounded-xl transition-all" style={{ border: '1px solid var(--border-subtle)', color: 'var(--accent)' }}>
                                    <item.icon size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-mono tracking-widest uppercase mb-1" style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-mono uppercase tracking-tighter transition-colors hover:underline" style={{ color: 'var(--text)' }}>
                                        {item.value}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl" style={{ border: '1px solid var(--border-subtle)' }}>
                    <ContactForm />
                </div>
            </div>
          </div>
        </section>

        <div className="pb-8">
          <FlowingBlogRiver />
        </div>

        <div className="flex justify-center pb-16">
          <VisitorCounter />
        </div>
      </main>
    </div>
  );
}
