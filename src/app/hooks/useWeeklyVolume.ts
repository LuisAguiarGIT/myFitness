import { useEffect, useState } from 'react';
import { WorkoutResponse, WorkoutSet, WorkoutExercise } from '@/types/workout';

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
      const res = await fetch('/api/volume');
      const workouts = await res.json();

      const today = new Date();

      const chartData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - 6 + i);
        const dateStr = date.toISOString().split('T')[0];

        const dayWorkouts = workouts.filter((w: WorkoutResponse) =>
          w.createdAt.startsWith(dateStr),
        );

        const volume = dayWorkouts.reduce(
          (total: number, workout: WorkoutResponse) =>
            total +
            workout.exercises.reduce(
              (exTotal: number, ex: WorkoutExercise) =>
                exTotal +
                ex.sets.reduce(
                  (setTotal: number, set: WorkoutSet) =>
                    setTotal + set.reps * set.weight,
                  0,
                ),
              0,
            ),
          0,
        );

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
