import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const workouts = await prisma.workout.findMany({
    select: {
      id: true,
      name: true,
      focus: true,
      durationSeconds: true,
      createdAt: true,
    },
    where: {
      userId: session.user.id,
      createdAt: {
        gte: new Date(sevenDaysAgo),
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 2,
  });

  return Response.json(workouts);
}
