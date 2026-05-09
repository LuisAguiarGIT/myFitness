import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';

export async function GET() {
  const log = logger.child({ module: API_MODULES.getWeeklyVolume });

  return withAuth(log, async (session) => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(
      today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1),
    );
    monday.setHours(0, 0, 0, 0);

    try {
      const workouts = await prisma.workout.findMany({
        where: {
          userId: session.user.id,
          createdAt: { gte: monday },
        },
        include: {
          exercises: {
            include: { sets: true },
          },
        },
      });

      return Response.json(workouts);
    } catch (e) {
      log.error({ err: e }, 'Failed to get volume');
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
  });
}
