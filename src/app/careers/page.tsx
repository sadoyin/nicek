import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { roles } from "@/lib/careerRoles";

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
                    <div className="p-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg w-fit">
                      <Icon className="w-5 h-5" />
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
