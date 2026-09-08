import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const BASE = `https://${site.domain}`;

/**
 * Every page in both languages, each pointing at its counterpart. Search
 * engines need the alternates here as well as in the page metadata to treat a
 * pair as one page in two languages rather than as duplicates.
 */
const PAGES: { ar: string; en: string; priority: number }[] = [
  { ar: "/", en: "/en", priority: 1 },
  { ar: "/privacy", en: "/en/privacy", priority: 0.3 },
  { ar: "/terms", en: "/en/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ ar, en, priority }) => {
    const languages = { ar: `${BASE}${ar}`, en: `${BASE}${en}` };
    return [
      {
        url: `${BASE}${ar}`,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: `${BASE}${en}`,
        changeFrequency: "monthly" as const,
        // The Arabic face is the company's own language, so it leads.
        priority: priority - 0.1,
        alternates: { languages },
      },
    ];
  });
}
