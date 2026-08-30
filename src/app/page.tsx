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
} from "lucide-react";
import { ExpandableText } from "@/components/ExpandableText";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Subsidiary company data matching the exact copy and logo assets
const subsidiaries = [
  {
    name: "Nicek Healthcare Services",
    sector: "Healthcare",
    description:
      "We deliver trusted healthcare solutions focused on quality, innovation, and patient well‑being.",
    logo: "/images/optimized/NHS-removebg-preview-150x150.webp",
    icon: Heart,
    color:
      "from-rose-500/20 to-red-500/10 dark:from-rose-900/30 dark:to-red-950/10",
    borderHover: "hover:border-rose-400 dark:hover:border-rose-700",
    badgeColor:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
  },
  {
    name: "Anchor American Exports",
    sector: "Exports",
    description:
      "We connect local producers to global markets, delivering quality goods through efficient and reliable export solutions.",
    logo: "/images/optimized/AAE-removebg-preview.webp",
    icon: Globe2,
    color:
      "from-blue-500/20 to-indigo-500/10 dark:from-blue-900/30 dark:to-indigo-950/10",
    borderHover: "hover:border-blue-400 dark:hover:border-blue-700",
    badgeColor:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  },
  {
    name: "Anchor Auto Spare Parts",
    sector: "Autos",
    description:
      "Providing reliable & affordable auto spare parts that keep vehicles running smoothly and support drivers.",
    logo: "/images/optimized/logo_AAE-150x150.webp",
    icon: Wrench,
    color:
      "from-amber-500/20 to-orange-500/10 dark:from-amber-900/30 dark:to-orange-950/10",
    borderHover: "hover:border-amber-400 dark:hover:border-amber-700",
    badgeColor:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
  },
  {
    name: "Nicek Investments",
    sector: "Investments",
    description:
      "We create lasting value through strategic investments, with a strong emphasis on real estate, helping clients achieve sustainable growth.",
    logo: "/images/optimized/NRE-removebg-preview-150x150.webp",
    icon: TrendingUp,
    color:
      "from-emerald-500/20 to-teal-500/10 dark:from-emerald-900/30 dark:to-teal-950/10",
    borderHover: "hover:border-emerald-400 dark:hover:border-emerald-700",
    badgeColor:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  },
  {
    name: "Nicek Technologies",
    sector: "Tech",
    description:
      "We deliver innovative IT solutions that empower businesses to operate efficiently, securely, and grow in the digital age.",
    logo: "/images/optimized/NTL-removebg-preview-150x150.webp",
    icon: Cpu,
    color:
      "from-violet-500/20 to-purple-500/10 dark:from-violet-900/30 dark:to-purple-950/10",
    borderHover: "hover:border-violet-400 dark:hover:border-violet-700",
    badgeColor:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800",
  },
  {
    name: "C&C Food and Beverages",
    sector: "Food",
    description:
      "Committed to creating quality food and beverages that refresh, nourish, and bring people together.",
    logo: "/images/optimized/CCFB-removebg-preview.webp",
    icon: Utensils,
    color:
      "from-cyan-500/20 to-sky-500/10 dark:from-cyan-900/30 dark:to-sky-950/10",
    borderHover: "hover:border-cyan-400 dark:hover:border-cyan-700",
    badgeColor:
      "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800",
  },
];

// Highlighted Achievements replacing the "0+" placeholders in audit report
const stats = [
  { value: "1,200+", label: "Imports Completed", sub: "Global delivery log" },
  {
    value: "500+",
    label: "Satisfied Customers",
    sub: "United States & Nigeria",
  },
  {
    value: "24%",
    label: "Average Partner ROI",
    sub: "Real estate & investments",
  },
  { value: "85+", label: "Active Projects", sub: "Multi-sector operations" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 border-b border-zinc-200/50 dark:border-zinc-800/30">
        <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-zinc-200/30 via-transparent to-transparent dark:from-zinc-900/30 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Operations in US & Nigeria
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
                Sustainable value across{" "}
                <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
                  healthcare, trade, and technology.
                </span>
              </h1>
              <ExpandableText
                lines={6}
                className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0"
              >
                <strong>NICEK GROUP</strong>
                <br />
                <strong>Company Overview</strong> <br />
                Welcome to NICEK Group LLC, a diversified conglomerate operating
                across the United States and Nigeria. NICEK spans trade,
                agriculture, health care, real estate and technology-united by a
                common focus on cross-border commence and scalable,
                export-oriented business model.
                <br />
                <strong>OUR BUSINESS</strong>
                <br />
                Anchor American Exports (Flagship)-Used auto parts export
                business. Sources vehocles and parts from U.S. Suppliers and
                operate warehouse in Ladipo, Lagos-one of the regions major auto
                parts markets-supported by a warehouse and marketing team on the
                ground.
                <br />
                <strong>NICEK</strong> Healthcare Services - Our healthcare
                services division.
                <br />
                C&C Foods and Beverages - Food and beverage opearations,
                including a cassava value chain venture (garri/cassava flour
                aggregation, with longer-term ambitions in HQCF and industrial
                starch export) and a planned bakery in Uli, Anambra State.
                <br />
                <strong>NICEK</strong> Investment Nigeria Ltd - Real estae and
                investments, including exploration an integratedfarming venture
                (piggery, aquaculture, and waste-to-wealth model) in Oguta LGA,
                Imo State.
                <br />
                <strong>NICEK</strong> Technologies LLC - IT and software,
                building internal tools such as an inventory-tracking
                application used by the auto parts business.
                <br />
                <strong>HOW WE OPERATE</strong> <br />
                Cross-border by design - Teams and operations spanning U.S and
                Nigeria, built to move goods, capital and information across
                both markets. Export-oriented - Our strongets lines - auto parts
                and agro-processing - are built around trde and export, not just
                domestic scale. Building institutional-grade financing - Moving
                from short-term financing toward stronger trade lines,
                invoice/purchase-order financing, and development finance
                institution (DFI) backed capital. Diversified, not scattered -
                Each business line is chosen to complement the others - ttrade,
                agriculture, healthcare, real estate, and technology - rather
                than concentrate risk in one industry.
                <br />
                <strong>NICEK GROUP LLC .</strong> United States - Nigeria.
              </ExpandableText>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="#subsidiaries"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-6 py-3 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all gap-2 group shadow-sm"
                >
                  Explore Subsidiaries
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white px-6 py-3 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Our Mission
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100">
                <Image
                  src="/images/optimized/upscalemedia-transformed-3-1.webp"
                  alt="Nicek Group Corporate Banner"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section: Subsidiary Offerings */}
      <section
        id="subsidiaries"
        className="py-24 bg-white dark:bg-zinc-950 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Our Subsidiary Companies
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              With a strong commitment to innovation, integrity, and impact, our
              companies lead in their respective sectors while improving lives
              and building sustainable value across borders.
            </p>
          </div>

          {/* 3x2 Responsive Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsidiaries.map((sub, idx) => {
              const IconComp = sub.icon;
              return (
                <Card
                  key={idx}
                  className={`flex flex-col h-full bg-zinc-50/30 dark:bg-zinc-900/10 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${sub.borderHover}`}
                >
                  <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center justify-between">
                      {/* Logo container with gradient border wrapper */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm border border-zinc-100 flex items-center justify-center p-1.5">
                        <Image
                          src={sub.logo}
                          alt={`${sub.name} Logo`}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>

                      {/* Sector Badge */}
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${sub.badgeColor}`}
                      >
                        <IconComp className="w-3.5 h-3.5 mr-1" />
                        {sub.sector}
                      </span>
                    </div>

                    <CardTitle className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white min-h-[1.75rem] flex items-center">
                      {sub.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 pb-6">
                    {/* Graceful text overflow handling with fixed min-height for uniform cards */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 min-h-[4.25rem]">
                      {sub.description}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-0 border-t border-zinc-100/50 dark:border-zinc-900/50 mt-auto">
                    <Link
                      href="/services"
                      className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors pt-4 w-full"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section with Optimized Achievement Metrics */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center space-y-2 p-4 bg-white dark:bg-zinc-900/20 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/20 shadow-xs"
              >
                <div className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
                  {stat.label}
                </div>
                <div className="text-xs text-zinc-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
