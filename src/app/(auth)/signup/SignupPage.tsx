'use client';

import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setServerError('');

    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: '/Dashboard',
    });

    if (error) {
      setServerError(error.message ?? 'An unexpected error ocurred');
    } else {
      router.push('/Dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-lg border border-[#222]">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          Welcome!
        </h1>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-2 rounded-md mb-4 text-center">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="space-y-5"
        >
          <div>
            <label className="text-[#aaa] text-sm">Name</label>
            <input
              type="text"
              placeholder="Your name..."
              className="bg-[#1f1f1f] text-white rounded-md p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-[#CEFE00]"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Name is required.',
                },
              })}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="text-[#aaa] text-sm">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="bg-[#1f1f1f] text-white rounded-md p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-[#CEFE00]"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[#aaa] text-sm">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-[#1f1f1f] text-white rounded-md p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-[#CEFE00]"
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#CEFE00] w-full py-3 rounded-md uppercase font-bold text-[#556C00] text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering your new account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
