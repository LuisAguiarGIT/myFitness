// scripts/seed-user.ts
import { auth } from '../src/lib/auth';

await auth.api.signUpEmail({
  body: {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  },
});

console.log('User created');
process.exit(0);
