import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  const filterDate = new Date().getDate() - 2;

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const workouts = await prisma.workout.findMany({
    select: {
      name: true,
      focus: true,
      durationSeconds: true,
      createdAt: true,
    },
    where: {
      userId: session.user.id,
      createdAt: {
        gte: new Date(filterDate),
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return Response.json(workouts);
}
