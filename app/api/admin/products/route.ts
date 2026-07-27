import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import prisma from '@/lib/prisma';
import { ensureCatalogSeed } from '@/lib/catalog-seed';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

async function isAdmin() {
  const session = await getServerSession(authOptions as any);
  return Boolean(session && (session as any).user?.role === 'ADMIN');
}

async function getDefaultRelationIds() {
  const fallbackBrand = await prisma.brand.findFirst({ select: { id: true } });
  const fallbackCategory = await prisma.category.findFirst({ select: { id: true } });

  if (!fallbackBrand?.id || !fallbackCategory?.id) {
    throw new Error('No brand or category records found');
  }

  return { brandId: fallbackBrand.id, categoryId: fallbackCategory.id };
}

async function buildProductData(body: any, existing?: any) {
  const relations = await getDefaultRelationIds();
  const name = body.name || existing?.name || 'Untitled';
  const slug = slugify(
  body.slug || body.name || existing?.name || `p-${Date.now()}`
);
  const description = body.description ?? existing?.description ?? '';
  const price = body.price !== undefined && body.price !== '' ? Number(body.price) : existing?.price ?? 0;
  const tags = Array.isArray(body.tags)
    ? body.tags
    : String(body.tags || existing?.tags || '')
        .split(',')
        .map((tag: string) => tag.trim())
        .filter(Boolean);

  return {
    name,
    slug,
    description,
    brandId: body.brandId || existing?.brandId || relations.brandId,
    categoryId: body.categoryId || existing?.categoryId || relations.categoryId,
    gender: body.gender || existing?.gender || 'Unisex',
    concentration: body.concentration || existing?.concentration || '',
    size: body.size || existing?.size || '',
    price,
    availability: body.availability || existing?.availability || 'In stock',
    tags: tags.join(', '),
    featured: body.featured !== undefined ? Boolean(body.featured) : Boolean(existing?.featured),
    isNew: body.isNew !== undefined ? Boolean(body.isNew) : Boolean(existing?.isNew),
    bestSeller: body.bestSeller !== undefined ? Boolean(body.bestSeller) : Boolean(existing?.bestSeller),
    published: body.published !== undefined ? Boolean(body.published) : existing?.published !== false,
    topNotes: body.topNotes ? JSON.stringify(body.topNotes) : existing?.topNotes || '[]',
    middleNotes: body.middleNotes ? JSON.stringify(body.middleNotes) : existing?.middleNotes || '[]',
    baseNotes: body.baseNotes ? JSON.stringify(body.baseNotes) : existing?.baseNotes || '[]',
  };
}

export async function GET() {
  try {
    await ensureCatalogSeed();
    const products = await prisma.product.findMany({
    include: {
      gallery: true,
      brand: true,
      category: true,
    },
  });

  const normalizedProducts = products.map((product) => ({
    ...product,
    gallery: product.gallery.map((image) => image.url),
  }));

  return NextResponse.json(normalizedProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Could not load products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();

  try {
    const data = await buildProductData(body);
    const created = await prisma.product.create({
      data: {
        ...data,
        gallery: {
          create: (body.gallery || body.images || []).map((url: string, i: number) => ({ url, position: i })),
        },
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Could not create product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    const existing = await prisma.product.findUnique({ where: { id: body.id } });
    if (!existing) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    const { id, ...rest } = body;
    const data = await buildProductData(rest, existing);
    const updated = await prisma.product.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Could not update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
