import { useEffect, useState, useRef } from 'react';
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

interface SpotifyStatusProps {
    isSmall?: boolean;
}

const SpotifyStatus = ({ isSmall = false }: SpotifyStatusProps) => {
    const [spotify, setSpotify] = useState<SpotifyData | null>(null);
    const [lastPlayed, setLastPlayed] = useState<SpotifyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);

    const socketRef = useRef<WebSocket | null>(null);

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

        const handlePresenceUpdate = (data: any) => {
            if (!data) return;

            setError(null);
            setLastUpdated(new Date());

            // Check if there is a specific Spotify activity or if Lanyard flag is true
            const spotifyActivity = data.activities?.find((a: any) => a.name === "Spotify" || a.type === 2);
            const rawSpotify = data.spotify;
            const isActive = data.listening_to_spotify === true || !!spotifyActivity;

            if (isActive && (rawSpotify || spotifyActivity)) {
                const trackId = rawSpotify?.track_id || spotifyActivity?.sync_id || "";

                let albumArt = rawSpotify?.album_art_url || "";
                if (!albumArt && spotifyActivity?.assets?.large_image) {
                    const imgId = spotifyActivity.assets.large_image;
                    albumArt = imgId.includes(':')
                        ? `https://i.scdn.co/image/${imgId.split(':')[1]}`
                        : `https://i.scdn.co/image/${imgId}`;
                }

                const current: SpotifyData = {
                    active: true,
                    song: rawSpotify?.song || spotifyActivity?.details || "Unknown Track",
                    artist: rawSpotify?.artist || spotifyActivity?.state || "Unknown Artist",
                    album: rawSpotify?.album || spotifyActivity?.assets?.large_text || "",
                    album_art_url: albumArt,
                    track_id: trackId
                };

                setSpotify(current);
                setLastPlayed(current);
                localStorage.setItem('spotify_last_played', JSON.stringify(current));
            } else {
                setSpotify(null);
            }
            setLoading(false);
        };

        const fetchPresence = async () => {
            try {
                // Aggressive cache busting
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}?nocache=${Date.now()}`, {
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                });
                const result = await response.json();

                if (result.success) {
                    handlePresenceUpdate(result.data);
                } else {
                    if (result.error?.code === "user_not_monitored") {
                        setError("Lanyard_Not_Linked");
                    }
                }
            } catch (err) {
                console.error("Lanyard Fetch Fail:", err);
            } finally {
                setLoading(false);
            }
        };

        let shouldConnect = true;

        const connectWebSocket = () => {
            if (!shouldConnect) return;

            // Prevent multiple connections
            if (socketRef.current && (socketRef.current.readyState === WebSocket.CONNECTING || socketRef.current.readyState === WebSocket.OPEN)) {
                return;
            }

            const socket = new WebSocket('wss://api.lanyard.rest/socket');
            socketRef.current = socket;

            let heartbeat: any;

            socket.onmessage = (event) => {
                const msg = JSON.parse(event.data);

                if (msg.op === 1) { // Hello
                    if (shouldConnect && socket.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify({
                            op: 2,
                            d: { subscribe_to_id: DISCORD_ID }
                        }));
                    }

                    // Heartbeat
                    heartbeat = setInterval(() => {
                        if (shouldConnect && socket.readyState === WebSocket.OPEN) {
                            socket.send(JSON.stringify({ op: 3 }));
                        }
                    }, msg.d.heartbeat_interval);
                }

                if (msg.op === 0) { // Event
                    if (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE') {
                        handlePresenceUpdate(msg.d);
                    }
                }
            };

            socket.onerror = () => {
                if (shouldConnect) fetchPresence();
            };

            socket.onclose = (e) => {
                if (heartbeat) clearInterval(heartbeat);

                // Only reconnect if not closed intentionally by cleanup (code 1000)
                if (shouldConnect && e.code !== 1000) {
                    setTimeout(() => {
                        if (shouldConnect && socketRef.current === socket) {
                            connectWebSocket();
                        }
                    }, 5000);
                }
            };
        };

        // Initialize connections
        connectWebSocket();
        fetchPresence(); // Initial fetch for immediate data

        // Fallback polling every 30s in case WS fails
        const pollInterval = setInterval(() => {
            if (shouldConnect) fetchPresence();
        }, 30000);

        const handleOnline = () => {
            if (shouldConnect) {
                connectWebSocket();
                fetchPresence();
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && shouldConnect) {
                // Force a fresh sync when user returns to the tab
                connectWebSocket();
                fetchPresence();
            }
        };

        window.addEventListener('online', handleOnline);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            shouldConnect = false;
            const socket = socketRef.current;
            if (socket) {
                socketRef.current = null; // Mark as being cleaned up
                // ONLY close if it's already OPEN. 
                // Closing while CONNECTING (0) triggers the browser warning.
                if (socket.readyState === WebSocket.OPEN) {
                    socket.close(1000);
                }
            }
            clearInterval(pollInterval);
            window.removeEventListener('online', handleOnline);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const data = spotify || lastPlayed;

    if (loading && !data && !error) return (
        <div className={`w-full ${isSmall ? 'max-w-xs h-16' : 'max-w-md h-24'} bg-stealth-800/40 border border-white/5 rounded-2xl animate-pulse flex items-center justify-center`}>
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">Establishing_Link...</span>
        </div>
    );

    if (error === "Lanyard_Not_Linked") return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`w-full ${isSmall ? 'max-w-xs p-3' : 'max-w-md p-4'} bg-crimson/5 border border-crimson/20 rounded-2xl flex items-center gap-4`}
        >
            <div className={`${isSmall ? 'p-2' : 'p-3'} bg-crimson/10 rounded-lg`}>
                <SiSpotify size={isSmall ? 18 : 24} className="text-crimson" />
            </div>
            <div>
                <h3 className="text-crimson font-bold text-xs uppercase tracking-widest">Lanyard Link Missing</h3>
                {!isSmall && <p className="text-[10px] text-crimson/60 font-mono mt-1">Join discord.gg/lanyard to enable tracking.</p>}
            </div>
        </motion.div>
    );

    if (!data) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`w-full ${isSmall ? 'max-w-xs p-3' : 'max-w-md p-4'} bg-stealth-800/20 border border-white/5 rounded-2xl flex items-center gap-4 opacity-50`}
        >
            <div className={`${isSmall ? 'w-10 h-10' : 'w-16 h-16'} bg-white/5 rounded-lg flex items-center justify-center grayscale`}>
                <SiSpotify size={isSmall ? 18 : 24} className="text-gray-600" />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <SiSpotify size={14} className="text-gray-600" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">Spotify Offline</span>
                </div>
                <h3 className="text-gray-600 font-bold text-sm">Offline</h3>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full ${isSmall ? 'max-w-xs p-3' : 'max-w-md p-4'} bg-stealth-800/40 backdrop-blur-md border border-white/5 rounded-2xl group hover:bg-stealth-800/60 transition-all duration-300`}
        >
            <div className="flex items-center gap-4">
                {/* Album Art */}
                <div className="relative flex-shrink-0">
                    {data.album_art_url ? (
                        <img
                            src={data.album_art_url}
                            alt={data.album}
                            className={`${isSmall ? 'w-10 h-10' : 'w-16 h-16'} rounded-lg object-cover transition-all duration-500 ${spotify ? 'shadow-[0_0_15px_-3px_#1DB954] ring-1 ring-[#1DB954]/50' : 'grayscale-[0.5] shadow-lg outline outline-1 outline-white/10'}`}
                        />
                    ) : (
                        <div className={`${isSmall ? 'w-10 h-10' : 'w-16 h-16'} bg-white/5 rounded-lg flex items-center justify-center grayscale`}>
                            <SiSpotify size={isSmall ? 18 : 24} className="text-gray-600" />
                        </div>
                    )}
                    {spotify && (
                        <div className={`absolute -bottom-1 -right-1 bg-[#1DB954] rounded-full ${isSmall ? 'p-0.5' : 'p-1'} shadow-lg`}>
                            <SiSpotify size={isSmall ? 10 : 12} className="text-black" />
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <SiSpotify size={isSmall ? 12 : 14} className={spotify ? "text-[#1DB954]" : "text-gray-500"} />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                            {spotify ? (isSmall ? "Live" : "Listening now") : (isSmall ? "Prior" : "Last played")}
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

                    <h3 className={`text-white font-bold ${isSmall ? 'text-xs truncate' : 'text-base truncate'} group-hover:text-electric-blue transition-colors`}>
                        {data.song}
                    </h3>
                    <p className={`text-gray-400 ${isSmall ? 'text-[10px]' : 'text-sm'} truncate`}>
                        {isSmall ? data.artist : `by ${data.artist}`}
                    </p>
                    {lastUpdated && !spotify && !isSmall && (
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
                    className={`flex-shrink-0 ${isSmall ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#1DB954]/50 group-hover:bg-[#1DB954]/10 transition-all duration-300`}
                >
                    <Play size={isSmall ? 12 : 16} className="text-white fill-white group-hover:text-[#1DB954] group-hover:fill-[#1DB954] transition-colors translate-x-0.5" />
                </a>
            </div>
        </motion.div>
    );
};

export default SpotifyStatus;





