import { User, Zap } from 'lucide-react'

export default function MissionParams() {
    return (
        <section id="about" className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4">
                    <span className="text-electric-blue font-mono opacity-50">01.</span> MISSION_PARAMS
                </h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-electric-blue/30 to-transparent" />
            </div>

            <div className="flex flex-col gap-12 items-start">
                <div className="w-full space-y-8">
                    <div className="code-block text-sm leading-loose text-gray-300">
                        <p className="mb-2"><span className="text-crimson"># Objective:</span> Turning complex problems into elegant, secure codebases.</p>
                        <p className="mb-2"><span className="text-electric-blue"># Background:</span> Cybersecurity researcher with a passion for modern web engineering.</p>
                        <p className="mb-2"><span className="text-white/40"># Current status:</span> Investigating Machine Learning integration & Security outsmarting.</p>
                        <p className="mb-2"><span className="text-green-500"># Availability:</span> OPEN_TO_FREELANCE_WORK.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <User className="text-electric-blue shrink-0 mt-1" size={20} />
                            <p className="text-gray-400">
                                Developing real-world projects powered by Python, ML, and React. Turning messy ideas into tactical tools that behave under pressure.
                            </p>
                        </div>
                        <div className="flex items-start gap-4">
                            <Zap className="text-crimson shrink-0 mt-1" size={20} />
                            <p className="text-gray-400">
                                Staying ahead isn't just work—it's a favorite cure for boredom. Keeping this workspace full of experiments and breakthroughs.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
