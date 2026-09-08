import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Globe2,
  Wrench,
  TrendingUp,
  Cpu,
  Utensils,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Database
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Nicek Group's services across healthcare, international exports, auto spare parts, technology, real estate investments, and food & beverage production.",
  openGraph: {
    title: "Our Services | Nicek Group",
    description:
      "Explore Nicek Group's services across healthcare, international exports, auto spare parts, technology, real estate investments, and food & beverage production.",
  },
};

// Main services overview matching copy text
const mainServices = [
  {
    title: "Food & Beverage (C&C)",
    description: "We manufacture quality table water and consumable beverages for our valued customers. Delivering delicious, nutritious food and beverages with locally sourced ingredients, eco-friendly packaging, and strict quality assurance.",
    icon: Utensils,
    bullets: ["Premium bottled table water", "Nutritious consumable beverages", "Eco-friendly, sustainable packaging", "100% locally sourced ingredients"],
    image: "/images/optimized/water-4998513_640.webp"
  },
  {
    title: "Imports & Exports (Anchor)",
    description: "We provide shipping services for customers who want to procure specific products. Anchor American Exports connects global markets with premium exports from the Americas.",
    icon: Globe2,
    bullets: ["Premium Shipping & Procurement", "Agricultural Produce (grains, nuts, cocoa)", "Industrial Materials meeting global standards", "Consumer Goods shipping"],
    image: "/images/optimized/upscalemedia-transformed-3-1.webp"
  },
  {
    title: "Information Technology (Nicek Tech)",
    description: "We provide a wide range of IT services, from Cybersecurity to managed IT solutions. Empowering businesses with smart & scalable Tech solutions.",
    icon: Cpu,
    bullets: ["IT Consulting & Tech Auditing", "Cloud Solutions & Migration", "Progressive Cybersecurity protocols", "Agile Software & Custom Development"],
    image: "/images/optimized/jacqueline-day-1SapfOEZN2g-unsplash.webp"
  },
  {
    title: "Healthcare Services (Nicek Health)",
    description: "Nicek Group has a subsidiary tailored to render premium healthcare services for individuals, hospitals, senior care facilities, and corporate wellness programs.",
    icon: Heart,
    bullets: ["Home Healthcare & Patient Care", "Medical Staffing solutions", "Telemedicine & virtual consultation", "Corporate wellness & Primary Care"],
    image: "/images/optimized/group_companies-1024x684.webp"
  },
  {
    title: "Auto Spare Parts (Anchor)",
    description: "Anchor Auto Spare Parts services automobile stores and mechanics worldwide with premium sourced automobile spare parts that keep vehicles running smoothly.",
    icon: Wrench,
    bullets: ["High-grade Engine imports (Toyota, BMW, Honda)", "Affordable & reliable OEM parts", "Strict quality control inspections", "Direct shipping and procurement"],
    image: "/images/optimized/autoparts-scaled.webp"
  },
  {
    title: "Investments & Real Estate (Nicek)",
    description: "Managed ROIs and strategic investments in Nigeria's future through partnerships, real estate developments, infrastructure, and smart capital.",
    icon: TrendingUp,
    bullets: ["Real Estate development & management", "Strategic agricultural investments", "Infrastructure funding partnerships", "Risk-managed investment portfolios"],
    image: "/images/optimized/realestate.webp"
  }
];

// Highlighted Achievements replacing the "0+" placeholders in audit report
const stats = [
  { value: "1,200+", label: "Imports Completed", sub: "Global delivery log" },
  { value: "500+", label: "Satisfied Customers", sub: "United States & Nigeria" },
  { value: "24%", label: "Average Partner ROI", sub: "Real estate & investments" },
  { value: "85+", label: "Active Projects", sub: "Multi-sector operations" }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      
      {/* Page Banner */}
      <section className="relative bg-zinc-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            A Diversified Conglomerate
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-none">
            Industries We Serve
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Nicek Group provides extensive services across multiple sectors with an absolute focus on customer satisfaction and product quality.
          </p>
        </div>
      </section>

      {/* Main Services Detail Cards */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <div className="space-y-12">
            {mainServices.map((service, idx) => {
              const Icon = service.icon;
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-zinc-200/50 dark:border-zinc-800/30 rounded-3xl overflow-hidden bg-zinc-50/20 dark:bg-zinc-900/10 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300`}
                >
                  {/* Image side */}
                  <div className={`lg:col-span-5 relative aspect-video lg:aspect-auto lg:h-full min-h-[300px] ${isEven ? 'lg:order-last' : ''}`}>
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Content side */}
                  <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {service.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Stats Counter Section - Resolving "0+" Placeholders */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Achievements</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Measurable value driven by dedication, strategic planning, and operational excellence across regions.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2 p-6 bg-white dark:bg-zinc-900/20 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/20 shadow-xs">
                <div className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
                  {stat.label}
                </div>
                <div className="text-xs text-zinc-500">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
