import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';
import { API_MODULES } from '@/lib/constants';

export async function GET() {
  const log = logger.child({ module: API_MODULES.getAllTags });

  return withAuth(log, async () => {
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
  });
}
