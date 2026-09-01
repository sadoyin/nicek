import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const routes = [
  "",
  "/about",
  "/services",
  "/services/healthcare",
  "/services/exports",
  "/services/autos",
  "/services/investments",
  "/services/tech",
  "/services/food",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
