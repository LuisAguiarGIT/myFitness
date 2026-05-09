import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';

export async function POST(req: Request) {
  const log = logger.child({ module: API_MODULES.createPersonalStats });

  return withAuth(log, async (session) => {
    const { weight } = await req.json();

    try {
      const newPersonalStat = await prisma.personalStats.create({
        data: {
          weight: weight,
          userId: session.user.id,
        },
      });

      return Response.json(newPersonalStat, { status: 201 });
    } catch (e) {
      log.error(
        { err: e },
        'Unhandled exception, failed to create a personal stat',
      );
      return Response.json({ error: 'Something went wrong.' }, { status: 500 });
    }
  });
}
