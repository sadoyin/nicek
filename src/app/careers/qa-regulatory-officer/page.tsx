import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, CheckCircle, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "QA / Regulatory Officer",
  description:
    "Nicek Group is hiring a QA / Regulatory Officer for quality control and NAFDAC/SON compliance, with authority to stop production if standards aren't met. Onboard by Day 10.",
  openGraph: {
    title: "QA / Regulatory Officer | Careers at Nicek Group",
    description:
      "Nicek Group is hiring a QA / Regulatory Officer for quality control and NAFDAC/SON compliance, with authority to stop production if standards aren't met. Onboard by Day 10.",
  },
};

const responsibilities = [
  "Enforce quality control standards across production",
  "Maintain NAFDAC and SON regulatory compliance",
  "Authority to stop production when standards aren't met",
  "Operate independently from the Operations team by design",
];

export default function QaRegulatoryOfficerPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('/images/optimized/group_companies-1024x684.webp')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Careers
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-3.5 border border-zinc-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-full h-full text-zinc-900" />
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Open Position &middot; Onboard by Day 10
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-1">
                QA / Regulatory Officer
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Copy */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
            Owns quality control and regulatory compliance, with the
            authority to halt production if standards slip - deliberately
            kept independent from Operations.
          </p>

          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Key Responsibilities
            </h2>
            <ul className="space-y-3">
              {responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-400"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Block */}
          <div className="rounded-2xl bg-zinc-900 text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-radial-[circle_at_bottom_right] from-zinc-800 to-transparent opacity-50" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight relative z-10">
              Interested in This Role?
            </h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm relative z-10">
              Reach out to us and let us know you&apos;d like to apply for
              the QA / Regulatory Officer position.
            </p>
            <div className="relative z-10 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white text-zinc-950 px-6 py-3 font-semibold hover:bg-zinc-100 transition-colors"
              >
                <Send className="w-4 h-4" /> Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
