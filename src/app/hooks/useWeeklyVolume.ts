import { useEffect, useState } from 'react';
import { WorkoutResponse } from '@/types/workout';
import { calcDayVolume } from '@/lib/utils';
import { API_MODULES } from '@/lib/constants';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function useWeeklyVolume() {
  const [data, setData] = useState<{ day: string; volume: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function retrieve() {
      const res = await fetch(API_MODULES.getWeeklyVolume);
      const workouts = await res.json();

      const today = new Date();

      const chartData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - 6 + i);
        const dateStr = date.toISOString().split('T')[0];

        const dayWorkouts = workouts.filter((w: WorkoutResponse) =>
          w.createdAt.startsWith(dateStr),
        );

        const volume = calcDayVolume(dayWorkouts);

        return {
          day: DAYS[date.getDay() === 0 ? 6 : date.getDay() - 1],
          volume,
        };
      });

      setData(chartData);
      setLoading(false);
    }

    retrieve();
  }, []);

  return { data, loading };
}
