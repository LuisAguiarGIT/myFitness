export type WorkoutSet = {
  set: number;
  previous: string;
  weight: number;
  reps: number;
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

export type WorkoutResponse = {
  id: string;
  name: string;
  createdAt: string;
  exercises: WorkoutExercise[];
};
