"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { showToast } from "@/lib/toast";

export function WishlistButton({ productId }: { productId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("fragrance-wishlist") || "[]";
    const ids = JSON.parse(stored) as string[];
    setSaved(ids.includes(productId));
  }, [productId]);

  const toggleWishlist = () => {
    const stored = window.localStorage.getItem("fragrance-wishlist") || "[]";
    const ids = JSON.parse(stored) as string[];
    const next = ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId];
    window.localStorage.setItem("fragrance-wishlist", JSON.stringify(next));
    setSaved(next.includes(productId));
    showToast({ title: next.includes(productId) ? "Added to wishlist" : "Removed from wishlist", message: "Your selection is saved locally for this session." });
  };

  return (
    <button type="button" onClick={toggleWishlist} className={`rounded-full border p-2 transition ${saved ? "border-amber-500 bg-amber-500/10 text-amber-600" : "border-stone-200 bg-white/90 text-stone-700 dark:border-stone-700 dark:bg-stone-900/90 dark:text-stone-300"}`} aria-label="Toggle wishlist">
      <Heart size={16} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
