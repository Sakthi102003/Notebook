import GithubHeatmap from '../features/GithubHeatmap'
import SkillsMarquee from './SkillsMarquee'

export default function TechCapability() {
    return (
        <section id="skills" className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4" style={{ color: 'var(--text-primary)' }}>
                    <span className="font-mono opacity-50" style={{ color: 'var(--accent-cyan)' }}>02.</span> SKILLS & TOOLS
                </h2>
                <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), transparent)' }} />
            </div>

            <div className="w-full -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-0">
                <SkillsMarquee />
            </div>

            <div className="mt-16">
                <GithubHeatmap />
            </div>
        </section>
    )
}
