// src/app/(auth)/login/page.tsx
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginPage from './LoginPage'; // move your current code to a client component

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect('/Dashboard');
  }

  return <LoginPage />;
}
