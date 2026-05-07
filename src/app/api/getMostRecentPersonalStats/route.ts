import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import logger from '@/lib/logger';

export async function GET() {
  const log = logger.child({ module: 'api/getMostRecentPersonalStats' });
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    log.warn('Unauthorized GET attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    return Response.json({ mostRecentWeight }, { status: 201 });
  } catch (e) {
    log.error({ err: e }, 'Failed to get latest weight!');
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
