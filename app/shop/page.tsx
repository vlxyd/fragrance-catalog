"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { useEffect } from "react";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "price", label: "Price" },
];

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");
  const [gender, setGender] = useState("all");
  const [sort, setSort] = useState("featured");
  const [availability, setAvailability] = useState("all");
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/admin/products');
      const productsData = await res.json();
      setProducts(productsData);
      const brandsRes = await fetch('/api/admin/brands');
      const brandsData = await brandsRes.json();
      setBrands(brandsData);
      const categoriesRes = await fetch('/api/admin/categories');
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData);
    }
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    const next = products.filter((product: any) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase());
      const matchesBrand = brand === "all" || product.brandId === brand;
      const matchesCategory = category === "all" || product.categoryId === category;
      const matchesGender = gender === "all" || product.gender === gender;
      const matchesAvailability = availability === "all" || product.availability === availability;
      return matchesQuery && matchesBrand && matchesCategory && matchesGender && matchesAvailability;
    });

    return next.sort((a: any, b: any) => {
      if (sort === "newest") return Number(b.isNew) - Number(a.isNew);
      if (sort === "alphabetical") return a.name.localeCompare(b.name);
      if (sort === "price") return a.price - b.price;
      return Number(b.featured) - Number(a.featured);
    });
  }, [availability, brand, category, gender, products, query, sort]);

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/80 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-amber-600">Curated collection</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl">
              Discover signatures crafted for quiet luxury.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-400">
              Browse our contemporary fragrance library with refined filters, thoughtful notes, and elegant house stories.
            </p>
          </div>
          <div className="rounded-[2rem] border border-stone-200 bg-stone-900 p-8 text-stone-100 dark:border-stone-700">
            <p className="text-sm uppercase tracking-[0.32em] text-amber-400">Search & refine</p>
            <div className="mt-4 space-y-4">
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-full border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100 outline-none ring-0" placeholder="Search a fragrance" />
              <div className="grid gap-3 sm:grid-cols-2">
                <select value={brand} onChange={(event) => setBrand(event.target.value)} className="rounded-full border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100">
                  <option value="all">All brands</option>
                  {brands.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-full border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100">
                  <option value="all">All categories</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                <select value={gender} onChange={(event) => setGender(event.target.value)} className="rounded-full border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100">
                  <option value="all">All genders</option>
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Unisex">Unisex</option>
                </select>
                <select value={availability} onChange={(event) => setAvailability(event.target.value)} className="rounded-full border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100">
                  <option value="all">Availability</option>
                  <option value="In stock">In stock</option>
                  <option value="Pre-order">Pre-order</option>
                  <option value="Limited">Limited</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Collection" title="Refined scents for every ritual" description="Sort by newest arrivals, signature favorites, or price to find the fragrance that matches your mood." />
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-stone-300 bg-white/80 px-4 py-3 text-sm text-stone-700 outline-none dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-200">
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
