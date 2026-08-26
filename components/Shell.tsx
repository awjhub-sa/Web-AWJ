import type { ReactNode } from "react";
import { Tajawal } from "next/font/google";
import { getContent, type Locale } from "@/lib/content";
import { organizationJsonLd } from "@/lib/seo";
import "@/app/globals.css";

// Tajawal has no 600 weight — 500 and 700 bracket it, so `font-semibold`
// resolves to 700 rather than being synthesised. Its Latin cut carries the
// English page too, so both languages load one typeface rather than two.
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

/**
 * The document each language's root layout renders. Everything that depends on
 * the language — `lang`, `dir`, the structured data, the skip link — is decided
 * here from a single `locale`, so the two root layouts stay one line each.
 */
export default function Shell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const t = getContent(locale);
  return (
    <html lang={locale} dir={t.dir} className={tajawal.variable}>
      <head>
        {/* Sections start at opacity 0 and are revealed on scroll by JS. With
            scripting off that reveal never runs, so the page would read as
            blank — unhide everything up front instead. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled object — safe to inline.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(locale)),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[100] focus:start-4 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-coal-950"
        >
          {t.header.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
