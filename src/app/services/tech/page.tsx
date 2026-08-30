import Image from "next/image";
import Link from "next/link";
import { Cpu, ShieldCheck, Cloud, Code2, Users, ArrowLeft, PhoneCall } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const features = [
  { title: "IT Consulting", desc: "Strategic technology roadmaps designed to streamline operations and align with business objectives.", icon: Users },
  { title: "Cloud Solutions", desc: "Secure cloud architecture, migration, and management for Amazon Web Services (AWS) and Azure.", icon: Cloud },
  { title: "Cybersecurity", desc: "Comprehensive threat monitoring, penetration testing, and regulatory data compliance setups.", icon: ShieldCheck },
  { title: "Agile Development", desc: "Fast-paced, iterative web and software engineering delivering high-performing platforms.", icon: Code2 },
];

export default function TechPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">

      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('/images/optimized/jacqueline-day-1SapfOEZN2g-unsplash.webp')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-2 border border-zinc-100 flex items-center justify-center shrink-0">
              <Image src="/images/optimized/NTL-removebg-preview-150x150.webp" alt="Nicek Technologies Logo" width={48} height={48} />
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Subsidiary Sector</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-1">
                Nicek Technologies
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
                Empowering Businesses with Smart IT Solutions
              </h2>
              <p className="text-zinc-650 dark:text-zinc-400 leading-relaxed text-base">
                We pioneer transformative information technology solutions, from customized platform development to scalable enterprise software, empowering businesses to thrive in the digital age.
              </p>
              <p className="text-zinc-655 dark:text-zinc-405 leading-relaxed text-sm">
                Nicek Technologies delivers innovative IT solutions that empower companies to operate efficiently and securely. From cybersecurity audits and managed cloud setups to custom agile software integrations, we keep your digital infrastructure robust.
              </p>
            </div>

            <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full rounded-2xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50">
              <Image src="/images/optimized/jacqueline-day-1SapfOEZN2g-unsplash.webp" alt="Tech Representation" fill className="object-cover" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white text-center">
              Our Tech Divisions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <Card key={idx} className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3.5 space-y-0 pb-3">
                      <div className="p-2.5 bg-violet-50 dark:bg-violet-950/40 text-violet-650 dark:text-violet-400 rounded-lg">
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
            <p className="text-sm sm:text-base text-zinc-650 dark:text-zinc-400 relative z-10 leading-relaxed pt-2">
              So my children came home and continued disturbing me about some school program and they need laptops and detailed specifications, Nicek Technologies bailed me out and procured them all.
            </p>
            <div className="text-right text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-4 relative z-10">
              — Taiwo Ogunsaya, Nicek Technologies Client
            </div>
          </div>

          {/* CTA Block */}
          <div className="rounded-2xl bg-zinc-900 text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-radial-[circle_at_bottom_right] from-zinc-855 to-transparent opacity-50" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight relative z-10">
              Initiate a Digital Transformation Review
            </h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm relative z-10">
              Get in touch with our solutions architects to design custom platforms, run security audits, or manage cloud configurations.
            </p>
            <div className="relative z-10 pt-2">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white text-zinc-950 px-6 py-3 font-semibold hover:bg-zinc-100 transition-colors">
                <PhoneCall className="w-4 h-4" /> Start Tech Project
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
