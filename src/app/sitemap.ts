import type { MetadataRoute } from "next";
import { articles, neighborhoods, properties } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/properties", "/map", "/neighborhoods", "/agents", "/about", "/journal", "/contact", "/sell", "/mortgage", "/saved", "/compare"].map(
    (path) => ({
      url: `${site.url}${path || "/"}`,
      lastModified: "2026-11-01",
    }),
  );
  return [
    ...staticRoutes,
    ...properties.map((property) => ({ url: `${site.url}/properties/${property.slug}`, lastModified: property.added })),
    ...neighborhoods.map((neighborhood) => ({ url: `${site.url}/neighborhoods/${neighborhood.slug}` })),
    ...articles.map((article) => ({ url: `${site.url}/journal/${article.slug}` })),
  ];
}
