import prisma from '@/lib/prisma';
import { brands as staticBrands, categories as staticCategories, products as staticProducts } from '@/lib/catalog-data';

export async function ensureCatalogSeed() {
  const existingBrands = await prisma.brand.count();
  const existingProducts = await prisma.product.count();

  if (existingBrands > 0 && existingProducts > 0) {
    return;
  }

  for (const category of staticCategories) {
    await prisma.category.upsert({
      where: { slug: category.id },
      update: {
        name: category.name,
        description: category.description,
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.id,
        description: category.description,
      },
    });
  }

  for (const brand of staticBrands) {
    await prisma.brand.upsert({
      where: { slug: brand.id },
      update: {
        name: brand.name,
        description: brand.description,
        logoUrl: brand.logo,
      },
      create: {
        id: brand.id,
        name: brand.name,
        slug: brand.id,
        description: brand.description,
        logoUrl: brand.logo,
      },
    });
  }

  const categories = await prisma.category.findMany({ select: { id: true } });
  const categoryMap = new Map(categories.map((category) => [category.id, category.id]));
  const brands = await prisma.brand.findMany({ select: { id: true } });
  const brandMap = new Map(brands.map((brand) => [brand.id, brand.id]));

  for (const product of staticProducts) {
    const categoryId = categoryMap.get(product.categoryId);
    const brandId = brandMap.get(product.brandId);

    if (!categoryId || !brandId) continue;

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        brandId,
        categoryId,
        gender: product.gender,
        concentration: product.concentration,
        size: product.size,
        price: product.price,
        availability: product.availability,
        featured: product.featured,
        topNotes: JSON.stringify(product.notes.top),
        middleNotes: JSON.stringify(product.notes.middle),
        baseNotes: JSON.stringify(product.notes.base),
      },
      create: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        brandId,
        categoryId,
        gender: product.gender,
        concentration: product.concentration,
        size: product.size,
        price: product.price,
        availability: product.availability,
        featured: product.featured,
        topNotes: JSON.stringify(product.notes.top),
        middleNotes: JSON.stringify(product.notes.middle),
        baseNotes: JSON.stringify(product.notes.base),
        gallery: {
          create: product.gallery.map((url, index) => ({ url, position: index })),
        },
      },
    });
  }
}
