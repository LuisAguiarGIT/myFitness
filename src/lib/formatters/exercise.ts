import { Prisma } from '@prisma/client';

type ExerciseWithTags = Prisma.ExerciseBankGetPayload<{
  include: {
    tags: {
      include: { tag: true };
    };
  };
}>;

export function formatExercise(ex: ExerciseWithTags) {
  return {
    id: ex.id,
    name: ex.name,
    sets: ex.sets,
    reps: ex.reps,
    tags: ex.tags.map((t) => t.tag.name),
  };
}
