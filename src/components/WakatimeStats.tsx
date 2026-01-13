import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Clock, AlertTriangle } from 'lucide-react';

const WAKATIME_URL = "https://wakatime.com/share/@sakthi102003/26442efa-409f-47d6-98a9-6254b1f911ab.json";

const WakatimeStats = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dataType, setDataType] = useState<'editors' | 'activity' | 'unknown'>('unknown');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(WAKATIME_URL);
                if (!response.ok) throw new Error('Failed to fetch Wakatime stats');
                const data = await response.json();
                setStats(data);

                // Determine Data Type
                if (Array.isArray(data.data) && data.data.length > 0) {
                    if (data.data[0].name) {
                        setDataType('editors');
                    } else if (data.data[0].range) {
                        setDataType('activity');
                    }
                }
            } catch (err) {
                console.error("Wakatime Fetch Error:", err);
                setError("Could not load coding activity.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const getVsCodeStats = () => {
        if (dataType !== 'editors' || !stats?.data) return null;
        return stats.data.find((e: any) => e.name === 'VS Code');
    };

    const getActivityStats = () => {
        if (dataType !== 'activity' || !stats?.data) return null;
        // Sum up total seconds from the days
        let totalSeconds = 0;
        stats.data.forEach((day: any) => {
            totalSeconds += day.grand_total.total_seconds;
        });
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return {
            text: `${hours} hrs ${minutes} mins`,
            hours,
            minutes,
            total_seconds: totalSeconds
        };
    };

    if (loading) {
        return (
            <div className="stealth-card p-6 animate-pulse">
                <div className="h-4 bg-white/5 w-1/3 mb-4 rounded"></div>
                <div className="h-8 bg-white/10 w-1/2 rounded"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="stealth-card p-6 border border-crimson/20 text-crimson font-mono text-sm">
                {error}
            </div>
        );
    }

    const vsCodeStats = getVsCodeStats();
    const activityStats = getActivityStats();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="stealth-card p-6 group relative overflow-hidden h-full"
        >
            {/* Background Glitch Effect */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Code size={100} />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-electric-blue/10 rounded-sm">
                            <Clock size={16} className="text-electric-blue" />
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                            {dataType === 'editors' ? "VS Code Duration" : "Coding Activity"}
                        </h3>
                    </div>

                    <div className="flex items-baseline gap-2">
                        {dataType === 'editors' && vsCodeStats ? (
                            <>
                                <span className="text-4xl font-bold text-white hover:text-electric-blue transition-colors font-mono">
                                    {vsCodeStats.text}
                                </span>
                                <span className="text-xs text-gray-500 font-mono uppercase">
                                    / Total
                                </span>
                            </>
                        ) : dataType === 'editors' ? (
                            <span className="text-xl text-gray-500 font-mono">VS Code not found</span>
                        ) : dataType === 'activity' && activityStats ? (
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-white hover:text-electric-blue transition-colors font-mono">
                                    {activityStats.text}
                                </span>
                                <span className="text-[10px] text-gray-500 font-mono uppercase mt-1">
                                    Last 7 Days
                                </span>
                            </div>
                        ) : (
                            <span className="text-xl text-gray-500 font-mono">No Data</span>
                        )}
                    </div>

                    {dataType === 'editors' && vsCodeStats && (
                        <div className="mt-4 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${vsCodeStats.percent}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-electric-blue shadow-[0_0_10px_#00E5FF]"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-4 text-[10px] text-gray-600 font-mono uppercase tracking-widest flex justify-between items-center">
                    <span>{dataType === 'editors' ? "Editor Usage" : "Wakatime Stats"}</span>
                    {dataType === 'editors' && vsCodeStats && <span>{vsCodeStats.percent}%</span>}
                    {dataType === 'activity' && (
                        <div className="flex items-center gap-1 text-yellow-500/80">
                            <AlertTriangle size={10} />
                            <span>For VS Code stats, switch shareable to 'Editors'</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default WakatimeStats;
