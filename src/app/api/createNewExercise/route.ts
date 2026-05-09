import prisma from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';

export async function POST(req: Request) {
  const log = logger.child({ module: API_MODULES.createNewExercise });

  return withAuth(log, async () => {
    const { name, tags } = await req.json();

    try {
      const newExerciseBank = await prisma.exerciseBank.create({
        data: {
          name,
          tags: {
            create: tags.map((tag: string) => ({
              tag: {
                connect: { name: tag },
              },
            })),
          },
        },
      });

      return Response.json(newExerciseBank, { status: 201 });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        log.error({ err: e }, 'Failed to create a new exercise');
        return Response.json(
          {
            error: 'An exercise with this name already exists.',
          },
          { status: 409 },
        );
      }
      log.error(
        { err: e },
        'Unhandled exception, failed to create a new exercise',
      );
      return Response.json({ error: 'Something went wrong.' }, { status: 500 });
    }
  });
}
