import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wrench, ShieldAlert, Cpu, Settings, Truck, ArrowLeft, PhoneCall, Radio } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Auto Spare Parts",
  description:
    "Anchor Auto Spare Parts sources and ships premium automotive components, replacement parts, and engines for workshops and mechanics worldwide.",
  openGraph: {
    title: "Auto Spare Parts | Nicek Group",
    description:
      "Anchor Auto Spare Parts sources and ships premium automotive components, replacement parts, and engines for workshops and mechanics worldwide.",
  },
};

const engineBrands = [
  "Toyota", "Hyundai", "Audi", "Ford", "Honda", "Kia", "Mercedes Benz", "BMW", "Nissan"
];

const features = [
  { title: "Sourced Engines", desc: "Specializing in the import of fully-tested engines for models including BMW, Toyota, Honda, and Mercedes-Benz.", icon: Cpu },
  { title: "OEM Spare Parts", desc: "Providing auto spare shops, retail dealers, and local mechanics with reliable and certified spare parts.", icon: Settings },
  { title: "Quality Assurance", desc: "Rigorous diagnostic testing before dispatching parts to guarantee safety, ROI, and durability.", icon: ShieldAlert },
  { title: "Logistics & Delivery", desc: "Direct distribution channels shipping components straight to workshops and parts retailers.", icon: Truck },
];

export default function AutosPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">

      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('/images/optimized/autoparts-scaled-bg.webp')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-2 border border-zinc-100 flex items-center justify-center shrink-0">
              <Image src="/images/optimized/logo_AAE-150x150.webp" alt="Anchor Auto Spare Parts Logo" width={48} height={48} />
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Subsidiary Sector</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-1">
                Anchor Auto Spare Parts
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
                Quality & Affordable Automobile Spares
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                Do you need reliable automobile spare parts? Anchor Auto Spare Parts has you covered. We source and ship premium automotive components and replacement parts that keep vehicles running smoothly and support drivers worldwide.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Our main focus is on bridging gaps in high-demand automobile spare markets. By working with top-tier international suppliers, we procure reliable components, assemblies, and complete engines, ensuring workshops have access to solid spares.
              </p>
            </div>

            <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full rounded-2xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50">
              <Image
                src="/images/optimized/autoparts-scaled.webp"
                alt="Auto Parts Representation"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Brands list */}
          <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 space-y-6">
            <h3 className="text-lg font-bold text-center tracking-tight text-zinc-900 dark:text-white">
              Supported Engine & Component Brands
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {engineBrands.map((brand, idx) => (
                <span key={idx} className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-semibold shadow-xs">
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Media Spotlight */}
          <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-650 dark:text-amber-400 rounded-lg">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-center tracking-tight text-zinc-900 dark:text-white">
                Anchor on the Airwaves
              </h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center max-w-2xl mx-auto">
              Take a listen to the Anchor Exports radio feature, spotlighting our sourcing and shipping operations connecting global markets.
            </p>
            <div className="relative aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800">
              <iframe
                src="https://www.youtube.com/embed/iWHrbK9yyMU"
                title="Anchor Exports: ALXR Radio Mix"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white text-center">
              Our Auto Divisions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <Card key={idx} className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3.5 space-y-0 pb-3">
                      <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-650 dark:text-amber-400 rounded-lg">
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
              I wanted to ship in three automobile engines, a BMW and two Toyota engines, but I did not know a trusted importer, Anchor Auto Spare Parts gave me solid engines my mechanics were shocked.
            </p>
            <div className="text-right text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-4 relative z-10">
              — Chief Nzugbe, Anchor Auto Spare Parts Client
            </div>
          </div>

          {/* CTA Block */}
          <div className="rounded-2xl bg-zinc-900 text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-radial-[circle_at_bottom_right] from-zinc-800 to-transparent opacity-50" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight relative z-10">
              Request Specific Engine or Spares Procurement
            </h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm relative z-10">
              Let us know what engines, transmissions, or electrical assemblies your auto store requires. We will source and ship directly to you.
            </p>
            <div className="relative z-10 pt-2">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white text-zinc-950 px-6 py-3 font-semibold hover:bg-zinc-100 transition-colors">
                <PhoneCall className="w-4 h-4" /> Place Parts Order
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
