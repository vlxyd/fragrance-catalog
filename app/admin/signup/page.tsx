"use client";

import { useRouter } from 'next/navigation';

export default function AdminSignupPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-stone-200 bg-white/90 p-8 shadow-xl dark:border-stone-800 dark:bg-stone-950/90">
      <h1 className="text-3xl font-semibold text-stone-900 dark:text-stone-100">Admin access</h1>
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
        This app uses a single administrator account defined in your environment variables. Sign in with the configured username and password.
      </p>

      <button
        type="button"
        onClick={() => router.push('/admin/login')}
        className="mt-6 w-full rounded-full bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
      >
        Return to sign in
      </button>

      <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
        Use the credentials from your .env.local file to access the admin area.
      </p>
    </div>
  );
}
