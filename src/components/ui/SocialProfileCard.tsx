import { motion } from 'framer-motion';
import { BadgeCheck, Mail, ShieldCheck } from 'lucide-react';

interface SocialProfileCardProps {
    name: string;
    handle: string;
    avatar: string;
    banner: string;
    bio: string;
    isVerified?: boolean;
    isEmail?: boolean;
    stats?: { label: string; value: string }[];
    avatarPosition?: string;
    platform?: string;
    PlatformIcon?: React.ElementType;
}

const SocialProfileCard = ({ name, handle, avatar, banner, bio, isVerified = true, isEmail = false, stats, avatarPosition = 'center', platform, PlatformIcon }: SocialProfileCardProps) => {

    // Special Layout for Discord
    if (platform === 'DISCORD') {
        const status = stats?.find(s => s.label === 'status')?.value || 'online';
        const customStatus = stats?.find(s => s.label === 'custom_status')?.value || 'Hacking the matrix';

        return (
            <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                className="flex items-center gap-4 p-3 pr-6 bg-[#0a0f1d] border border-white/5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] min-w-[320px] relative overflow-hidden"
            >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/20 via-transparent to-transparent pointer-events-none" />

                {/* Avatar */}
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full border-2 border-[#5865F2]/30 overflow-hidden">
                        <img src={avatar} alt={name} className="w-full h-full object-cover" />
                    </div>
                    {/* Status Dot */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[3px] border-[#0a0f1d] flex items-center justify-center
                        ${status === 'dnd' ? 'bg-red-500' :
                            status === 'idle' ? 'bg-yellow-500' :
                                status === 'offline' ? 'bg-gray-500' : 'bg-green-500'}`
                    }>
                        {status === 'dnd' && <div className="w-1.5 h-0.5 bg-black/50 rounded-full" />}
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-sm tracking-wide">{name}</span>
                        {/* Custom Status Pill */}
                        <div className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-300 font-mono">
                            {customStatus}
                        </div>
                    </div>
                    <span className="text-gray-500 text-xs font-mono">@{handle}</span>
                </div>
            </motion.div>
        );
    }

    // Default Layout for other socials
    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="w-80 bg-white rounded-[24px] overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.3)] text-black font-sans border border-gray-100"
        >
            {/* Banner */}
            <div
                className="h-20 w-full overflow-hidden"
                style={{
                    background: banner.startsWith('linear-gradient') ? banner : `url(${banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Content Area */}
            <div className="px-5 pb-5 pt-2 relative">
                {/* Avatar */}
                <div className="absolute -top-10 left-4 flex items-end">
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm">
                        <img
                            src={avatar}
                            alt={name}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: avatarPosition }}
                        />
                    </div>
                    {/* Symbol overlay */}
                    <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center -ml-4 mb-0.5 z-10 shadow-sm text-gray-700">
                        {PlatformIcon ? (
                            <PlatformIcon size={12} />
                        ) : isEmail ? (
                            <Mail size={12} strokeWidth={3} />
                        ) : (
                            <span className="text-[10px] font-bold">@</span>
                        )}
                    </div>
                </div>

                {/* Name & Handle */}
                <div className="mt-8">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-lg leading-tight">{name}</span>
                        {isVerified && (
                            platform === 'LINKEDIN' ? (
                                <ShieldCheck size={20} className="text-black ml-1" strokeWidth={1.5} />
                            ) : (
                                <BadgeCheck size={20} className="text-[#1DA1F2] ml-1" fill="currentColor" stroke="white" strokeWidth={2} />
                            )
                        )}
                    </div>
                    {platform !== 'LINKEDIN' && (
                        <div className="text-gray-500 text-sm font-medium">{isEmail ? handle : `@${handle}`}</div>
                    )}
                </div>

                {/* Bio */}
                <div className="mt-3 text-sm text-gray-800 leading-snug">
                    {bio}
                </div>

                {/* Stats */}
                {stats && stats.length > 0 ? (
                    <div className="mt-4 flex gap-4 border-t border-gray-100 pt-3">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex gap-1 items-baseline">
                                <span className="font-bold text-sm">{stat.value}</span>
                                <span className="text-gray-500 text-xs">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 flex gap-4 border-t border-gray-100 pt-3">
                        <div className="flex gap-1 items-baseline opacity-50">
                            <span className="text-gray-500 text-xs">View Profile</span>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SocialProfileCard;
