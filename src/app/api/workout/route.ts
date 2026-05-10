import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';
import { WorkoutExercise, WorkoutSet } from '@/types/workout';

export async function POST(req: Request) {
  const log = logger.child({ module: API_MODULES.workout });

  return withAuth(log, async (session) => {
    const body = await req.json();
    const { name, focus, durationSeconds, exercises } = body;

    try {
      const workout = await prisma.workout.create({
        data: {
          name,
          focus,
          durationSeconds,
          userId: session.user.id,
          exercises: {
            create: exercises.map((exercise: WorkoutExercise) => ({
              name: exercise.name,
              sets: {
                create: exercise.sets.map((set: WorkoutSet) => ({
                  reps: set.reps,
                  weight: set.weight,
                })),
              },
            })),
          },
        },
        include: {
          exercises: {
            include: {
              sets: true,
            },
          },
        },
      });

      log.info(
        'Created workout with the following data: \n' + JSON.stringify(workout),
      );

      return Response.json(workout, { status: 201 });
    } catch (e) {
      log.error({ err: e }, 'Unhandled exception');
      return Response.json({ error: 'Something went wrong.' }, { status: 500 });
    }
  });
}
