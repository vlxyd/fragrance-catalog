import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ensureCatalogSeed } from '@/lib/catalog-seed';

export async function GET() {
  await ensureCatalogSeed();
  const categories = await prisma.category.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(categories);
}
