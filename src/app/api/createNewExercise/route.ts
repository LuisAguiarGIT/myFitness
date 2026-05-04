import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { Prisma } from '@/generated/prisma/client';
import logger from '@/lib/logger';

export async function POST(req: Request) {
  const log = logger.child({ module: 'api/createExercise' });
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    log.warn('Unauthorized');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, tags } = body;

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
      return Response.json({
        error: 'An exercise with this name already exists.',
      });
    }
    log.error(
      { err: e },
      'Unhandled exception, failed to create a new exercise',
    );
    return Response.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
