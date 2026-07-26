import prisma from '@/lib/prisma';
import { ensureCatalogSeed } from '@/lib/catalog-seed';

export type CatalogBrand = {
  id: string;
  name: string;
  description: string;
  logo: string;
  featured: boolean;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  brandId: string;
  categoryId: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  gender: string;
  concentration: string;
  size: string;
  price: number;
  availability: string;
  featured: boolean;
  isNew: boolean;
  bestSeller: boolean;
  image: string;
  gallery: string[];
  tags?: string | null;
};

function sanitizeImageUrl(value: unknown): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : '';
}

function normalizeProduct(product: any): CatalogProduct {
  const gallery = Array.isArray(product.gallery) && product.gallery.length > 0
    ? product.gallery
        .map((item: any) => sanitizeImageUrl(item?.url ?? item))
        .filter(Boolean)
    : [];

  const image = sanitizeImageUrl(product.image) || gallery[0] || '/product-velvet.svg';

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description || '',
    brandId: product.brandId,
    categoryId: product.categoryId,
    notes: {
      top: JSON.parse(product.topNotes || '[]'),
      middle: JSON.parse(product.middleNotes || '[]'),
      base: JSON.parse(product.baseNotes || '[]'),
    },
    gender: product.gender || 'Unisex',
    concentration: product.concentration || '',
    size: product.size || '',
    price: Number(product.price || 0),
    availability: product.availability || 'In stock',
    featured: Boolean(product.featured),
    isNew: Boolean(product.isNew),
    bestSeller: Boolean(product.bestSeller),
    image,
    gallery,
    tags: product.tags,
  };
}

function normalizeBrand(brand: any): CatalogBrand {
  return {
    id: brand.id,
    name: brand.name,
    description: brand.description || '',
    logo: brand.logoUrl || '✦',
    featured: Boolean(brand.featured),
  };
}

export async function getCatalogData() {
  await ensureCatalogSeed();
  const [brands, products] = await Promise.all([
    prisma.brand.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.product.findMany({
      include: { gallery: true, brand: true, category: true },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  const normalizedProducts = products.map(normalizeProduct);
  const normalizedBrands = brands.map(normalizeBrand);

  return {
    brands: normalizedBrands,
    products: normalizedProducts,
    featuredProducts: normalizedProducts.filter((product) => product.featured),
    newArrivals: normalizedProducts.filter((product) => product.isNew),
    bestSellers: normalizedProducts.filter((product) => product.bestSeller),
  };
}

export async function getProductBySlug(slug: string) {
  const { products } = await getCatalogData();
  return products.find((product) => product.slug === slug);
}

export async function getRelatedProducts(slug: string) {
  const product = await getProductBySlug(slug);
  if (!product) return [];
  const { products } = await getCatalogData();
  return products.filter((item) => item.id !== product.id && item.brandId === product.brandId).slice(0, 3);
}
