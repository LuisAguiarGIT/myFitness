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
  const { name, tags } = body;

  const newExerciseBank = await prisma.exerciseBank.create({
    data: {
      name,
      tags: {
        create: tags.map((tag: string) => ({
          tag: {
            connect: { name: tag },
          },
        })),
      },
    },
  });

  return Response.json(newExerciseBank, { status: 201 });
}
