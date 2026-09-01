import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Droplet, Leaf, ShieldCheck, Heart, ArrowLeft, PhoneCall } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Food & Beverages",
  description:
    "C&C Food and Beverages manufactures premium bottled water and consumable beverages using locally sourced, eco-friendly ingredients and packaging.",
  openGraph: {
    title: "Food & Beverages | Nicek Group",
    description:
      "C&C Food and Beverages manufactures premium bottled water and consumable beverages using locally sourced, eco-friendly ingredients and packaging.",
  },
};

const features = [
  { title: "Table Water", desc: "Manufacturing purified, micro-filtered premium table bottled water for residential and commercial use.", icon: Droplet },
  { title: "Consumable Beverages", desc: "Crafting refreshing, high‑quality beverages that blend innovation with natural, nutritious recipes.", icon: Utensils },
  { title: "Local Sourcing", desc: "Committed to securing 100% organic, local farm ingredients to support farmers and ensure freshness.", icon: Leaf },
  { title: "Quality Assurance", desc: "Rigorous laboratory testing for purity, mineral content, and shelf safety in modern cleanrooms.", icon: ShieldCheck },
];

export default function FoodPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">

      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('/images/optimized/water-4998513_640.webp')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-2 border border-zinc-100 flex items-center justify-center shrink-0">
              <Image src="/images/optimized/CCFB-removebg-preview.webp" alt="C&C Food and Beverages Logo" width={48} height={48} />
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Subsidiary Sector</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-1">
                C&C Food and Beverages
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Copy */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Nutritious Food & Consumable Beverages
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                Committed to creating quality food and beverages that refresh, nourish, and bring people together. C&C Food and Beverages manufactures table water and consumable items using locally sourced ingredients, eco-friendly packaging, and strict quality assurance checks.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                We craft our beverages to blend nutrition with enjoyment, supporting local communities through fair-trade sourcing and minimizing ecological footprints with bio-degradable bottle designs and carbon-neutral distribution logs.
              </p>
            </div>

            <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full rounded-2xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50">
              <Image src="/images/optimized/water-4998513_640.webp" alt="Water Representation" fill className="object-cover" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white text-center">
              Our Beverage Divisions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <Card key={idx} className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3.5 space-y-0 pb-3">
                      <div className="p-2.5 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-650 dark:text-cyan-400 rounded-lg">
                        <Icon className="w-5 h-5" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <h4 className="text-base font-bold text-zinc-900 dark:text-white">{f.title}</h4>
                      <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed pt-1">
                        {f.desc}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-zinc-50/80 dark:bg-zinc-900/20 rounded-2xl p-6 sm:p-8 border border-zinc-200/40 dark:border-zinc-800/40 italic relative">
            <span className="text-6xl text-zinc-200 dark:text-zinc-800 font-serif absolute -top-2 left-4 select-none leading-none">“</span>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 relative z-10 leading-relaxed pt-2">
              For some years now, I have relied on C&C Food and Beverages to supply me with portable water, and I want to appreciate their dedication to restocking my house without my knowledge, premium services.
            </p>
            <div className="text-right text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-4 relative z-10">
              — Mrs. (Customer), C&C Food and Beverages Client
            </div>
          </div>

          {/* CTA Block */}
          <div className="rounded-2xl bg-zinc-900 text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-radial-[circle_at_bottom_right] from-zinc-800 to-transparent opacity-50" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight relative z-10">
              Set Up Scheduled Water or Beverage Delivery
            </h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm relative z-10">
              Get corporate water refills, retail distribution contracts, or custom recipe runs. Reach out to set up scheduled supply logs.
            </p>
            <div className="relative z-10 pt-2">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white text-zinc-950 px-6 py-3 font-semibold hover:bg-zinc-100 transition-colors">
                <PhoneCall className="w-4 h-4" /> Place Supply Order
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
