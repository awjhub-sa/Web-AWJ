import type { Metadata } from "next";
import { getContent, localePath, site, type Locale } from "./content";

const BASE = `https://${site.domain}`;

/**
 * Per-language metadata. `alternates.languages` is what tells search engines
 * the two pages are the same page in two languages rather than duplicates —
 * without it the English page competes with the Arabic one.
 */
export function buildMetadata(locale: Locale): Metadata {
  const t = getContent(locale);
  return {
    metadataBase: new URL(BASE),
    title: { default: t.meta.title, template: t.meta.titleTemplate },
    description: t.meta.description,
    keywords: t.meta.keywords,
    openGraph: {
      type: "website",
      locale: t.meta.ogLocale,
      siteName: locale === "en" ? site.nameEn : site.nameAr,
      title: t.meta.title,
      description: t.meta.description,
      url: localePath[locale],
      images: [{ url: "/assets/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      site: site.handle,
      title: t.meta.title,
      description: t.meta.description,
      images: ["/assets/og.png"],
    },
    alternates: {
      canonical: localePath[locale],
      languages: {
        ar: localePath.ar,
        en: localePath.en,
        // Arabic is the company's own language, so it takes the fallback.
        "x-default": localePath.ar,
      },
    },
  };
}

export function organizationJsonLd(locale: Locale) {
  const t = getContent(locale);
  const project = t.projects.items[0];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "en" ? site.nameEn : site.nameAr,
    alternateName: locale === "en" ? site.nameAr : site.nameEn,
    url: `${BASE}${locale === "en" ? "/en" : ""}`,
    logo: `${BASE}/assets/awj-full-dark.svg`,
    email: site.email,
    sameAs: [site.linktree],
    slogan: site.taglineEn,
    description: t.meta.orgDescription,
    address: { "@type": "PostalAddress", addressCountry: "SA" },
    makesOffer: t.services.items.map((service) => ({
      "@type": "Offer",
      name: service.title,
    })),
    owns: {
      "@type": "SoftwareApplication",
      name: `${project.name} ${project.subtitle}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
    },
  };
}
