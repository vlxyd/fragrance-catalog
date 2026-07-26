import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://example.com";
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/shop`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...products.map((product) => ({ url: `${baseUrl}/product/${product.slug}`, lastModified: new Date() })),
  ];
}
