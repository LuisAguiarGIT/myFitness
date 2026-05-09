import { API_MODULES } from '@/lib/constants';
import { Workout } from '@/types/workout';

export function useWorkoutSubmit(
  workout: Workout,
  focus: string,
  seconds: number,
) {
  async function submitCurrentWorkout() {
    const payload = {
      name: workout.name,
      focus: focus,
      durationSeconds: seconds,
      exercises: workout.exercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
    };

    const res = await fetch(API_MODULES.workout, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return res.ok;
  }

  return { submitCurrentWorkout };
}
