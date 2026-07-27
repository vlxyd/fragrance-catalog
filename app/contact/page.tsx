import { Camera, Mail, MapPin, Phone } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/agapeessence.official/", icon: Camera },
  { label: "Email", href: "mailto:hello@aurelia.com", icon: Mail },
];

export default function ContactPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/80">
        <p className="text-sm uppercase tracking-[0.34em] text-amber-600">Contact Agape Essence</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">We would love to welcome you into the collection.</h1>
        <div className="mt-8 space-y-4 text-sm text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-3"><Mail className="text-amber-600" size={18} /> hello@aurelia.com</div>
          <div className="flex items-center gap-3"><Phone className="text-amber-600" size={18} /> +33 1 45 00 12 34</div>
          <div className="flex items-center gap-3"><MapPin className="text-amber-600" size={18} /> 12 Rue de Lumière, Paris</div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a key={social.label} href={social.href} className="flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-amber-500 hover:text-amber-600 dark:border-stone-700 dark:text-stone-300">
                <Icon size={16} /> {social.label}
              </a>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/80">
        <form className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <input className="rounded-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950" placeholder="Name" />
            <input className="rounded-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950" placeholder="Email" />
          </div>
          <input className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950" placeholder="Subject" />
          <textarea rows={5} className="w-full rounded-[1.5rem] border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950" placeholder="Tell us about your interest." />
          <button type="submit" className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:bg-amber-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-amber-400">
            Send inquiry
          </button>
        </form>
      </section>

      <section className="lg:col-span-2">
        <div className="overflow-hidden rounded-[2.5rem] border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
          <iframe src="https://www.google.com/maps?q=Paris%20Rue%20de%20Lumiere&z=13&output=embed" className="h-[320px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </div>
  );
}
