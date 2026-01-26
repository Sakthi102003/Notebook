import { Github, Linkedin, Mail, Monitor, Instagram } from 'lucide-react'
import { SiMedium } from 'react-icons/si'
import ContactForm from './ContactForm'

export default function SignalTransmission() {
    return (
        <section id="contact" className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4">
                    <span className="text-crimson font-mono opacity-50">05.</span> SIGNAL_TRANSMISSION
                </h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-crimson/30 to-transparent" />
            </div>

            <div className="stealth-card p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Monitor size={120} />
                </div>

                <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white uppercase tracking-widest">Command Center</h3>
                            <div className="glow-line-blue w-20" />
                            <p className="text-gray-400 font-mono text-sm leading-relaxed uppercase tracking-tighter">
                                Encrypted channel open for reconnaissance and collaboration.
                                Initiating mission briefing for potential partners.
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-green-500 uppercase tracking-widest bg-green-500/5 border border-green-500/20 px-3 py-1.5 w-fit">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                FREELANCE PROTOCOL: ACTIVE
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Mail, label: 'RELAY', value: 'sakthimurugan102003@gmail.com', href: 'mailto:sakthimurugan102003@gmail.com' },
                                { icon: Github, label: 'SIGNAL', value: 'github.com/Sakthi102003', href: 'https://github.com/Sakthi102003' },
                                { icon: Linkedin, label: 'NETWORK', value: 'linkedin.com/in/sakthimurugan-s', href: 'https://www.linkedin.com/in/sakthimurugan-s/' },
                                { icon: Instagram, label: 'VISUAL', value: 'instagram.com/sakthiii_techh', href: 'https://www.instagram.com/sakthiii_techh/' },
                                { icon: SiMedium, label: 'LOGS', value: 'medium.com/@sakthimurugan102003', href: 'https://medium.com/@sakthimurugan102003' }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-6 group">
                                    <div className="p-3 bg-white/5 border border-white/10 group-hover:border-electric-blue group-hover:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all">
                                        <item.icon size={20} className="text-gray-600 group-hover:text-electric-blue transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase mb-1">{item.label}</span>
                                        <a href={item.href} className="text-sm text-gray-300 hover:text-white font-mono uppercase tracking-tighter transition-colors">
                                            {item.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-stealth-900/50 p-8 border border-white/5">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}
