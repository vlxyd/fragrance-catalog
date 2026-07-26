export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm uppercase tracking-[0.34em] text-amber-600 dark:text-amber-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-stone-600 dark:text-stone-400">{description}</p>
    </div>
  );
}
