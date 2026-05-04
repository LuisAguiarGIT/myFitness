import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import logger from '@/lib/logger';

export async function GET() {
  const log = logger.child({ module: 'api/getAllTags' });
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    log.warn('Unauthorized GET attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tags = await prisma.tag.findMany({
      select: {
        name: true,
      },
    });

    return Response.json(tags);
  } catch (e) {
    log.error({ err: e }, 'Failed to get tags');
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
