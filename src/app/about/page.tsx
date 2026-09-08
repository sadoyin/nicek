import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Lightbulb,
  Users,
  Leaf,
  Compass,
  Target,
  History,
  MessageSquareQuote
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Nicek Group's mission, vision, and values - a diversified conglomerate delivering sustainable value across healthcare, trade, technology, and real estate in the US and Nigeria.",
  openGraph: {
    title: "About Us | Nicek Group",
    description:
      "Learn about Nicek Group's mission, vision, and values - a diversified conglomerate delivering sustainable value across healthcare, trade, technology, and real estate in the US and Nigeria.",
  },
};

// Extracted testimonials matching the TypeScript type and data from audit report
interface Testimonial {
  id: string;
  clientName: string;
  designation?: string;
  company: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    clientName: "Chief Nzugbe",
    company: "Business Man",
    quote: "I wanted to ship in three automobile engines, a BMW and two Toyota engines, but I did not know a trusted importer, Anchor Auto Spare Parts gave me solid engines my mechanics were shocked."
  },
  {
    id: "testimonial-2",
    clientName: "Taiwo Ogunsaya",
    company: "Engineer",
    quote: "So my children came home and continued disturbing me about some school program and they need laptops and detailed specifications, Nicek Technologies bailed me out and procured them all."
  },
  {
    id: "testimonial-3",
    clientName: "Mrs. Ijeoma",
    company: "Business Woman",
    quote: "For some years now, I have relied on C&C Food and Beverages to supply me with portable water, and I want to appreciate their dedication to restocking my house without my knowledge, premium services."
  }
];

const values = [
  {
    name: "Integrity",
    points: [
      "Acting with honesty and transparency in all business dealings and partnerships.",
      "We build trust with customers, partners, and employees across diverse cultures."
    ],
    icon: Compass,
    color: "from-blue-500/20 to-cyan-500/10 dark:from-blue-900/30 dark:to-cyan-950/10",
  },
  {
    name: "Innovation",
    points: [
      "We are continuously seeking new ideas, technologies, and solutions.",
      "We help companies stay competitive and adapt to rapidly changing global markets."
    ],
    icon: Lightbulb,
    color: "from-amber-500/20 to-yellow-500/10 dark:from-amber-900/30 dark:to-yellow-950/10",
  },
  {
    name: "Inclusion",
    points: [
      "Valuing different perspectives, backgrounds, and experiences.",
      "We encourage creativity, strengthening collaboration, and this reflects on our global customer base."
    ],
    icon: Users,
    color: "from-purple-500/20 to-pink-500/10 dark:from-purple-900/30 dark:to-pink-950/10",
  },
  {
    name: "Sustainability",
    points: [
      "We are committing human resources to environmentally responsible practices and long-term impact.",
      "This ensures growth while protecting resources for future generations."
    ],
    icon: Leaf,
    color: "from-emerald-500/20 to-teal-500/10 dark:from-emerald-900/30 dark:to-teal-950/10",
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">

      {/* Page Header Banner */}
      <section className="relative bg-zinc-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('/images/optimized/group_companies-1024x684-bg.webp')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Let’s Be a Part of Your Journey.
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-none">
            About Nicek Group
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Sustainable value across healthcare, international trade, food and beverages, technology and real estate.
          </p>
        </div>
      </section>

      {/* Mission & Vision & Journey Section */}
      <section className="py-24 bg-white dark:bg-zinc-950 border-b border-zinc-200/50 dark:border-zinc-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Our Mission */}
            <div className="space-y-4 p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 shadow-xs">
              <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Mission Statement</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                At Nicek Group, our mission is to create sustainable value across healthcare, international trade, food and beverages, technology, and real estate. We are committed to improving lives, driving innovation, and building lasting partnerships that empower communities in the United States, Nigeria, and beyond. Through integrity, excellence, and a spirit of entrepreneurship, we strive to deliver solutions that foster growth, well-being, and prosperity for generations to come.
              </p>
            </div>

            {/* Our Vision */}
            <div className="space-y-4 p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 shadow-xs">
              <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg">
                  <Compass className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Vision Statement</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Our vision is to become a globally recognized group of companies that transforms industries, connects markets, and enriches communities. We aspire to lead in healthcare, trade, food and beverages, technology, and real estate by delivering innovative solutions, creating opportunities, and driving sustainable growth across Africa, the United States, and worldwide.
              </p>
            </div>
          </div>

          {/* Our Journey */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-zinc-900 text-white rounded-3xl overflow-hidden shadow-xl">
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="flex items-center gap-3 text-zinc-400">
                <History className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Our Journey</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Since 1995, delivering trust and reliability.
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                Since 1995, Our Team Has Succeeded In Understanding The Needs Of Various Industries And Creating Reliable Products & Services To Serve Them All.
              </p>
              <div className="border-t border-zinc-800 pt-6 space-y-4">
                <h3 className="font-bold text-lg text-white">Quality Comes First!</h3>
                <p className="text-sm text-zinc-400">
                  We Make Sure That Every Minute Detail Is Looked Into While Delivering Even The Smallest Service. Our Focus Is 100% On Client Needs And Satisfaction.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative aspect-square lg:aspect-auto lg:h-full min-h-[300px]">
              <Image
                src="/images/optimized/group_companies-1024x684.webp"
                alt="Nicek Group Team Corporate Representation"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 bg-zinc-50/50 dark:bg-zinc-900/10 border-b border-zinc-200/50 dark:border-zinc-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Company Values</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              The principles that guide our choices, shape our culture, and drive our daily operations across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <Card key={idx} className="bg-white dark:bg-zinc-900/30 border-zinc-200/60 dark:border-zinc-800/60 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">{val.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {val.points.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1 border-l-2 border-zinc-200 dark:border-zinc-800">
                        {p}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Client Testimonials</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              What people say about our services and dedication to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.id} className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <CardContent className="pt-6 relative">
                  <span className="text-6xl text-zinc-200 dark:text-zinc-800 font-serif absolute top-2 left-4 select-none leading-none pointer-events-none">“</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 italic relative z-10 leading-relaxed pt-2">
                    {t.quote}
                  </p>
                </CardContent>
                <div className="p-6 pt-0 border-t border-zinc-100/50 dark:border-zinc-900/50 mt-auto">
                  <div className="font-bold text-sm text-zinc-900 dark:text-white pt-4">
                    {t.clientName}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {t.company}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
