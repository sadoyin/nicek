import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/navbar";
import "./globals.css";
import { InstagramIcon } from "@/components/InstagramIcon";
import { FacebookIcon } from "@/components/FacebookIcon";
import { YoutubeIcon } from "@/components/YoutubeIcon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Declarative Next.js Metadata API for SEO optimization resolving Title and Meta descriptions
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nicek Group | Diversified Conglomerate - Trade, Tech, Healthcare",
    template: "%s | Nicek Group",
  },
  description:
    "Nicek Group is a diversified conglomerate operating across the United States and Nigeria, committed to excellence in healthcare services, international trade and exports, auto parts, IT solutions, and strategic investments.",
  openGraph: {
    title: "Nicek Group | Diversified Conglomerate",
    description:
      "Excellence and sustainable value across healthcare, international trade, IT, investments, and food production.",
    url: "https://nicekgroup.com",
    siteName: "Nicek Group",
    images: [
      {
        url: "/images/optimized/group_companies-1024x684.webp",
        width: 1024,
        height: 684,
        alt: "Nicek Group of Companies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50/50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
        {/* Global Dynamic Header/Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Consolidated Footer - Resolving Address and Contact Discrepancies Globally */}
        <footer className="bg-zinc-900 dark:bg-zinc-950 text-zinc-400 border-t border-zinc-800/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-zinc-800/50">
              {/* Column 1: Info */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1 rounded-lg w-10 h-10 flex items-center justify-center">
                    <Image
                      src="/images/optimized/cropped-logo_nicek.webp"
                      alt="Nicek Group Logo"
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className="font-extrabold tracking-tight text-white text-lg">
                    NICEK GROUP
                  </span>
                </div>
                <p className="text-sm text-zinc-400">
                  Diversified conglomerate connecting global markets and
                  delivering premium services in trade, tech, health, and
                  investments.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span>+1 (732) 498-0072 (HQ)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span>+1 (973) 933-1486 (Mobile)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span>info@nicekgroup.com</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <InstagramIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                    <a
                      href="https://instagram.com/nicekgroup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Instagram
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <FacebookIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                    <a
                      href="https://facebook.com/nicekgroup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Facebook
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <YoutubeIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                    <a
                      href="https://youtube.com/nicekgroup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Youtube
                    </a>
                  </div>
                </div>
              </div>

              {/* Column 2: Physical Locations (Consolidated Address Resolution) */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                  Our Offices
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5 text-sm">
                    <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      Wyoming (HQ)
                    </span>
                    <p className="text-zinc-400 leading-normal">
                      30 N Gould Street, #49357
                      <br />
                      Sheridan, WY 82801
                    </p>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      Boston Office
                    </span>
                    <p className="text-zinc-400 leading-normal">
                      304 North Cardinal St.
                      <br />
                      Dorchester Center, MA 02124
                    </p>
                  </div>
                  <div className="space-y-1.5 text-sm sm:col-span-2">
                    <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      Lagos, Nigeria Office
                    </span>
                    <p className="text-zinc-400 leading-normal">
                      20 Ladipo, Oshodi, Lagos State
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 3: Work Hours & Quick Links */}
              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    Business Hours
                  </h3>
                  <div className="space-y-1 text-sm text-zinc-400">
                    <div className="flex justify-between border-b border-zinc-800/40 pb-1.5">
                      <span>Monday - Friday</span>
                      <span className="text-zinc-200">7:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Weekend (US)</span>
                      <span className="text-zinc-200">10:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                    Important Links
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
              <p>
                Copyright © 2026 - Nicek Group of Companies. All rights
                reserved.
              </p>
              <p>Designed and optimized for cross-border operations.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
