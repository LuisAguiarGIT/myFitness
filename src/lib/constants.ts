export const API_MODULES = {
  createNewExercise: 'api/createNewExercise',
  createPersonalStats: 'api/createPersonalStats',
  getAllTags: 'api/getAllTags',
  getAllExercises: 'api/getAllExercises',
  getExercisesByTags: 'api/getExercisesByTags',
  getMostRecentPersonalStats: 'api/getMostRecentPersonalStats',
  getRecentWorkouts: 'api/getRecentWorkouts',
  getWeeklyVolume: 'api/getWeeklyVolume',
  workoutById: 'api/workout/[id]',
  workout: 'api/workout',
} as const;

export const EXERCISE_PAGE_SIZE = 5;
