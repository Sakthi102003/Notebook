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
}

const SocialProfileCard = ({ name, handle, avatar, banner, bio, isVerified = true, isEmail = false, stats, avatarPosition = 'center', platform }: SocialProfileCardProps) => {
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
                    {/* Symbol overlay - Hidden for LinkedIn */}
                    {platform !== 'LINKEDIN' && (
                        <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center -ml-4 mb-0.5 z-10 shadow-sm text-gray-700">
                            {isEmail ? <Mail size={12} strokeWidth={3} /> : <span className="text-[10px] font-bold">@</span>}
                        </div>
                    )}
                </div>

                {/* Name & Handle */}
                <div className="mt-8">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-lg leading-tight">{name}</span>
                        {isVerified && (
                            platform === 'LINKEDIN' ? (
                                <ShieldCheck size={18} className="text-gray-600" fill="transparent" stroke="currentColor" strokeWidth={2} />
                            ) : (
                                <BadgeCheck size={18} className="text-[#1DA1F2]" fill="currentColor" stroke="white" strokeWidth={2} />
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
