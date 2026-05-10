import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const log = logger.child({ module: API_MODULES.workoutById });

  return withAuth(log, async (session) => {
    const { id } = await context.params;

    try {
      const workout = await prisma.workout.findFirst({
        where: { id, userId: session.user.id },
        include: {
          exercises: {
            include: { sets: true },
          },
        },
      });

      if (!workout) {
        log.warn({ id }, 'Workout not found');
        return Response.json({ error: 'Not found' }, { status: 404 });
      }

      log.info('Retrieved \n' + JSON.stringify(workout));

      return Response.json(workout);
    } catch (e) {
      log.error({ err: e, id }, 'Failed to get workout');
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
  });
}
