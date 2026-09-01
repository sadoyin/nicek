import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Nicek Group's offices in Wyoming, Boston, and Lagos for partnerships, supply requests, and consulting services.",
  openGraph: {
    title: "Contact Us | Nicek Group",
    description:
      "Get in touch with Nicek Group's offices in Wyoming, Boston, and Lagos for partnerships, supply requests, and consulting services.",
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// Server action for handling contact form submission progressively (works without client-side JS!)
async function handleContactSubmit(formData: FormData) {
  "use server";

  // Honeypot: real users never see or fill this field. Redirect to success
  // without sending, so a bot never learns its submission was caught.
  if (getField(formData, "website") !== "") {
    redirect("/contact?success=true");
  }

  const name = getField(formData, "name");
  const email = getField(formData, "email");
  const subject = getField(formData, "subject");
  const message = getField(formData, "message");

  const isValid = Boolean(name && email && subject && message && EMAIL_PATTERN.test(email));
  if (!isValid) {
    redirect("/contact?error=true");
  }

  let delivered = false;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL_TO || "info@nicekgroup.com",
      replyTo: email,
      subject: `New contact form submission: ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    delivered = !error;
  } catch {
    delivered = false;
  }

  redirect(delivered ? "/contact?success=true" : "/contact?error=true");
}

interface ContactPageProps {
  searchParams?: Promise<{ success?: string; error?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const isSuccess = params?.success === "true";
  const isError = params?.error === "true";

  return (
    <div className="flex flex-col min-h-full font-sans">
      
      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('/images/optimized/realestate.webp')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Got Questions?
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-none">
            We are always ready to work with you.
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Reach out to our global team for partnership, supply requests, and IT consulting services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Info Cards Side */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  Our Locations
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  We operate as a multi-industry organization across offices in the United States and Nigeria.
                </p>
              </div>

              {/* Office Details */}
              <div className="space-y-4">
                <Card className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60">
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                      <Building className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg font-bold">Wyoming Head Office (US)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span>30 N Gould Street, #49357 Sheridan, WY 82801</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>info@nicekgroup.com</span>
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60">
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                      <Building className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg font-bold">Boston Office (US)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span>304 North Cardinal St., Dorchester Center, MA 02124</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>info@nicekgroup.com</span>
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200/60 dark:border-zinc-800/60">
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                      <Building className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg font-bold">Lagos Office (Nigeria)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span>20 Ladipo, Oshodi, Lagos State</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>info@nicekgroup.com</span>
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* General Numbers & Business Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3 p-6 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200/40 dark:border-zinc-800/20 rounded-2xl">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                    Contact Numbers
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <Phone className="w-4 h-4 text-zinc-400" />
                      <span>Office: +1 732-498-0072</span>
                    </p>
                    <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <Phone className="w-4 h-4 text-zinc-400" />
                      <span>Mobile: +1 973 933-1486</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 p-6 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200/40 dark:border-zinc-800/20 rounded-2xl">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-1.5">
                      <span>Monday - Friday</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-200">7:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400 pt-1">
                      <span>Weekend (US)</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-200">10:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7">
              <Card className="bg-white dark:bg-zinc-900/30 border-zinc-200/60 dark:border-zinc-800/60 shadow-md">
                <CardHeader className="border-b border-zinc-100/60 dark:border-zinc-900/60 pb-6">
                  <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
                  <p className="text-zinc-500 text-sm mt-1">
                    We are waiting to hear from you! Fill out the form below.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  {isSuccess ? (
                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center space-y-3">
                      <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">Message Sent Successfully</h3>
                      <p className="text-sm text-emerald-600 dark:text-emerald-500">
                        Thank you for reaching out. A representative will contact you within 1 business hour.
                      </p>
                    </div>
                  ) : isError ? (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-6 text-center space-y-3">
                      <div className="inline-flex p-3 bg-red-500 text-white rounded-full mx-auto">
                        <XCircle className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Something Went Wrong</h3>
                      <p className="text-sm text-red-600 dark:text-red-500">
                        We could not send your message. Please check your details and try again, or reach us
                        directly at{" "}
                        <a href="mailto:info@nicekgroup.com" className="underline">info@nicekgroup.com</a> or{" "}
                        <a href="tel:+17324980072" className="underline">+1 732-498-0072</a>.
                      </p>
                    </div>
                  ) : (
                    // Progressively enhanced form submission works flawlessly without JavaScript
                    <form action={async (formData) => {
                      "use server";
                      await handleContactSubmit(formData);
                    }} className="space-y-6">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            Your Name *
                          </label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required 
                            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            Email Address *
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
                            placeholder="name@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                          Subject *
                        </label>
                        <input 
                          type="text" 
                          id="subject" 
                          name="subject" 
                          required 
                          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
                          placeholder="How can we help you?"
                        />
                      </div>

                      {/* Honey pot field to stop bot spam (hidden from real users) */}
                      <div className="hidden">
                        <label htmlFor="website">Website</label>
                        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                          Your Message *
                        </label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows={5} 
                          required 
                          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-zinc-950 dark:focus:border-white transition-colors resize-none"
                          placeholder="Write your message details..."
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-3 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
