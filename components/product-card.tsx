"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { WishlistButton } from "@/components/wishlist-button";

type ProductCardProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  gender: string;
  concentration: string;
  size: string;
  price: number;
  availability: string;
  featured: boolean;
  gallery: string[];
};

export function ProductCard({ product }: { product: ProductCardProduct }) {
  const imageSrc =
  product.gallery?.[0] || "/product-velvet.svg";

console.log(product);
console.log(product.gallery);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/90 shadow-[0_24px_80px_rgba(0,0,0,0.06)] transition dark:border-stone-800 dark:bg-stone-900/90"
    >
      <div className="relative overflow-hidden">
        <div className="relative flex h-64 w-full items-center justify-center bg-stone-50 dark:bg-stone-900">
  <Image
    src={imageSrc}
    alt={product.name}
    width={800}
    height={900}
    className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
  />
</div>
        {product.featured ? (
          <span className="absolute left-4 top-4 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-stone-950">Featured</span>
        ) : null}
        <div className="absolute right-4 top-4">
          <WishlistButton productId={product.id} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500 dark:text-stone-400">{product.gender}</p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-stone-100">{product.name}</h3>
          </div>
          <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">${product.price}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-7 text-stone-600 dark:text-stone-400">{product.description}</p>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
          <span className="rounded-full border border-stone-200 px-3 py-1 dark:border-stone-700">{product.concentration}</span>
          <span className="rounded-full border border-stone-200 px-3 py-1 dark:border-stone-700">{product.size}</span>
          <span className="rounded-full border border-stone-200 px-3 py-1 dark:border-stone-700">{product.availability}</span>
        </div>
        <Link href={`/product/${product.slug}`} className="inline-flex items-center text-sm font-semibold text-stone-900 transition hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400">
          Discover notes →
        </Link>
      </div>
    </motion.article>
  );
}
