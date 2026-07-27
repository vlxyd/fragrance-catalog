import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getCatalogData } from "@/lib/catalog-service";

export default async function Home() {
  const { brands, featuredProducts, newArrivals, bestSellers } = await getCatalogData();

  console.log("FEATURED PRODUCTS:", featuredProducts);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2.75rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/80 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-amber-600">Aurelia Maison</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl lg:text-6xl">
              Discover scents that feel like velvet, light, and gold.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-400">
              A refined catalog of modern fragrances, thoughtfully curated for those who appreciate elegance over excess.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:bg-amber-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-amber-400">
                Shop collection <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-amber-500 hover:text-amber-600 dark:border-stone-700 dark:text-stone-300">
                Our story
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-stone-200 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 p-8 text-stone-100 shadow-xl dark:border-stone-700">
            <div className="flex items-center gap-2 text-sm uppercase tracking-[0.32em] text-amber-400">
              <Sparkles size={16} /> Featured edit
            </div>
            <h2 className="mt-6 text-3xl font-semibold">Velvet Noir</h2>
            <p className="mt-4 max-w-md text-base leading-8 text-stone-300">
              Black tea, rose absolute, and cedar create a rich signature that lingers in warmth and quiet glamour.
            </p>
            <div className="mt-8 grid gap-3">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Notes</p>
                <p className="mt-2 text-sm text-stone-100">Black Tea • Rose Absolute • Cedarwood</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Price</p>
                <p className="mt-2 text-sm text-stone-100">$192 • Eau de Parfum</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Featured fragrances" title="Modern signatures with lasting presence" description="A polished collection of scents shaped for evening wear, daytime elegance, and personal rituals." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Featured brands" title="Houses chosen for their individuality" description="Each brand reflects a distinctive point of view, from luminous florals to smoky woods and luminous citrus." />
          <Link href="/shop" className="text-sm font-semibold text-stone-700 transition hover:text-amber-600 dark:text-stone-300 dark:hover:text-amber-400">View all scents</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {brands.map((brand) => (
            <div key={brand.id} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-950/70">
              <p className="text-2xl text-amber-600">{brand.logo}</p>
              <h3 className="mt-4 text-xl font-semibold text-stone-900 dark:text-stone-100">{brand.name}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">{brand.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
          <SectionHeading eyebrow="New arrivals" title="Freshly unveiled compositions" description="New scents for the season, released with the softness of a velvet launch and the clarity of modern design." />
          <div className="mt-8 grid gap-4">
            {newArrivals.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-4 dark:border-stone-800 dark:bg-stone-950/70">
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">{product.name}</p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{product.concentration} • {product.size}</p>
                </div>
                <p className="text-sm font-semibold text-amber-600">${product.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
          <SectionHeading eyebrow="Best sellers" title="House favorites with lasting appeal" description="These three have become signatures for the modern collector and daily wearer alike." />
          <div className="mt-8 grid gap-4">
            {bestSellers.map((product) => (
              <div key={product.id} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-950/70">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">{product.name}</p>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{product.gender}</p>
                  </div>
                  <p className="text-sm font-semibold text-amber-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-stone-200/80 bg-stone-900 p-8 text-stone-100 shadow-[0_24px_80px_rgba(0,0,0,0.12)] dark:border-stone-700">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-amber-400">Newsletter</p>
            <h2 className="mt-3 text-3xl font-semibold">Receive early access to new releases.</h2>
            <p className="mt-3 max-w-xl text-base leading-8 text-stone-300">Join our private list for seasonal launches, limited offers, and first access to our catalog edit.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input className="rounded-full border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100 outline-none" placeholder="Email address" />
            <button className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
