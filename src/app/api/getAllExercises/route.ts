import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import logger from '@/lib/logger';

export async function GET() {
  const log = logger.child({ module: 'api/getAllExercisesByTags' });

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    log.warn('Unauthorized GET attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    const clean = exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      sets: ex.sets,
      reps: ex.reps,
      tags: ex.tags.map((t) => t.tag.name),
    }));

    return Response.json(clean);
  } catch (e) {
    log.error({ err: e }, 'Failed to get exercises');
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
