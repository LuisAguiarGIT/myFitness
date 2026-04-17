import { useState } from 'react';
import { Workout, WorkoutSet } from '@/types/workout';

export function useWorkout(initial: Workout) {
  const [workout, setWorkout] = useState(initial);

  function addCustomExercise(name: string) {
    setWorkout((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          id: Date.now(),
          name,
          sets: [],
          custom: true,
        },
      ],
    }));
  }

  function handleSetsChange(exerciseId: number, sets: WorkoutSet[]) {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, sets } : ex,
      ),
    }));
  }

  return {
    workout,
    setWorkout,
    addCustomExercise,
    handleSetsChange,
  };
}
