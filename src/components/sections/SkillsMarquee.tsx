import { skills } from '../../data/techStack';

const SkillsMarquee = () => {
    // Split skills into two rows
    const halfIndex = Math.ceil(skills.length / 2);
    const topRow = skills.slice(0, halfIndex);
    const bottomRow = skills.slice(halfIndex);

    const MarqueeRow = ({ items, reverse = false }: { items: typeof skills, reverse?: boolean }) => (
        <div className="flex relative overflow-hidden group">
            <div className={`flex shrink-0 gap-6 py-3 items-center whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} w-max min-w-full px-3`}>
                {items.map((skill, idx) => (
                    <div
                        key={`${skill.name}-${idx}`}
                        className="bg-stealth-800/50 border border-white/5 rounded-full px-6 py-3 flex items-center gap-3 backdrop-blur-sm hover:border-electric-blue/50 transition-colors"
                    >
                        <skill.icon size={20} className="text-gray-400 group-hover:text-electric-blue transition-colors" />
                        <span className="text-sm font-mono text-gray-300 uppercase tracking-wider">{skill.name}</span>
                    </div>
                ))}
            </div>
            <div aria-hidden="true" className={`flex shrink-0 gap-6 py-3 items-center whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} w-max min-w-full px-3`}>
                {items.map((skill, idx) => (
                    <div
                        key={`${skill.name}-dup-${idx}`}
                        className="bg-stealth-800/50 border border-white/5 rounded-full px-6 py-3 flex items-center gap-3 backdrop-blur-sm hover:border-electric-blue/50 transition-colors"
                    >
                        <skill.icon size={20} className="text-gray-400 group-hover:text-electric-blue transition-colors" />
                        <span className="text-sm font-mono text-gray-300 uppercase tracking-wider">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="w-full py-12 overflow-hidden space-y-8 relative max-w-[100vw]">
            {/* Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-stealth-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-stealth-900 to-transparent z-10 pointer-events-none" />

            <MarqueeRow items={topRow} />
            <MarqueeRow items={bottomRow} reverse />
        </div>
    );
};

export default SkillsMarquee;
