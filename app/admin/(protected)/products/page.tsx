"use client";

import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number | null;
  tags?: string | null;
  featured?: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
};

type ProductForm = {
  name: string;
  slug: string;
  description: string;
  price: string;
  tags: string;
  featured: boolean;
  isNew: boolean;
  bestSeller: boolean;
};

const emptyForm: ProductForm = {
  name: '',
  slug: '',
  description: '',
  price: '',
  tags: '',
  featured: false,
  isNew: false,
  bestSeller: false,
};

function parseTags(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((tag: string) => tag.trim())
    .filter(Boolean);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "")
    .replace(/--+/g, "-");
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setSelectedImages([]);
    setEditingId(null);
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price ? String(product.price) : '',
      tags: parseTags(product.tags).join(', '),
      featured: Boolean(product.featured),
      isNew: Boolean(product.isNew),
      bestSeller: Boolean(product.bestSeller),
    });
    setSelectedImages([]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const tags = parseTags(form.tags);

const uploadFiles = async (files: File[]) => {
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();
    urls.push(data.url);
  }

  return urls;
};

const gallery = selectedImages.length
  ? await uploadFiles(selectedImages)
  : [];

    const payload = {
      name: form.name.trim(),
      slug: form.slug || slugify(form.name),
      description: form.description.trim(),
      price: Number(form.price) || 0,
      tags,
      gallery,
      featured: form.featured,
      isNew: form.isNew,
      bestSeller: form.bestSeller,
      ...(editingId ? { id: editingId } : {}),
    };

    const res = await fetch('/api/admin/products', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSubmitting(false);

    if (res.ok) {
      resetForm();
      await load();
    } else {
      alert(editingId ? 'Update failed' : 'Create failed');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete product?')) return;
    const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (res.ok) await load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/80">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit product' : 'Add new product'}</h2>
          <p className="mt-1 text-sm text-stone-500">Create a new product or update an existing one.</p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
<input
  value={form.name}
  onChange={(e) => {
    const name = e.target.value;

    setForm({
      ...form,
      name,
      slug: slugify(name),
    });
  }}
  placeholder="Name"
  className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
/>
            <input
  value={form.slug}
  onChange={(e) =>
    setForm({
      ...form,
      slug: slugify(e.target.value),
    })
  }
  placeholder="Slug"
  className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
/>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              rows={4}
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
            <input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Price"
              type="number"
              step="0.01"
              className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Tags (comma separated, e.g. available, limited, pre-order)"
              className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setSelectedImages(Array.from(e.target.files || []))}
              className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 file:mr-3 file:rounded-full file:border-0 file:bg-stone-900 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
            />
            {selectedImages.length > 0 && (
              <p className="text-sm text-stone-500">{selectedImages.length} image{selectedImages.length > 1 ? 's' : ''} selected</p>
            )}

            <div className="grid gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900/60 sm:grid-cols-3">
              <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured product
              </label>
              <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
                <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} />
                New arrival
              </label>
              <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
                <input type="checkbox" checked={form.bestSeller} onChange={(e) => setForm({ ...form, bestSeller: e.target.checked })} />
                Best seller
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50" disabled={submitting}>
                {submitting ? (editingId ? 'Saving…' : 'Creating…') : editingId ? 'Save changes' : 'Add product'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 dark:border-stone-700 dark:text-stone-200">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/80">
          <h2 className="text-lg font-semibold">Existing products</h2>
          {loading ? (
            <p className="mt-4 text-sm text-stone-500">Loading...</p>
          ) : (
            <div className="mt-4 space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex items-start justify-between gap-3 rounded-2xl border border-stone-200 px-4 py-3 dark:border-stone-800">
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">{product.name}</p>
                    <p className="text-sm text-stone-500">{product.slug}</p>
                    {product.price !== undefined && product.price !== null && (
                      <p className="mt-1 text-sm text-amber-600">${product.price.toFixed(2)}</p>
                    )}
                    {parseTags(product.tags).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {parseTags(product.tags).map((tag: string) => (
                          <span key={tag} className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(product)} className="rounded-full border border-stone-300 px-3 py-1 text-sm font-semibold text-stone-700 dark:border-stone-700 dark:text-stone-200">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
