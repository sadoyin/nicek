import { Wrench, ShieldCheck, Landmark } from "lucide-react";

export const roles = [
  {
    slug: "operations-technical-manager",
    title: "Operations & Technical Manager",
    summary:
      "Runs the factory: rehab, production, equipment, maintenance, and daily supervision.",
    icon: Wrench,
  },
  {
    slug: "qa-regulatory-officer",
    title: "QA / Regulatory Officer",
    summary:
      "Quality control and NAFDAC/SON compliance, with authority to stop production if standards aren't met.",
    icon: ShieldCheck,
  },
  {
    slug: "commercial-finance-controller",
    title: "Commercial & Finance Controller",
    summary:
      "Sales, distribution, cash collection, and inventory, run under strict cash/credit controls.",
    icon: Landmark,
  },
];

export type CareerRole = (typeof roles)[number];

export function getRoleBySlug(slug: string): CareerRole | undefined {
  return roles.find((role) => role.slug === slug);
}
