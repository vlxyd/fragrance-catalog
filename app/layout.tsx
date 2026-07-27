import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agape Essence | Premium Fragrance Catalog",
  description: "A luxury fragrance catalog with editorial storytelling, curated collections, and an elegant admin experience.",
  keywords: ["fragrance", "perfume", "luxury catalog", "premium scents"],
  openGraph: {
    title: "Agape Essence | Premium Fragrance Catalog",
    description: "Discover refined fragrances through a premium editorial experience.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
