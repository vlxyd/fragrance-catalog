import { SectionHeading } from "@/components/section-heading";

const pillars = [
  { title: "Quiet luxury", description: "Every fragrance is presented with restraint, clarity, and a sense of artful depth." },
  { title: "Crafted stories", description: "We build each composition around mood, memory, and the ritual of getting dressed." },
  { title: "Modern elegance", description: "Our experience is refined, sensory, and timeless from the first glance to the final note." },
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/80 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-amber-600">About Aurelia</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl">A fragrance house built around emotion, atmosphere, and timeless detail.</h1>
            <p className="mt-6 text-lg leading-8 text-stone-600 dark:text-stone-400">
              Aurelia brings together contemporary perfumery and premium presentation to create a catalog that feels intimate, editorial, and deeply considered.
            </p>
          </div>
          <div className="rounded-[2rem] border border-stone-200 bg-gradient-to-br from-stone-900 to-stone-700 p-8 text-stone-100 dark:border-stone-700">
            <p className="text-sm uppercase tracking-[0.32em] text-amber-400">Our promise</p>
            <p className="mt-4 text-xl leading-8 text-stone-300">
              “We believe luxury should feel clear, calm, and unforgettable — from the first impression to the lasting trail.”
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
            <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100">{pillar.title}</h3>
            <p className="mt-4 text-base leading-8 text-stone-600 dark:text-stone-400">{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-stone-200 bg-white/80 p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
        <SectionHeading eyebrow="Our story" title="A modern salon of scent and style" description="We designed Aurelia to feel less like a marketplace and more like a private discovery experience — thoughtfully edited, elegantly paced, and rich in character." />
      </section>
    </div>
  );
}
