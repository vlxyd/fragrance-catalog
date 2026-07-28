"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/10 bg-white/70 px-8 backdrop-blur-xl">

      {/* Left */}
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-amber-500">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-stone-900">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            placeholder="Search..."
            className="w-72 rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-amber-400"
          />
        </div>

        {/* Notification */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white hover:bg-stone-100">
          <Bell size={18} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-bold text-black">
            A
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-stone-900">
              Administrator
            </p>

            <p className="text-sm text-stone-500">
              Super Admin
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}