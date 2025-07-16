import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 2 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-accent text-accent-foreground py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm font-medium">
        <Clock className="h-4 w-4" />
        <span>🚀 Enroll within</span>
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-bold">
            {timeLeft.days}d
          </span>
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-bold">
            {timeLeft.hours}h
          </span>
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-bold">
            {timeLeft.minutes}m
          </span>
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-bold">
            {timeLeft.seconds}s
          </span>
        </div>
        <span>to claim 50% OFF! 🎯</span>
      </div>
    </div>
  );
};