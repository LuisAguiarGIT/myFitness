import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await context.params;

  const workout = await prisma.workout.findFirst({
    where: { id, userId: session.user.id },
    include: {
      exercises: {
        include: { sets: true },
      },
    },
  });

  if (!workout) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json(workout);
}
