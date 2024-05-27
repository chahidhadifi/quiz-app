import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CountDown = (startDate, startTime, duration, navigate) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const [durationHour, durationMinute] = duration.split(':').map(Number);

            const start = new Date(startYear, startMonth - 1, startDay, startHour, startMinute);
            const end = new Date(start);
            end.setHours(end.getHours() + durationHour, end.getMinutes() + durationMinute);

            const now = new Date();
            const timeRemaining = end - now;

            if (timeRemaining <= 0) {
                setTimeLeft('00:00');
                navigate('/quizzes');
                return;
            }

            const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
            const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            setTimeLeft(formattedTime);
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [startDate, startTime, duration, navigate]);

    return timeLeft;
};

export default CountDown;
