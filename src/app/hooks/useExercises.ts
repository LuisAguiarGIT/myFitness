import { useState, useEffect } from 'react';

export interface IExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  tags: string[];
}

export function useExercises(tags?: string) {
  const [exercises, setExercises] = useState<IExercise[]>([]);

  useEffect(() => {
    const url = tags
      ? `/api/getExercisesByTags?tags=${tags}`
      : '/api/getAllExercises';

    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        setExercises(
          data.map((exercise: IExercise) => ({
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            tags: exercise.tags ?? [],
          })),
        ),
      );
  }, [tags]);

  return exercises;
}
