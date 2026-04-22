'use client';

interface ITimerProps {
  isRunning: boolean;
  seconds: number;
}

export default function Timer({ seconds }: ITimerProps) {
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');

    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');

    const secondsStr = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${secondsStr}`;
  };

  return (
    <div className="flex items-center justify-center mr-2">
      <div className="bg-[#692701]/60 text-[#FC5B00] font-label text-secondary font-bold text-sm bg-secondary-container/20 px-3 py-1 rounded-md">
        {formatTime(seconds)}
      </div>
    </div>
  );
}
