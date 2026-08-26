import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * Without a `Sitemap:` line crawlers only find pages by following links, so the
 * two language faces are discovered separately rather than as one pair.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${site.domain}/sitemap.xml`,
    host: `https://${site.domain}`,
  };
}
