'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      window.location.href = '/';
    } else {
      alert('Invalid login');
    }
  }

  return (
    <div className="bg-[#131313] w-1/3 h-1/3 rounded-xl">
      <h1 className="flex justify-center text-white m-4 text-2xl">Login</h1>

      <div className="m-4">
        <form onSubmit={handleSubmit}>
          <div className="text-[#898787]">
            <h2>Email</h2>
            <input
              type="email"
              placeholder="email@example.com"
              className="bg-[#262626] rounded-md p-2 w-full mt-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4 text-[#898787]">
            <div className="flex justify-between items-center">
              <h2>Password</h2>
              <button className="text-[#E36B35] text-xs">
                FORGOT PASSWORD?
              </button>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="bg-[#262626] rounded-md p-2 w-full mt-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-[#CEFE00] w-full mt-8 p-4 rounded-md hover:cursor-pointer font-bold text-2xl text-[#556C00]"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
