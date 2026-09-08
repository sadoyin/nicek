import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, ShieldCheck, Landmark, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore open leadership roles at Nicek Group: Operations & Technical Manager, QA/Regulatory Officer, and Commercial & Finance Controller.",
  openGraph: {
    title: "Careers | Nicek Group",
    description:
      "Explore open leadership roles at Nicek Group: Operations & Technical Manager, QA/Regulatory Officer, and Commercial & Finance Controller.",
  },
};

const roles = [
  {
    slug: "operations-technical-manager",
    title: "Operations & Technical Manager",
    summary:
      "Runs the factory: rehab, production, equipment, maintenance, and daily supervision.",
    onboardBy: "Day 10",
    icon: Wrench,
  },
  {
    slug: "qa-regulatory-officer",
    title: "QA / Regulatory Officer",
    summary:
      "Quality control and NAFDAC/SON compliance, with authority to stop production if standards aren't met.",
    onboardBy: "Day 10",
    icon: ShieldCheck,
  },
  {
    slug: "commercial-finance-controller",
    title: "Commercial & Finance Controller",
    summary:
      "Sales, distribution, cash collection, and inventory, run under strict cash/credit controls.",
    onboardBy: "Day 15",
    icon: Landmark,
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('/images/optimized/group_companies-1024x684.webp')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Join Nicek Group
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-none">
            Open Leadership Roles
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            We&apos;re hiring three Phase-1 leadership positions to run a
            Nicek Group factory operation. Explore each role below.
          </p>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card key={role.slug} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg w-fit">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                        Onboard by {role.onboardBy}
                      </span>
                    </div>
                    <CardTitle className="pt-2">{role.title}</CardTitle>
                    <CardDescription>{role.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1" />
                  <CardFooter>
                    <Link
                      href={`/careers/${role.slug}`}
                      className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    >
                      View Role
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
