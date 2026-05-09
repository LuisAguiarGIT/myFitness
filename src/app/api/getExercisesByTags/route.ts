import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';

export async function GET(request: Request) {
  const log = logger.child({ module: API_MODULES.getExercisesByTags });

  return withAuth(log, async () => {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags')?.split(',') ?? [];

    if (tags.length === 0) {
      log.warn('GET attempt with no tags provided');
      return Response.json({ error: 'No tags provided' }, { status: 400 });
    }

    try {
      const exercises = await prisma.exerciseBank.findMany({
        where: {
          tags: {
            some: {
              tag: {
                name: { in: tags },
              },
            },
          },
        },
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
      log.error({ err: e, tags }, 'Failed to get exercises');
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
  });
}
