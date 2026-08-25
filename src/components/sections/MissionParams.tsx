import { User, Zap } from 'lucide-react'

export default function MissionParams() {
    return (
        <section id="about" className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4" style={{ color: 'var(--text-primary)' }}>
                    <span className="font-mono opacity-50" style={{ color: 'var(--accent-cyan)' }}>01.</span> ABOUT ME
                </h2>
                <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), transparent)' }} />
            </div>

            <div className="flex flex-col gap-12 items-start">
                <div className="w-full space-y-8">
                    <div className="code-block text-sm leading-loose" style={{ color: 'var(--text-secondary)' }}>
                        <p className="mb-2"><span className="font-bold" style={{ color: 'var(--accent-red)' }}>What I enjoy:</span> Turning complex problems into elegant, secure codebases.</p>
                        <p className="mb-2"><span className="font-bold" style={{ color: 'var(--accent-cyan)' }}>My background:</span> Cybersecurity research and modern web engineering.</p>
                        <p className="mb-2"><span className="opacity-70">Currently exploring:</span> Machine learning, thoughtful products, and practical security.</p>
                        <p className="mb-2"><span className="font-bold" style={{ color: 'var(--accent-green)' }}>Availability:</span> Open to freelance work.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <User className="shrink-0 mt-1" size={20} style={{ color: 'var(--accent-cyan)' }} />
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Developing real-world projects powered by Python, ML, and React—turning messy ideas into useful tools.
                            </p>
                        </div>
                        <div className="flex items-start gap-4">
                            <Zap className="shrink-0 mt-1" size={20} style={{ color: 'var(--accent-red)' }} />
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Staying ahead isn't just work—it's a favorite cure for boredom. Keeping this workspace full of experiments and breakthroughs.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
