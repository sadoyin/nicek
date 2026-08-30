import Image from "next/image";
import Link from "next/link";
import { Globe2, Ship, Leaf, Factory, Package, ArrowLeft, PhoneCall } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const features = [
  { title: "Premium Shipping", desc: "Connecting global markets with fast, safe, and efficient container logistics from major American terminals.", icon: Ship },
  { title: "Agricultural Produce", desc: "Sourcing and shipping high-quality farm produce including grains, nuts, cocoa, and raw seeds.", icon: Leaf },
  { title: "Industrial Materials", desc: "Procuring raw and semi-finished industrial inputs that satisfy stringent international quality and safety benchmarks.", icon: Factory },
  { title: "Consumer Goods", desc: "Reliably shipping finished products for retail and consumer markets, expanding brand distribution borders.", icon: Package },
];

export default function ExportsPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">

      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('/images/optimized/upscalemedia-transformed-3-1.webp')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-2 border border-zinc-100 flex items-center justify-center shrink-0">
              <Image src="/images/optimized/AAE-removebg-preview.webp" alt="Anchor American Exports Logo" width={48} height={48} />
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Subsidiary Sector</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-1">
                Anchor American Exports
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
                Global Market Trade & Logistics
              </h2>
              <p className="text-zinc-650 dark:text-zinc-400 leading-relaxed text-base">
                Anchor American Exports connects global markets with premium exports from the Americas. We provide reliable shipping and procurement services for customers who want to procure specific products, directly managing trade corridors from supply origin to your local ports.
              </p>
              <p className="text-zinc-655 dark:text-zinc-405 leading-relaxed text-sm">
                By leveraging robust shipping partnerships, compliance systems, and strategic logistics hubs in the United States and Nigeria, we secure agricultural commodities, factory materials, and finished retail assets with unmatched efficiency.
              </p>
            </div>

            <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full rounded-2xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50">
              <Image src="/images/optimized/upscalemedia-transformed-3-1.webp" alt="Exports Representation" fill className="object-cover" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white text-center">
              Our Trading Operations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <Card key={idx} className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3.5 space-y-0 pb-3">
                      <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-650 dark:text-blue-400 rounded-lg">
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

          {/* CTA Block */}
          <div className="rounded-2xl bg-zinc-900 text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-radial-[circle_at_bottom_right] from-zinc-855 to-transparent opacity-50" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight relative z-10">
              Need a Trusted Cross-Border Importer?
            </h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm relative z-10">
              Submit your detailed procurement logs and destination port requirements. Our supply advisors will coordinate customs clearance and transport logs.
            </p>
            <div className="relative z-10 pt-2">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white text-zinc-950 px-6 py-3 font-semibold hover:bg-zinc-100 transition-colors">
                <PhoneCall className="w-4 h-4" /> Connect with Exports Division
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
