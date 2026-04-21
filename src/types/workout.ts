export type WorkoutSet = {
  set: number;
  previous: string;
  weight: string;
  reps: string;
  done: boolean;
};

export type WorkoutExercise = {
  id: number;
  name: string;
  sets: WorkoutSet[];
};

export type Workout = {
  name: string;
  focus: string;
  exercises: WorkoutExercise[];
};
