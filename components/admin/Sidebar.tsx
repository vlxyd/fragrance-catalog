"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Package2,
  Tags,
  Mail,
  Settings,
  Sparkles,
} from "lucide-react";


const navigation = [
  {
    title: "Home",
    items: [
      {
        href: "/",
        label: "Home",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "Overview",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Catalog",
    items: [
      {
        href: "/admin/products",
        label: "Products",
        icon: Package2,
      },
      {
        href: "/admin/brands",
        label: "Brands",
        icon: Tags,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
  href: "/admin/inbox",
  label: "Inbox",
  icon: Mail,
},
      {
        href: "/admin/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {
  async function loadUnread() {
    try {
      const res = await fetch("/api/inbox");
      const data = await res.json();

      setUnreadCount(
        data.filter((item: any) => !item.is_read).length
      );
    } catch (err) {
      console.error(err);
    }
  }

  loadUnread();

  const interval = setInterval(loadUnread, 10000);

  return () => clearInterval(interval);
}, []);

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-stone-700/50 bg-[#171310]">
      {/* Logo */}
      {/* Logo */}
<div className="border-b border-stone-700/50 px-7 py-4">
  <Link
    href="/"
    className="flex items-center gap-3"
  >
    <Image
      src="/agape-logo.png"
      alt="Agape Essence"
      width={52}
      height={52}
      className="rounded-full"
      priority
    />

    <div>
      <h1 className="text-lg font-semibold tracking-wide text-stone-100">
        Agape Essence
      </h1>

      <p className="text-sm text-stone-500">
        Fragrance CMS
      </p>
    </div>
  </Link>
</div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {navigation.map((section) => (
          <div key={section.title} className="mb-8">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-amber-500/80">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                const active =
  item.href === "/"
    ? pathname === "/"
    : pathname === item.href;

                return (
                  <Link
  key={item.href}
  href={item.href}
  className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
    active
      ? "border-amber-500/30 bg-amber-500/10 text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.08)]"
      : "border-transparent text-stone-300 hover:border-stone-700 hover:bg-white/5 hover:text-white"
  }`}
>
                    <Icon
  size={19}
  className="transition-transform duration-300 group-hover:scale-110"
/>

                    <div className="flex w-full items-center justify-between">
  <span className="font-medium">
    {item.label}
  </span>

  {item.label === "Inbox" && unreadCount > 0 && (
    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-500 px-2 text-xs font-bold text-black">
      {unreadCount}
    </span>
  )}
</div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {/* Footer */}
<div className="border-t border-white/10 p-6">
  <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-stone-800 to-stone-900 p-4 shadow-lg">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-black">
        A
      </div>

      <div>
        <p className="font-semibold text-white">
          Administrator
        </p>

        <p className="text-sm text-stone-400">
          Premium CMS
        </p>
      </div>
    </div>
  </div>
</div>
    </aside>
  );
}