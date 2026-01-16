import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AgeCounter = () => {
    const [age, setAge] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
    });

    useEffect(() => {
        const dob = new Date('2003-07-10T00:00:00');

        const updateAge = () => {
            const now = new Date();
            const diff = now.getTime() - dob.getTime();

            // Calculate totals
            const totalSeconds = Math.floor(diff / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const totalDays = Math.floor(totalHours / 24);

            // Calculate years (accounting for leap years roughly or precisely?)
            // Precise method:
            let years = now.getFullYear() - dob.getFullYear();
            let m = now.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
                years--;
            }

            // Calculate remaining days after substantial years removed
            // Construct a date object for the last birthday
            const lastBirthday = new Date(dob);
            lastBirthday.setFullYear(dob.getFullYear() + years);

            const diffSinceLastBirthday = now.getTime() - lastBirthday.getTime();

            const days = Math.floor(diffSinceLastBirthday / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffSinceLastBirthday / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diffSinceLastBirthday / (1000 * 60)) % 60);
            const seconds = Math.floor((diffSinceLastBirthday / 1000) % 60);
            const milliseconds = Math.floor(diffSinceLastBirthday % 1000);

            setAge({
                years,
                days,
                hours,
                minutes,
                seconds,
                milliseconds,
            });
        };

        const interval = setInterval(updateAge, 50); // Update frequently for milliseconds
        updateAge(); // Initial call

        return () => clearInterval(interval);
    }, []);

    const timeUnits = [
        { label: 'YEARS', value: age.years },
        { label: 'DAYS', value: age.days },
        { label: 'HOURS', value: age.hours },
        { label: 'MINUTES', value: age.minutes },
        { label: 'SECONDS', value: age.seconds },
        { label: 'MILLISECONDS', value: age.milliseconds, isMs: true },
    ];

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                <h3 className="text-xs font-mono text-crimson uppercase tracking-widest">System_Uptime // Life_Clock</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {timeUnits.map((unit, index) => (
                    <motion.div
                        key={unit.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-stealth-800/30 border border-white/5 p-4 overflow-hidden hover:border-crimson/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-1 opacity-20">
                            <span className="text-[8px] font-mono text-white">{String(index + 1).padStart(2, '0')}</span>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-1">
                            <span className={`font-mono font-bold text-white tracking-widest ${unit.isMs ? 'text-xl w-12 text-center' : 'text-3xl'}`}>
                                {unit.isMs
                                    ? String(unit.value).padStart(3, '0')
                                    : String(unit.value).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-crimson transition-colors">
                                {unit.label}
                            </span>
                        </div>

                        {/* Scanning line effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-crimson/5 to-transparent h-[200%] w-full -translate-y-full group-hover:animate-scan" />

                        {/* Corner Accents */}
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-crimson/50 transition-colors" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-crimson/50 transition-colors" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AgeCounter;
