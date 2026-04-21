import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, focus, durationSeconds, exercises } = body;

  const workout = await prisma.workout.create({
    data: {
      name,
      focus,
      durationSeconds,
      userId: session.user.id,
      exercises: {
        create: exercises.map((exercise: any) => ({
          name: exercise.name,
          sets: {
            create: exercise.sets.map((set: any) => ({
              reps: parseInt(set.reps),
              weight: parseInt(set.weight),
            })),
          },
        })),
      },
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  return Response.json(workout, { status: 201 });
}
