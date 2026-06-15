import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-06-15")
  return [
    { url: site.baseUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.baseUrl}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.baseUrl}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]
}
