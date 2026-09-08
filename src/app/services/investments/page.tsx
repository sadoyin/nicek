import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Building2, Landmark, Tractor, LineChart, ArrowLeft, PhoneCall } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Investments & Real Estate",
  description:
    "Nicek Investments delivers strategic real estate development, agricultural investments, and infrastructure funding partnerships across Nigeria and beyond.",
  openGraph: {
    title: "Investments & Real Estate | Nicek Group",
    description:
      "Nicek Investments delivers strategic real estate development, agricultural investments, and infrastructure funding partnerships across Nigeria and beyond.",
  },
};

const features = [
  { title: "Real Estate Development", desc: "Investing in high-yield residential, commercial, and mixed-use property portfolios.", icon: Building2 },
  { title: "Strategic Agriculture", desc: "Partnering in modernized agro-allied projects that strengthen local farming grids and output.", icon: Tractor },
  { title: "Infrastructure Projects", desc: "Collaborating on capital-intensive public-private initiatives that enrich local communities.", icon: Landmark },
  { title: "Risk-Managed Portfolios", desc: "Deploying deep market insights to build sound investment structures yielding robust returns.", icon: LineChart },
];

export default function InvestmentsPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">

      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('/images/optimized/realestate-bg.webp')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-2 border border-zinc-100 flex items-center justify-center shrink-0">
              <Image src="/images/optimized/NRE-removebg-preview-150x150.webp" alt="Nicek Investments Logo" width={48} height={48} />
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Subsidiary Sector</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-1">
                Nicek Investments
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
                Strategic Partnerships & Capital Growth
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                We create lasting value through strategic investment portfolios, with a strong emphasis on real estate, helping clients and institutional partners achieve sustainable growth.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Government partners, entrepreneurs, and global investors can key into Nicek Investments Nigeria Ltd and add to creating more jobs, community development, and substantial ROI. By leveraging deep market insights and strict risk management, we maximize community impact and investor returns.
              </p>
            </div>

            <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full rounded-2xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50">
              <Image src="/images/optimized/realestate.webp" alt="Investments Representation" fill className="object-cover" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white text-center">
              Our Investment Portfolios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <Card key={idx} className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3.5 space-y-0 pb-3">
                      <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-650 dark:text-emerald-400 rounded-lg">
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
            <div className="absolute inset-0 bg-radial-[circle_at_bottom_right] from-zinc-800 to-transparent opacity-50" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight relative z-10">
              Interested in Strategic Partnerships?
            </h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm relative z-10">
              Connect with our portfolio managers to review available projects, real estate ventures, and infrastructure opportunities in Nigeria and the US.
            </p>
            <div className="relative z-10 pt-2">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white text-zinc-950 px-6 py-3 font-semibold hover:bg-zinc-100 transition-colors">
                <PhoneCall className="w-4 h-4" /> Schedule Investment Advisory
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
