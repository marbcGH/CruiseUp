import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { bigFour } from "@/lib/lines";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/lines", "/articles", "/tips", "/videos", "/niche", "/about"].map((p) => ({ url: `${site.url}${p}` }));
  return [
    ...pages,
    ...bigFour.map((l) => ({ url: `${site.url}/lines/${l.slug}`, lastModified: l.lastReviewed })),
    ...getAllArticles().map((a) => ({ url: `${site.url}/articles/${a.slug}`, lastModified: a.updated ?? a.date })),
  ];
}
