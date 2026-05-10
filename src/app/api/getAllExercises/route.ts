import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';
import { formatExercise } from '@/lib/formatters/exercise';

export async function GET() {
  const log = logger.child({ module: API_MODULES.getAllExercises });

  return withAuth(log, async () => {
    try {
      const exercises = await prisma.exerciseBank.findMany({
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      const clean = exercises.map(formatExercise);

      return Response.json(clean);
    } catch (e) {
      log.error({ err: e }, 'Failed to get exercises');
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
  });
}
