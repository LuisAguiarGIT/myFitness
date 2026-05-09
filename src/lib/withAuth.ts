import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import pino from 'pino';

type Session = typeof auth.$Infer.Session;

export async function withAuth(
  log: pino.Logger,
  handler: (session: Session) => Promise<Response>,
): Promise<Response> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    log.warn('Unauthorized attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return await handler(session);
  } catch (e) {
    log.error({ err: e }, 'Something went wrong');
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
