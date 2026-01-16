import { useState, useEffect } from 'react';

const SystemClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-xs text-gray-500 mb-4 tracking-widest flex items-center gap-2">
            <span className="text-electric-blue">LOCAL_TIME:</span>
            <span>{time.toLocaleTimeString()}</span>
        </div>
    );
};

export default SystemClock;
