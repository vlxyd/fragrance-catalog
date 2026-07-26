import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import prisma from '@/lib/prisma';
import { ensureCatalogSeed } from '@/lib/catalog-seed';

async function isAdmin() {
  const session = await getServerSession(authOptions as any);
  return Boolean(session && (session as any).user?.role === 'ADMIN');
}

export async function GET() {
  try {
    await ensureCatalogSeed();
    const brands = await prisma.brand.findMany({ orderBy: { createdAt: 'asc' } });
    return NextResponse.json(brands);
  } catch (error) {
    return NextResponse.json({ error: 'Could not load brands' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const updated = await prisma.brand.update({
    where: { id: body.id },
    data: { featured: Boolean(body.featured) },
  });

  return NextResponse.json(updated);
}
