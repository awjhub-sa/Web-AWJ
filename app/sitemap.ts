import type { MetadataRoute } from "next";
import { localePath, site } from "@/lib/content";

const BASE = `https://${site.domain}`;

/**
 * Both language faces, each pointing at the other. Search engines need the
 * alternates here as well as in the page metadata to treat the two as one
 * page in two languages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { ar: `${BASE}/`, en: `${BASE}/en` };
  return (Object.keys(localePath) as (keyof typeof localePath)[]).map(
    (locale) => ({
      url: `${BASE}${locale === "ar" ? "/" : localePath[locale]}`,
      changeFrequency: "monthly",
      priority: locale === "ar" ? 1 : 0.9,
      alternates: { languages },
    }),
  );
}
