import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import "./globals.css";

// Tajawal has no 600 weight — 500 and 700 bracket it, so `font-semibold`
// resolves to 700 rather than being synthesised.
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const DESCRIPTION =
  "أوج لحلول الأعمال — البيت التقني الذي تُبنى فيه حلول الأعمال. نصمّم الحل الرقمي، ونشغّله، ونبقى معك بعد التسليم. تنفيذ المواقع والتطبيقات خلال 2 إلى 6 أسابيع.";

export const metadata: Metadata = {
  metadataBase: new URL("https://awjhub.com"),
  title: {
    default: "أوج لحلول الأعمال | AWJ HUB",
    template: "%s | أوج لحلول الأعمال",
  },
  description: DESCRIPTION,
  keywords: [
    "أوج",
    "أوج لحلول الأعمال",
    "AWJ HUB",
    "awjhub",
    "حلول رقمية",
    "تطوير مواقع",
    "تطوير تطبيقات",
    "أتمتة العمليات",
    "نصاب",
    "NSAB",
    "حلول الإعاشة",
  ],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "أوج لحلول الأعمال",
    title: "أوج لحلول الأعمال | AWJ HUB",
    description: DESCRIPTION,
    images: [{ url: "/assets/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@awjhub",
    title: "أوج لحلول الأعمال | AWJ HUB",
    description: DESCRIPTION,
    images: ["/assets/og.png"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#252525",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "أوج لحلول الأعمال",
  alternateName: "AWJ HUB",
  url: "https://awjhub.com",
  logo: "https://awjhub.com/assets/awj-full-dark.svg",
  email: "info@awjhub.com",
  sameAs: ["https://linktr.ee/awjhub"],
  slogan: "Complex operations, made simple",
  description:
    "البيت التقني الذي تُبنى فيه حلول الأعمال: تصميم وتطبيق الحلول الرقمية، إدارة وتشغيل الأنظمة، والدعم الفني.",
  address: { "@type": "PostalAddress", addressCountry: "SA" },
  makesOffer: [
    { "@type": "Offer", name: "تصميم وتطبيق الحلول" },
    { "@type": "Offer", name: "إدارة وتشغيل الأنظمة" },
    { "@type": "Offer", name: "الدعم الفني" },
  ],
  owns: {
    "@type": "SoftwareApplication",
    name: "منصة نِصاب لحلول الإعاشة",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
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
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-coal-950"
        >
          تخطَّ إلى المحتوى
        </a>
        {children}
        <AccessibilityWidget />
      </body>
    </html>
  );
}
