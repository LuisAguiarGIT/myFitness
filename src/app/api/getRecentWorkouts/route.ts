import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';

export async function GET(request: Request) {
  const log = logger.child({ module: API_MODULES.getRecentWorkouts });
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('limit')) || 2;

  return withAuth(log, async (session) => {
    try {
      const workouts = await prisma.workout.findMany({
        select: {
          id: true,
          name: true,
          focus: true,
          durationSeconds: true,
          createdAt: true,
        },
        where: {
          userId: session.user.id,
          createdAt: {
            gte: new Date(sevenDaysAgo),
          },
        },
        orderBy: { createdAt: 'desc' },
        take,
      });

      return Response.json(workouts);
    } catch (e) {
      log.error({ err: e }, 'Failed to get recent workouts');
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
  });
}
