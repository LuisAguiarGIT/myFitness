import { WorkoutSet, WorkoutExercise, WorkoutResponse } from '@/types/workout';

export function calcSetVolume(set: WorkoutSet): number {
  return set.reps * set.weight;
}

export function calcExerciseVolume(ex: WorkoutExercise): number {
  let total = 0;
  for (const set of ex.sets) total += calcSetVolume(set);
  return total;
}

export function calcWorkoutVolume(workout: WorkoutResponse): number {
  let total = 0;
  for (const ex of workout.exercises) total += calcExerciseVolume(ex);
  return total;
}

export function calcDayVolume(dayWorkouts: WorkoutResponse[]): number {
  let total = 0;
  for (const workout of dayWorkouts) total += calcWorkoutVolume(workout);
  return total;
}
