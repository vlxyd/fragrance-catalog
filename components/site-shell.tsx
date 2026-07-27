"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MoonStar, SunMedium, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

type ToastState = {
  title: string;
  message: string;
};

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toast, setToast] = useState<ToastState | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("fragrance-theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("fragrance-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ToastState>).detail;
      setToast(detail);
      window.setTimeout(() => setToast(null), 2400);
    };

    window.addEventListener("app:toast", handler as EventListener);
    return () => window.removeEventListener("app:toast", handler as EventListener);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isAdminPath = useMemo(() => pathname?.startsWith("/admin"), [pathname]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.12),_transparent_35%),linear-gradient(135deg,_#fffdf8_0%,_#f7f2eb_100%)] text-stone-900 transition-colors dark:bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.14),_transparent_35%),linear-gradient(135deg,_#0f0d0a_0%,_#171411_100%)] dark:text-stone-100">
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/80 backdrop-blur-xl dark:border-stone-800 dark:bg-stone-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
  <Image
    src="/agape-logo.png"
    alt="Agape Essence"
    width={52}
    height={52}
    className="rounded-full"
    priority
  />

  <div className="leading-tight">
    <h1 className="text-lg font-semibold tracking-wide text-stone-900 dark:text-stone-100">
      AGAPE ESSENCE
    </h1>
    <p className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
      Love in a Bottle
    </p>
  </div>
</Link>
          <nav className="hidden items-center gap-6 text-sm font-medium uppercase tracking-[0.24em] text-stone-700 dark:text-stone-300 md:flex">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className={`transition ${active ? "text-amber-600 dark:text-amber-400" : "hover:text-amber-600 dark:hover:text-amber-400"}`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full border border-stone-300 p-2 transition hover:border-amber-500 hover:text-amber-600 dark:border-stone-700 dark:hover:text-amber-400"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <MoonStar size={18} /> : <SunMedium size={18} />}
            </button>
            <button
              type="button"
              className="rounded-full border border-stone-300 p-2 md:hidden dark:border-stone-700"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobileOpen ? (
          <div className="border-t border-stone-200 bg-white/95 px-4 py-4 md:hidden dark:border-stone-800 dark:bg-stone-950/95">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={`block py-2 text-sm uppercase tracking-[0.24em] ${pathname === item.href ? "text-amber-600" : "text-stone-700 dark:text-stone-300"}`}>
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <main className={`mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8 ${isAdminPath ? "" : "pb-16"}`}>
        {children}
      </main>

      <footer className="border-t border-stone-200/80 bg-stone-950 text-stone-200 dark:border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
          <div className="max-w-md">
            <p className="text-sm uppercase tracking-[0.32em] text-amber-400">Agape Essence Maison</p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              A premium fragrance catalog shaped by modern elegance, artisanal storytelling, and unforgettable notes.
            </p>
          </div>
          <div className="grid gap-8 text-sm sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm uppercase tracking-[0.24em] text-stone-100">Visit</h3>
              <p className="text-stone-400">12 Rue de Lumière</p>
              <p className="text-stone-400">Paris, FR 75001</p>
            </div>
            <div>
              <h3 className="mb-3 text-sm uppercase tracking-[0.24em] text-stone-100">Follow</h3>
              <div className="flex flex-col gap-2 text-stone-400">
                <a href="https://instagram.com" className="hover:text-amber-400">Instagram</a>
                <a href="https://x.com" className="hover:text-amber-400">X</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-5 right-5 z-50 rounded-2xl border border-amber-400/40 bg-stone-950 px-4 py-3 text-sm text-stone-100 shadow-2xl"
          >
            <p className="font-semibold">{toast.title}</p>
            <p className="text-stone-400">{toast.message}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
