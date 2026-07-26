import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-[2rem] border border-stone-200 bg-white/80 px-6 py-20 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
      <p className="text-sm uppercase tracking-[0.32em] text-amber-600">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-stone-900 dark:text-stone-100">The scent you were looking for is not here.</h1>
      <p className="mt-4 max-w-xl text-base leading-8 text-stone-600 dark:text-stone-400">
        The page may have moved or the fragrance has been archived. Return to the catalog to continue exploring.
      </p>
      <Link href="/" className="mt-8 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:bg-amber-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-amber-400">
        Return home
      </Link>
    </div>
  );
}
