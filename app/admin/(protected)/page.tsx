"use client";

import { LayoutDashboard, Package, Sparkles, Tag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

type Brand = { id: string; name: string; featured?: boolean };
type Product = { id: string; name: string; featured?: boolean; isNew?: boolean; bestSeller?: boolean };

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  async function load() {
    try {
      const [productsRes, brandsRes] = await Promise.all([fetch("/api/admin/products"), fetch("/api/admin/brands")]);
      if (!productsRes.ok || !brandsRes.ok) throw new Error('Failed to load admin catalog');
      const nextProducts = await productsRes.json();
      const nextBrands = await brandsRes.json();
      setProducts(Array.isArray(nextProducts) ? nextProducts : []);
      setBrands(Array.isArray(nextBrands) ? nextBrands : []);
    } catch {
      setProducts([]);
      setBrands([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleProductFlag(id: string, key: "featured" | "isNew" | "bestSeller", value: boolean) {
    setSaving(id);
    const res = await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [key]: value }),
    });
    if (res.ok) {
      await load();
    }
    setSaving(null);
  }

  async function toggleBrandFeatured(id: string, value: boolean) {
    setSaving(id);
    const res = await fetch("/api/admin/brands", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, featured: value }),
    });
    if (res.ok) {
      await load();
    }
    setSaving(null);
  }

  const metrics = [
    { label: "Total Products", value: products.length, icon: Package },
    { label: "Featured Products", value: products.filter((product) => product.featured).length, icon: Sparkles },
    { label: "New Arrivals", value: products.filter((product) => product.isNew).length, icon: Tag },
    { label: "Featured Brands", value: brands.filter((brand) => brand.featured).length, icon: UserRound },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/80">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-amber-300 bg-amber-100 p-3 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
            <LayoutDashboard size={18} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-amber-600">Admin dashboard</p>
            <h1 className="text-3xl font-semibold text-stone-900 dark:text-stone-100">Aurelia operations overview</h1>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-950/70">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-stone-500 dark:text-stone-400">{metric.label}</p>
                  <Icon size={18} className="text-amber-600" />
                </div>
                <p className="mt-4 text-3xl font-semibold text-stone-900 dark:text-stone-100">{metric.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-amber-600">Content curation</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900 dark:text-stone-100">Manage curated homepage sections</h2>
          </div>
          <a href="/admin/products" className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-stone-100 transition hover:bg-amber-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-amber-400">Manage catalog</a>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-950/70">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Products</h3>
            <div className="mt-4 space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[1.1rem] border border-stone-200 bg-white/70 px-3 py-3 dark:border-stone-800 dark:bg-stone-900/70">
                  <p className="font-medium text-stone-900 dark:text-stone-100">{product.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "featured", label: "Featured" },
                      { key: "isNew", label: "New" },
                      { key: "bestSeller", label: "Best seller" },
                    ].map((flag) => (
                      <label key={flag.key} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                        <input
                          type="checkbox"
                          checked={Boolean((product as any)[flag.key])}
                          onChange={(event) => toggleProductFlag(product.id, flag.key as any, event.target.checked)}
                        />
                        {flag.label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-950/70">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Featured brands</h3>
            <div className="mt-4 space-y-3">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-between rounded-[1.1rem] border border-stone-200 bg-white/70 px-3 py-3 dark:border-stone-800 dark:bg-stone-900/70">
                  <p className="font-medium text-stone-900 dark:text-stone-100">{brand.name}</p>
                  <label className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                    <input type="checkbox" checked={Boolean(brand.featured)} onChange={(event) => toggleBrandFeatured(brand.id, event.target.checked)} />
                    Featured
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {saving && <p className="mt-4 text-sm text-amber-600">Saving changes…</p>}
      </section>
    </div>
  );
}
