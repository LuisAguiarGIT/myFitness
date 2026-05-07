import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import logger from '@/lib/logger';

export async function POST(req: Request) {
  const log = logger.child({ module: 'api/createPersonalStats' });
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    log.warn('Unauthorized');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { weight } = body;

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
}
