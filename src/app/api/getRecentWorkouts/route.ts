import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('limit')) || 2;

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
    take,
  });

  return Response.json(workouts);
}
