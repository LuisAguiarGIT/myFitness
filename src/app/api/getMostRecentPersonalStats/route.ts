import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';

export async function GET() {
  const log = logger.child({ module: API_MODULES.getMostRecentPersonalStats });

  return withAuth(log, async (session) => {
    try {
      const mostRecentWeight = await prisma.personalStats.findFirst({
        select: {
          weight: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          userId: session.user.id,
        },
      });

      return Response.json(mostRecentWeight);
    } catch (e) {
      log.error({ err: e }, 'Failed to get latest weight!');
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
  });
}
