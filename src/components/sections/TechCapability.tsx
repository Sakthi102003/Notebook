import GithubHeatmap from '../features/GithubHeatmap'
import SkillsMarquee from './SkillsMarquee'

export default function TechCapability() {
    return (
        <section id="skills" className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-4">
                    <span className="text-electric-blue font-mono opacity-50">02.</span> TECH_CAPABILITY
                </h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-electric-blue/30 to-transparent" />
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
