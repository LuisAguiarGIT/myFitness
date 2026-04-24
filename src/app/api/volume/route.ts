import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const today = new Date();
  const monday = new Date(today);
  monday.setDate(
    today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1),
  );
  monday.setHours(0, 0, 0, 0);

  const workouts = await prisma.workout.findMany({
    where: {
      userId: session.user.id,
      createdAt: { gte: monday },
    },
    include: {
      exercises: {
        include: { sets: true },
      },
    },
  });

  return Response.json(workouts);
}
