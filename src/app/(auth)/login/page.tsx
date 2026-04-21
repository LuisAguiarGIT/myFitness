'use client';

import { signIn } from '@/lib/auth-client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: '/Dashboard',
    });

    setLoading(false);

    if (error) {
      setError('Invalid email or password');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <div className="bg-[#131313] w-full max-w-md rounded-2xl p-6 shadow-lg border border-[#222]">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          Welcome back
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[#aaa] text-sm">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="bg-[#1f1f1f] text-white rounded-md p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-[#CEFE00]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div>
            <label className="text-[#aaa] text-sm">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-[#1f1f1f] text-white rounded-md p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-[#CEFE00]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#CEFE00] w-full py-3 rounded-md font-bold text-[#556C00] text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
