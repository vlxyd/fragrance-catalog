"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-[2rem] border border-stone-200 bg-white/80 px-6 py-20 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
      <p className="text-sm uppercase tracking-[0.32em] text-amber-600">Error</p>
      <h1 className="mt-4 text-4xl font-semibold text-stone-900 dark:text-stone-100">The experience encountered a glitch.</h1>
      <p className="mt-4 max-w-xl text-base leading-8 text-stone-600 dark:text-stone-400">
        Refresh the page or try again in a moment to continue discovering the collection.
      </p>
      <div className="mt-8 flex gap-3">
        <button onClick={() => reset()} className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:bg-amber-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-amber-400">
          Try again
        </button>
        <Link href="/" className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold transition hover:border-amber-500 hover:text-amber-600 dark:border-stone-700">
          Back home
        </Link>
      </div>
    </div>
  );
}
