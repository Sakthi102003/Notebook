import { useState, useEffect } from 'react'
import { Cloud, Wind, RefreshCw } from 'lucide-react'

export default function EnvironmentWidget() {
    const [data, setData] = useState<{ temp: number; wind: number } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Coordinates for Coimbatore
                const res = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=11.0168&longitude=76.9558&current=temperature_2m,wind_speed_10m&timezone=auto'
                )
                const json = await res.json()
                setData({
                    temp: json.current.temperature_2m,
                    wind: json.current.wind_speed_10m
                })
            } catch (e) {
                console.error('Environment sync failed', e)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        // Refresh every 15 minutes
        const interval = setInterval(fetchData, 15 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase">
                <RefreshCw size={12} className="animate-spin" />
                <span>SYNCing_ENV...</span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono uppercase">
            {data && (
                <>
                    <div className="flex items-center gap-2">
                        <Cloud size={12} className="text-electric-blue" />
                        <span>EXT_TEMP: {data.temp}°C</span>
                    </div>
                    <div className="flex items-center gap-2 hidden lg:flex">
                        <Wind size={12} className="text-gray-400" />
                        <span>WIND: {data.wind} km/h</span>
                    </div>
                </>
            )}
        </div>
    )
}
