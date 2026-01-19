import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';
import { Play } from 'lucide-react';

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID || "1074201854143123560";

interface SpotifyData {
    active: boolean;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    track_id?: string;
}

const SpotifyStatus = () => {
    const [spotify, setSpotify] = useState<SpotifyData | null>(null);
    const [lastPlayed, setLastPlayed] = useState<SpotifyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Load last played from storage on mount
        const saved = localStorage.getItem('spotify_last_played');
        if (saved) {
            try {
                setLastPlayed(JSON.parse(saved));
            } catch (e) {
                console.error("Error parsing saved spotify data", e);
            }
        }

        const fetchPresence = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const result = await response.json();

                if (result.success) {
                    setError(null);
                    setLastUpdated(new Date());
                    const data = result.data;

                    // Priority 1: Direct Lanyard Spotify Data
                    // Priority 2: Fallback check in activities array
                    const spotifyActivity = data.activities?.find((a: any) => a.name === "Spotify" || a.type === 2);

                    if (data.listening_to_spotify || spotifyActivity) {
                        const current: SpotifyData = {
                            active: true,
                            song: data.spotify?.song || spotifyActivity?.details || "Unknown Track",
                            artist: data.spotify?.artist || spotifyActivity?.state || "Unknown Artist",
                            album: data.spotify?.album || spotifyActivity?.assets?.large_text || "",
                            album_art_url: data.spotify?.album_art_url || (spotifyActivity?.assets?.large_image ? `https://i.scdn.co/image/${spotifyActivity.assets.large_image.split(':')[1]}` : ""),
                            track_id: data.spotify?.track_id || ""
                        };

                        setSpotify(current);
                        setLastPlayed(current);
                        localStorage.setItem('spotify_last_played', JSON.stringify(current));
                    } else {
                        setSpotify(null);
                    }
                } else {
                    console.warn("Lanyard API Error:", result.error);
                    if (result.error?.code === "user_not_monitored") {
                        setError("Lanyard_Not_Linked");
                    } else {
                        setError("Connection_Error");
                    }
                }
            } catch (err) {
                console.error("Error fetching Spotify presence:", err);
                setError("Connection_Error");
            } finally {
                setLoading(false);
            }
        };

        fetchPresence();
        const interval = setInterval(fetchPresence, 10000);
        return () => clearInterval(interval);
    }, []);

    const data = spotify || lastPlayed;

    if (loading && !data && !error) return (
        <div className="w-full max-w-md h-24 bg-stealth-800/40 border border-white/5 rounded-2xl animate-pulse flex items-center justify-center">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">Establishing_Link...</span>
        </div>
    );

    if (error === "Lanyard_Not_Linked") return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md bg-crimson/5 border border-crimson/20 rounded-2xl p-4 flex items-center gap-4"
        >
            <div className="p-3 bg-crimson/10 rounded-lg">
                <SiSpotify size={24} className="text-crimson" />
            </div>
            <div>
                <h3 className="text-crimson font-bold text-xs uppercase tracking-widest">Lanyard Link Missing</h3>
                <p className="text-[10px] text-crimson/60 font-mono mt-1">Join discord.gg/lanyard to enable tracking.</p>
            </div>
        </motion.div>
    );

    if (!data) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md bg-stealth-800/20 border border-white/5 rounded-2xl p-4 flex items-center gap-4 opacity-50"
        >
            <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center grayscale">
                <SiSpotify size={24} className="text-gray-600" />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <SiSpotify size={14} className="text-gray-600" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">Spotify Offline</span>
                </div>
                <h3 className="text-gray-600 font-bold text-base">Not currently playing</h3>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-stealth-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 group hover:bg-stealth-800/60 transition-all duration-300"
        >
            <div className="flex items-center gap-4">
                {/* Album Art */}
                <div className="relative flex-shrink-0">
                    <img
                        src={data.album_art_url}
                        alt={data.album}
                        className={`w-16 h-16 rounded-lg object-cover transition-all duration-500 ${spotify ? 'shadow-[0_0_15px_-3px_#1DB954] ring-1 ring-[#1DB954]/50' : 'grayscale-[0.5] shadow-lg outline outline-1 outline-white/10'}`}
                    />
                    {spotify && (
                        <div className="absolute -bottom-1 -right-1 bg-[#1DB954] rounded-full p-1 shadow-lg">
                            <SiSpotify size={12} className="text-black" />
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <SiSpotify size={14} className={spotify ? "text-[#1DB954]" : "text-gray-500"} />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                            {spotify ? "Listening now" : "Last played"}
                        </span>
                        {spotify && (
                            <div className="flex gap-0.5 ml-1">
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [4, 10, 4] }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeInOut"
                                        }}
                                        className="w-0.5 bg-[#1DB954]"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <h3 className="text-white font-bold text-base truncate group-hover:text-electric-blue transition-colors">
                        {data.song}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">
                        by {data.artist}
                    </p>
                    {lastUpdated && !spotify && (
                        <p className="text-[8px] text-gray-600 font-mono mt-0.5">
                            LIVE_LAST_SYNC: {lastUpdated.toLocaleTimeString([], { hour12: false })}
                        </p>
                    )}
                </div>

                {/* Play Icon/Button */}
                <a
                    href={data.track_id ? `https://open.spotify.com/track/${data.track_id}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#1DB954]/50 group-hover:bg-[#1DB954]/10 transition-all duration-300"
                >
                    <Play size={16} className="text-white fill-white group-hover:text-[#1DB954] group-hover:fill-[#1DB954] transition-colors translate-x-0.5" />
                </a>
            </div>
        </motion.div>
    );
};

export default SpotifyStatus;
