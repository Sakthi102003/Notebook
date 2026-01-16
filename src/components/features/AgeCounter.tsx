import { useState, useEffect } from 'react';

const AgeCounter = () => {
    const [age, setAge] = useState<string>('');

    useEffect(() => {
        const dob = new Date('2003-07-10T18:40:00');

        const updateAge = () => {
            const now = new Date();

            let years = now.getFullYear() - dob.getFullYear();
            let months = now.getMonth() - dob.getMonth();
            let days = now.getDate() - dob.getDate();
            let hours = now.getHours() - dob.getHours();
            let minutes = now.getMinutes() - dob.getMinutes();
            let seconds = now.getSeconds() - dob.getSeconds();
            let milliseconds = now.getMilliseconds() - dob.getMilliseconds();

            // Adjust for negative values by borrowing from larger units
            if (milliseconds < 0) {
                milliseconds += 1000;
                seconds--;
            }
            if (seconds < 0) {
                seconds += 60;
                minutes--;
            }
            if (minutes < 0) {
                minutes += 60;
                hours--;
            }
            if (hours < 0) {
                hours += 24;
                days--;
            }
            if (days < 0) {
                // Get days in the previous month relative to 'now'
                const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += previousMonth.getDate();
                months--;
            }
            if (months < 0) {
                months += 12;
                years--;
            }

            // Format: Year.MonthDayHourMinuteSecondMillisecond
            // Pad with zeros to ensure consistent length
            const formattedAge = `v${years}.${String(months).padStart(2, '0')}${String(days).padStart(2, '0')}${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}${String(seconds).padStart(2, '0')}${String(milliseconds).padStart(3, '0')}`;

            setAge(formattedAge);
        };

        const interval = setInterval(updateAge, 50);
        updateAge();

        return () => clearInterval(interval);
    }, []);

    return <span className="font-mono text-electric-blue font-bold tracking-wider">{age}</span>;
};

export default AgeCounter;
