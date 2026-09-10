import { Wrench, ShieldCheck, Landmark } from "lucide-react";

export const roles = [
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

export type CareerRole = (typeof roles)[number];

export function getRoleBySlug(slug: string): CareerRole | undefined {
  return roles.find((role) => role.slug === slug);
}
