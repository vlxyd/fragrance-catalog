"use client";

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function onSubmit(data: any) {
    setError(null);
    setSubmitting(true);

    const res = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl: '/admin',
    });

    setSubmitting(false);

    if (res && (res as any).ok) {
      router.push('/admin');
    } else {
      setError('Sign in failed. Check your username and password.');
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-stone-200 bg-white/90 p-8 shadow-xl dark:border-stone-800 dark:bg-stone-950/90">
      <h1 className="text-3xl font-semibold text-stone-900 dark:text-stone-100">Admin sign in</h1>
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">Sign in with the administrator credentials configured for this app.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <input
          {...register('username')}
          placeholder="Username"
          autoComplete="username"
          className="w-full rounded-full border border-stone-200 bg-stone-100 px-4 py-3 text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-500 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500"
        />
        <div className="relative">
          <input
            {...register('password')}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            className="w-full rounded-full border border-stone-200 bg-stone-100 px-4 py-3 pr-12 text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-500 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute inset-y-0 right-3 flex items-center text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
        Use the admin username and password from your environment configuration.
      </p>
    </div>
  );
}
