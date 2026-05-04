export function getWorkoutParams(params: URLSearchParams) {
  return {
    name: params.get('name') ?? 'My Workout',
    tags: params.get('tags') ?? '',
    template: params.get('template'),
  };
}
