import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tags = searchParams.get('tags')?.split(',') ?? [];

  if (tags.length === 0) {
    return Response.json({ error: 'No tags provided' }, { status: 400 });
  }

  const exercises = await prisma.exerciseBank.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: { in: tags },
          },
        },
      },
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  const clean = exercises.map((ex) => ({
    id: ex.id,
    name: ex.name,
    sets: ex.sets,
    reps: ex.reps,
    tags: ex.tags.map((t) => t.tag.name),
  }));

  return Response.json(clean);
}
