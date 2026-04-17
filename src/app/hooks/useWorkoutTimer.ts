import { useEffect, useState } from 'react';

export function useWorkoutTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  return {
    seconds,
    isRunning,
    toggleTimer,
    setSeconds,
  };
}
