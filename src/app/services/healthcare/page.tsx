import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Activity, ShieldCheck, HeartPulse, Stethoscope, ArrowLeft, PhoneCall } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Healthcare Services",
  description:
    "Nicek Healthcare Services delivers home healthcare, medical staffing, telemedicine, and corporate wellness programs for individuals, hospitals, and senior care facilities.",
  openGraph: {
    title: "Healthcare Services | Nicek Group",
    description:
      "Nicek Healthcare Services delivers home healthcare, medical staffing, telemedicine, and corporate wellness programs for individuals, hospitals, and senior care facilities.",
  },
};

const features = [
  { title: "Home Healthcare", desc: "Compassionate, professional clinical care delivered in the comfort of patients' homes.", icon: HeartPulse },
  { title: "Medical Staffing", desc: "Providing hospitals and clinics with highly qualified nurses, caregivers, and medical professionals.", icon: Stethoscope },
  { title: "Telemedicine", desc: "Easy, remote digital healthcare consultations with certified practitioners anytime, anywhere.", icon: Activity },
  { title: "Wellness Programs", desc: "Customized health and lifestyle wellness strategies tailored for individuals and corporations.", icon: ShieldCheck },
  { title: "Primary Care Support", desc: "Comprehensive support services for family medicine, prevention, and ongoing chronic disease management.", icon: Heart },
];

export default function HealthcarePage() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      
      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-2 border border-zinc-100 flex items-center justify-center shrink-0">
              <Image src="/images/optimized/NHS-removebg-preview-150x150.webp" alt="Nicek Healthcare Logo" width={48} height={48} />
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Subsidiary Sector</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-1">
                Nicek Healthcare Services
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
                Trusted Clinical Care & Wellness Solutions
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                Nicek Healthcare Services provides professional healthcare services for individuals, hospitals, senior care facilities, and corporate wellness programs. We prioritize patient care by offering advanced technologies and easily accessible solutions for a healthier, stronger, and more fulfilled tomorrow.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Our operations focus on bridging clinical gaps through technology-driven diagnostics, flexible medical staffing models, and progressive telemedicine solutions designed to deliver clinical excellence directly where it is needed.
              </p>
            </div>
            
            <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full rounded-2xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50">
              <Image src="/images/optimized/group_companies-1024x684.webp" alt="Healthcare Representation" fill className="object-cover" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white text-center">
              Our Healthcare Offerings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <Card key={idx} className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3.5 space-y-0 pb-3">
                      <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-650 dark:text-rose-400 rounded-lg">
                        <Icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-base font-bold">{f.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
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
              Require Healthcare Services or Staffing Solutions?
            </h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm relative z-10">
              Our clinical advisors are ready to match your facilities or family needs with custom support packages. Reach out to coordinate with us.
            </p>
            <div className="relative z-10 pt-2">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white text-zinc-950 px-6 py-3 font-semibold hover:bg-zinc-100 transition-colors">
                <PhoneCall className="w-4 h-4" /> Contact Healthcare Division
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
