"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sun, 
  Moon, 
  Heart, 
  Globe2, 
  Wrench, 
  TrendingUp, 
  Cpu, 
  Utensils 
} from "lucide-react";

const dropdownItems = [
  { name: "Healthcare Services", href: "/services/healthcare", icon: Heart, desc: "Trusted patient care & wellness" },
  { name: "American Exports", href: "/services/exports", icon: Globe2, desc: "Global trade & shipping" },
  { name: "Auto Spare Parts", href: "/services/autos", icon: Wrench, desc: "OEM engines & affordable parts" },
  { name: "Real Estate & Investments", href: "/services/investments", icon: TrendingUp, desc: "Risk-managed portfolios" },
  { name: "Technologies", href: "/services/tech", icon: Cpu, desc: "Smart cybersecurity & cloud" },
  { name: "Food & Beverages", href: "/services/food", icon: Utensils, desc: "Nutritious locally-sourced food" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const pathname = usePathname();

  // Handle theme synchronization
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Close menus when route changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo and Conglomerate Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shadow-sm border border-zinc-100 flex items-center justify-center p-1">
            <Image 
              src="/images/optimized/cropped-logo_nicek.webp" 
              alt="Nicek Group Logo" 
              width={40} 
              height={40}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-lg leading-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
              NICEK GROUP
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
              Diversified Conglomerate
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/" className={`transition-colors hover:text-zinc-950 dark:hover:text-white ${pathname === "/" ? "text-zinc-950 dark:text-white" : ""}`}>
            Home
          </Link>
          <Link href="/about" className={`transition-colors hover:text-zinc-950 dark:hover:text-white ${pathname === "/about" ? "text-zinc-950 dark:text-white" : ""}`}>
            About
          </Link>
          
          {/* Services Dropdown Trigger */}
          <div className="relative">
            <button 
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className={`flex items-center gap-1 transition-colors hover:text-zinc-950 dark:hover:text-white ${pathname.startsWith("/services") ? "text-zinc-950 dark:text-white" : ""}`}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-188" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div 
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="grid gap-2">
                  <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-3 pb-1 border-b border-zinc-100 dark:border-zinc-900">
                    Our Subsidiaries
                  </div>
                  {dropdownItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={index} 
                        href={item.href} 
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-start gap-3 rounded-lg p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-white">{item.name}</span>
                          <span className="text-xs text-zinc-400 leading-tight">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="border-t border-zinc-100 dark:border-zinc-900 pt-2 px-3">
                    <Link 
                      href="/services" 
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-bold text-zinc-900 dark:text-white hover:underline flex items-center gap-1"
                    >
                      View All Services Overview &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/contact" className={`transition-colors hover:text-zinc-950 dark:hover:text-white ${pathname === "/contact" ? "text-zinc-950 dark:text-white" : ""}`}>
            Contact
          </Link>
        </nav>

        {/* Action Controls: Theme Toggler & Get in Touch / Mobile Menu button */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
            aria-label="Toggle Theme Mode"
          >
            {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>

          <Link 
            href="/contact" 
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            Get in Touch
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4 flex flex-col">
            <Link 
              href="/" 
              className={`text-base font-semibold py-2 border-b border-zinc-100 dark:border-zinc-900 ${pathname === "/" ? "text-zinc-950 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-base font-semibold py-2 border-b border-zinc-100 dark:border-zinc-900 ${pathname === "/about" ? "text-zinc-950 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}
            >
              About
            </Link>
            
            {/* Mobile Expandable Services Sectors */}
            <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-2">
              <span className="text-base font-semibold text-zinc-600 dark:text-zinc-400 block py-2">
                Services & Subsidiaries
              </span>
              <div className="grid grid-cols-1 gap-2 pl-4">
                {dropdownItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={index} 
                      href={item.href} 
                      className="flex items-center gap-2.5 py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    >
                      <Icon className="w-4 h-4 text-zinc-400" />
                      {item.name}
                    </Link>
                  );
                })}
                <Link 
                  href="/services" 
                  className="flex items-center gap-1.5 py-2 text-xs font-bold text-zinc-900 dark:text-white hover:underline"
                >
                  View All Services Overview &rarr;
                </Link>
              </div>
            </div>

            <Link 
              href="/contact" 
              className={`text-base font-semibold py-2 ${pathname === "/contact" ? "text-zinc-950 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}
            >
              Contact
            </Link>
            
            <Link 
              href="/contact" 
              className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-3 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
