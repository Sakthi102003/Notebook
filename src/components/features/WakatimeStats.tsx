import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WAKATIME_URL = "https://wakatime.com/share/@sakthi102003/8d9ab44d-9a0e-46c2-a7b4-a5e6872f5085.json";

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
                    if (data.data[0].grand_total || data.data[0].range) {
                        setDataType('activity');
                    } else if (data.data[0].name) {
                        setDataType('editors');
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

    const getTotalEditorStats = () => {
        if (dataType !== 'editors' || !stats?.data) return null;
        const totalSeconds = stats.data.reduce((acc: number, curr: any) => acc + (curr.total_seconds || 0), 0);

        if (totalSeconds === 0 && stats.data.length > 0) {
            // Fallback for percentage-only data
            const topEditor = stats.data[0];
            return {
                text: `${topEditor.percent}%`,
                name: topEditor.name,
                hours: 0,
                minutes: 0,
                total_seconds: 0,
                percent: topEditor.percent,
                isPercentageOnly: true
            };
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return {
            text: `${hours} hrs ${minutes} mins`,
            hours,
            minutes,
            total_seconds: totalSeconds,
            percent: 100,
            isPercentageOnly: false
        };
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
            <div className="w-full max-w-[780px] animate-pulse px-0 py-0">
                <div className="mb-3 h-3 w-28 bg-white/10"></div>
                <div className="h-14 w-56 bg-white/10" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-[780px] font-mono text-sm text-white/60">
                {error}
            </div>
        );
    }

    const editorStats = getTotalEditorStats();
    const activityStats = getActivityStats();

    const displayText = dataType === 'activity' && activityStats ? activityStats.text : (editorStats?.text ?? 'No Data');

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative w-full max-w-[320px] overflow-hidden px-0 py-0"
        >
            <div className="min-w-0">
                <div className="mb-1 font-mono text-[8px] uppercase tracking-[0.25em] sm:text-[9px]" style={{ color: 'var(--text-muted)' }}>
                    {dataType === 'editors' ? '7-Day Activity' : 'Coding Activity'}
                </div>

                <div className="flex flex-wrap items-end leading-none" style={{ color: 'var(--accent)' }}>
                    <span className="font-display text-[1.8rem] font-bold tracking-[-0.06em] sm:text-[2.5rem]">
                        {displayText}
                    </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[7px] uppercase tracking-[0.2em] sm:text-[8px]" style={{ color: 'var(--text-muted)' }}>
                    <span>Last 7 Days</span>
                    <span style={{ opacity: 0.3 }}>/</span>
                    <span>7-Day Activity</span>
                </div>
            </div>
        </motion.div>
    );
};

export default WakatimeStats;
