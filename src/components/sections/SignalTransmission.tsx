import { Github, Linkedin, Mail, Monitor, Instagram } from 'lucide-react'
import { SiMedium } from 'react-icons/si'
import ContactForm from './ContactForm'

export default function SignalTransmission() {
    return (
        <section id="contact" className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4" style={{ color: 'var(--text-primary)' }}>
                    <span className="font-mono opacity-50" style={{ color: 'var(--accent-cyan)' }}>05.</span> LET’S CONNECT
                </h2>
                <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), transparent)' }} />
            </div>

            <div className="portfolio-card p-12 relative overflow-hidden rounded-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Monitor size={120} />
                </div>

                <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>Start a conversation</h3>
                            <div className="glow-line-blue w-20" />
                            <p className="font-mono text-sm leading-relaxed uppercase tracking-tighter" style={{ color: 'var(--text-secondary)' }}>
                                Have an idea, a project, or simply want to say hello?
                                I’d love to hear from you.
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 w-fit rounded-full" style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', color: 'var(--accent-green)' }}>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                Available for freelance work
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Mail, label: 'EMAIL', value: 'sakthimurugan102003@gmail.com', href: 'mailto:sakthimurugan102003@gmail.com' },
                                { icon: Github, label: 'GITHUB', value: 'github.com/Sakthi102003', href: 'https://github.com/Sakthi102003' },
                                { icon: Linkedin, label: 'LINKEDIN', value: 'linkedin.com/in/sakthimurugan-s', href: 'https://www.linkedin.com/in/sakthimurugan-s/' },
                                { icon: Instagram, label: 'INSTAGRAM', value: 'instagram.com/sakthiii_techh', href: 'https://www.instagram.com/sakthiii_techh/' },
                                { icon: SiMedium, label: 'MEDIUM', value: 'medium.com/@sakthimurugan102003', href: 'https://medium.com/@sakthimurugan102003' }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-6 group">
                                    <div className="p-3 border rounded-xl transition-all" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                                        <item.icon size={20} style={{ color: 'var(--accent-cyan)' }} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-mono tracking-widest uppercase mb-1" style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                                        <a href={item.href} className="text-sm font-mono uppercase tracking-tighter transition-colors" style={{ color: 'var(--text-primary)' }}>
                                            {item.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 border rounded-2xl" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}
