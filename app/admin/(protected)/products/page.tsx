"use client";

import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number | null;
  tags?: string | null;

  gallery?: string[];

  brandId?: string;
  categoryId?: string;

  gender?: string;
  concentration?: string;
  size?: string;
  availability?: string;

  topNotes?: string[];
  middleNotes?: string[];
  baseNotes?: string[];

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

  brandId: string;
  categoryId: string;
  gender: string;
  concentration: string;
  size: string;
  availability: string;

  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];

  featured: boolean;
  isNew: boolean;
  bestSeller: boolean;
};

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  tags: "",

  brandId: "",
  categoryId: "",

  gender: "Unisex",
  concentration: "EDP",
  size: "100 ml",
  availability: "In stock",

  topNotes: [],
  middleNotes: [],
  baseNotes: [],

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

  useEffect(() => {
  console.log("FORM:", form);
  console.log("topNotes type:", typeof form.topNotes);
  console.log("isArray:", Array.isArray(form.topNotes));
}, [form]);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [topNoteInput, setTopNoteInput] = useState("");
  const [middleNoteInput, setMiddleNoteInput] = useState("");
  const [baseNoteInput, setBaseNoteInput] = useState("");

  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
setProducts(Array.isArray(data) ? data : []);

const brandsRes = await fetch("/api/admin/brands");
const brandsData = await brandsRes.json();
setBrands(brandsData);

const categoriesRes = await fetch("/api/admin/categories");
const categoriesData = await categoriesRes.json();
setCategories(categoriesData);
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
    console.log("topNotes:", product.topNotes);
console.log("middleNotes:", product.middleNotes);
console.log("baseNotes:", product.baseNotes);
    setEditingId(product.id);
  setForm({
  name: product.name,
  slug: product.slug,
  description: product.description || "",
  price: product.price ? String(product.price) : "",
  tags: parseTags(product.tags).join(", "),

  brandId: (product as any).brandId || "",
  categoryId: (product as any).categoryId || "",

  gender: (product as any).gender || "Unisex",
  concentration: (product as any).concentration || "EDP",
  size: (product as any).size || "100 ml",
  availability: product.availability || "In stock",

  topNotes: Array.isArray((product as any).topNotes)
  ? (product as any).topNotes
  : [],

middleNotes: Array.isArray((product as any).middleNotes)
  ? (product as any).middleNotes
  : [],

baseNotes: Array.isArray((product as any).baseNotes)
  ? (product as any).baseNotes
  : [],

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

  brandId: form.brandId,
  categoryId: form.categoryId,
  gender: form.gender,
  concentration: form.concentration,
  size: form.size,
  availability: form.availability,

  topNotes: form.topNotes,

  middleNotes: form.middleNotes,

  baseNotes: form.baseNotes,

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
  <div className="flex h-full min-h-0 flex-col overflow-hidden">
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Manage Products</h1>
    </div>

      <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit product' : 'Add new product'}</h2>
          <p className="mt-1 text-sm text-stone-500">Create a new product or update an existing one.</p>

          <div className="mt-4 flex-1 overflow-y-auto pr-2">
  <form
  id="product-form"
  onSubmit={handleSubmit}
    className="space-y-3"
  >
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

<p className="mt-4 text-sm font-semibold text-stone-700 dark:text-stone-200">
  Gender
</p>

<div className="mt-2 flex flex-wrap gap-2">
  {["Men", "Women", "Unisex"].map((gender) => (
    <button
      key={gender}
      type="button"
      onClick={() =>
        setForm({
          ...form,
          gender,
        })
      }
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        form.gender === gender
          ? "bg-amber-500 text-white"
          : "border border-stone-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
      }`}
    >
      {gender}
    </button>
  ))}
</div>

<p className="mt-4 text-sm font-semibold text-stone-700 dark:text-stone-200">
  Concentration
</p>

<div className="mt-2 flex flex-wrap gap-2">
  {["EDT", "EDP", "Parfum", "Elixir"].map((item) => (
    <button
      key={item}
      type="button"
      onClick={() =>
        setForm({
          ...form,
          concentration: item,
        })
      }
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        form.concentration === item
          ? "bg-amber-500 text-white"
          : "border border-stone-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
      }`}
    >
      {item}
    </button>
  ))}
</div>

<p className="mt-4 text-sm font-semibold text-stone-700 dark:text-stone-200">
  Bottle Size
</p>

<div className="mt-2 flex flex-wrap gap-2">
  {["30 ml", "50 ml", "100 ml", "200 ml"].map((size) => (
    <button
      key={size}
      type="button"
      onClick={() =>
        setForm({
          ...form,
          size,
        })
      }
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        form.size === size
          ? "bg-amber-500 text-white"
          : "border border-stone-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
      }`}
    >
      {size}
    </button>
  ))}
</div>

<p className="mt-4 text-sm font-semibold text-stone-700 dark:text-stone-200">
  Availability
</p>

<div className="mt-2 flex flex-wrap gap-2">
  {["In stock", "Out of stock", "Limited", "Pre-order"].map((status) => (
    <button
      key={status}
      type="button"
      onClick={() =>
        setForm({
          ...form,
          availability: status,
        })
      }
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        form.availability === status
          ? "bg-amber-500 text-white"
          : "border border-stone-300 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
      }`}
    >
      {status}
    </button>
  ))}
</div>

<p className="mt-4 text-sm font-semibold text-stone-700 dark:text-stone-200">
  Top Notes
</p>

<div className="mt-2 flex gap-2">
  <input
    value={topNoteInput}
    onChange={(e) => setTopNoteInput(e.target.value)}
    placeholder="Add a top note..."
    className="flex-1 rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
  />

  <button
    type="button"
    onClick={() => {
      if (!topNoteInput.trim()) return;

      setForm({
        ...form,
        topNotes: [...form.topNotes, topNoteInput.trim()],
      });

      setTopNoteInput("");
    }}
    className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
  >
    Add
  </button>
</div>

<div className="mt-3 flex flex-wrap gap-2">
  {form.topNotes.map((note, index) => (
    <button
      key={index}
      type="button"
      onClick={() =>
        setForm({
          ...form,
          topNotes: form.topNotes.filter((_, i) => i !== index),
        })
      }
      className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
    >
      {note} ✕
    </button>
  ))}
</div>

<p className="mt-4 text-sm font-semibold text-stone-700 dark:text-stone-200">
  Middle Notes
</p>

<div className="mt-2 flex gap-2">
  <input
    value={middleNoteInput}
    onChange={(e) => setMiddleNoteInput(e.target.value)}
    placeholder="Add a middle note..."
    className="flex-1 rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
  />

  <button
    type="button"
    onClick={() => {
      if (!middleNoteInput.trim()) return;

      setForm({
        ...form,
        middleNotes: [...form.middleNotes, middleNoteInput.trim()],
      });

      setMiddleNoteInput("");
    }}
    className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
  >
    Add
  </button>
</div>

<div className="mt-3 flex flex-wrap gap-2">
  {form.middleNotes.map((note, index) => (
    <button
      key={index}
      type="button"
      onClick={() =>
        setForm({
          ...form,
          middleNotes: form.middleNotes.filter((_, i) => i !== index),
        })
      }
      className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
    >
      {note} ✕
    </button>
  ))}
</div>

<p className="mt-4 text-sm font-semibold text-stone-700 dark:text-stone-200">
  Base Notes
</p>

<div className="mt-2 flex gap-2">
  <input
    value={baseNoteInput}
    onChange={(e) => setBaseNoteInput(e.target.value)}
    placeholder="Add a base note..."
    className="flex-1 rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
  />

  <button
    type="button"
    onClick={() => {
      if (!baseNoteInput.trim()) return;

      setForm({
        ...form,
        baseNotes: [...form.baseNotes, baseNoteInput.trim()],
      });

      setBaseNoteInput("");
    }}
    className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
  >
    Add
  </button>
</div>

<div className="mt-3 flex flex-wrap gap-2">
  {form.baseNotes.map((note, index) => (
    <button
      key={index}
      type="button"
      onClick={() =>
        setForm({
          ...form,
          baseNotes: form.baseNotes.filter((_, i) => i !== index),
        })
      }
      className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
    >
      {note} ✕
    </button>
  ))}
</div>

<select
  value={form.brandId}
  onChange={(e) => setForm({ ...form, brandId: e.target.value })}
  className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
>
  <option value="">Select Brand</option>

  {brands.map((brand) => (
    <option key={brand.id} value={brand.id}>
      {brand.name}
    </option>
  ))}
</select>

<select
  value={form.categoryId}
  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
  className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none focus:border-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
>
  <option value="">Select Category</option>

  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>


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

            </form>
          
          
          <div className="mt-4 flex items-center justify-end gap-3 border-t border-stone-800 pt-4">
  {editingId && (
    <button
      type="button"
      onClick={resetForm}
      className="rounded-full border border-stone-700 px-5 py-2 text-sm font-semibold"
    >
      Cancel
    </button>
  )}

  <button
    type="submit"
    form="product-form"
    disabled={submitting}
    className="rounded-full bg-amber-500 px-6 py-2 font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
  >
    {submitting
      ? editingId
        ? "Saving..."
        : "Creating..."
      : editingId
      ? "Save Changes"
      : "Add Product"}
  </button>
</div>
          </div>
        </div>

       <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6">
  <div className="border-b border-stone-800 pb-4">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">
        Existing Products
      </h2>

      <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400">
        {products.length} Products
      </span>
    </div>

    <input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search products..."
  className="mt-4 w-full rounded-full border border-stone-700 bg-stone-900 px-4 py-3 outline-none transition focus:border-amber-500"
/>
  </div>

  {loading ? (
            <p className="mt-4 text-sm text-stone-500">Loading...</p>
          ) : (
            <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-2">
              {products
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((product) => (
                <div
  key={product.id}
  className="flex items-start justify-between gap-4 rounded-2xl border border-stone-800 bg-stone-900 p-4"
>
  <div className="flex gap-4">

    <div className="h-16 w-16 overflow-hidden rounded-2xl bg-stone-800">
  {product.gallery?.[0] ? (
    <img
      src={product.gallery[0]}
      alt={product.name}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-2xl">
      📦
    </div>
  )}
</div>

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
