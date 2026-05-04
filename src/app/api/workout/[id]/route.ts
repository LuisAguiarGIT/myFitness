import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import logger from '@/lib/logger';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const log = logger.child({ module: 'api/workout/[id]' });
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    log.warn('Unauthorized GET attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    return Response.json(workout);
  } catch (e) {
    log.error({ err: e, id }, 'Failed to get workout');
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
