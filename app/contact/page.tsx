"use client";

import { useState } from "react";
import { Camera, Mail, MapPin, Phone } from "lucide-react";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/agapeessence.official/",
    icon: Camera,
  },
  {
    label: "Email",
    href: "mailto:therealagapessence@gmail.com",
    icon: Mail,
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to send inquiry.");
        return;
      }

      alert("Inquiry sent successfully!");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/80">
        <p className="text-sm uppercase tracking-[0.34em] text-amber-600">
          Contact Agape Essence
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          We would love to welcome you into the collection.
        </h1>

        <div className="mt-8 space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="text-amber-600" size={18} />
            therealagapessence@gmail.com
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-amber-600" size={18} />
            +33 1 45 00 12 34
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-amber-600" size={18} />
            12 Rue de Lumière, Paris
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {socials.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold transition hover:border-amber-500 hover:text-amber-600"
              >
                <Icon size={16} />
                {social.label}
              </a>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/80">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Name"
              className="rounded-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950"
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Email"
              className="rounded-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950"
            />
          </div>

          <input
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            placeholder="Subject"
            className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950"
          />

          <textarea
            rows={5}
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            placeholder="Tell us about your interest."
            className="w-full rounded-[1.5rem] border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </section>

      <section className="lg:col-span-2">
        <div className="overflow-hidden rounded-[2.5rem] border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
          <iframe
            src="https://www.google.com/maps?q=Paris%20Rue%20de%20Lumiere&z=13&output=embed"
            className="h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}