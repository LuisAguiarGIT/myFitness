'use client';

import { useEffect, useState } from 'react';
import { clearInterval } from 'timers';

export default function Timer() {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center justify-center mr-2">
      <div className="bg-[#692701]/60 text-[#FC5B00] font-label text-secondary font-bold text-sm bg-secondary-container/20 px-3 py-1 rounded-md">
        {formatTime(timeElapsed)}
      </div>
    </div>
  );
}
