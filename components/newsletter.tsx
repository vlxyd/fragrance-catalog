"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function Newsletter() {

const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

async function handleSubscribe() {
  if (!email.trim()) {
    setMessage("Please enter your email.");
    return;
  }

  setLoading(true);
  setMessage("");

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert([
      {
        email: email.trim().toLowerCase(),
      },
    ]);

  if (error) {
    if (error.code === "23505") {
      setMessage("You're already subscribed.");
    } else {
      setMessage(error.message);
    }
  } else {
    setMessage("Thanks for subscribing!");
    setEmail("");
  }

  setLoading(false);
}

  return (
    <section className="rounded-[2.5rem] border border-stone-200/80 bg-stone-900 p-8 text-stone-100 shadow-[0_24px_80px_rgba(0,0,0,0.12)] dark:border-stone-700">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-amber-400">
            Newsletter
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Receive early access to new releases.
          </h2>

          <p className="mt-3 max-w-xl text-base leading-8 text-stone-300">
            Join our private list for seasonal launches, limited offers, and
            first access to our catalog edit.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email address"
  className="rounded-full border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100 outline-none"
/>

          <button
  onClick={handleSubscribe}
  disabled={loading}
  className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 disabled:opacity-50"
>
  {loading ? "Subscribing..." : "Subscribe"}
</button>

{message && (
  <p className="mt-4 text-sm text-amber-300">
    {message}
  </p>
)}
        </div>
      </div>
    </section>
  );
}