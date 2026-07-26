import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog-service";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found | Aurelia" };
  }

  return {
    title: `${product.name} | Aurelia`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(slug);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/80 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {product.gallery.map((image) => (
            <div key={image} className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-800">
              <Image src={image} alt={product.name} width={800} height={900} className="h-64 w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-amber-600">{product.brandId}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">{product.name}</h1>
            <p className="mt-5 text-base leading-8 text-stone-600 dark:text-stone-400">{product.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950/70">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Gender</p>
                <p className="mt-2 font-semibold text-stone-900 dark:text-stone-100">{product.gender}</p>
              </div>
              <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950/70">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Concentration</p>
                <p className="mt-2 font-semibold text-stone-900 dark:text-stone-100">{product.concentration}</p>
              </div>
              <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950/70">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Size</p>
                <p className="mt-2 font-semibold text-stone-900 dark:text-stone-100">{product.size}</p>
              </div>
              <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950/70">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Availability</p>
                <p className="mt-2 font-semibold text-stone-900 dark:text-stone-100">{product.availability}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6 text-stone-900 dark:border-amber-800 dark:bg-amber-950/20 dark:text-stone-100">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Fragrance notes</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Top</p>
                <ul className="mt-2 space-y-1 text-sm text-stone-700 dark:text-stone-300">{product.notes.top.map((note) => <li key={note}>{note}</li>)}</ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Middle</p>
                <ul className="mt-2 space-y-1 text-sm text-stone-700 dark:text-stone-300">{product.notes.middle.map((note) => <li key={note}>{note}</li>)}</ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Base</p>
                <ul className="mt-2 space-y-1 text-sm text-stone-700 dark:text-stone-300">{product.notes.base.map((note) => <li key={note}>{note}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-amber-600">Related scents</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 dark:text-stone-100">Discover more within the house</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-stone-700 transition hover:text-amber-600 dark:text-stone-300 dark:hover:text-amber-400">
            Browse all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
