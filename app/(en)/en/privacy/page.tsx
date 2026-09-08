import LegalPage from "@/components/LegalPage";
import { getContent } from "@/lib/content";

const doc = getContent("en").legal.privacy;

export const metadata = {
  title: doc.title,
  description: doc.metaDescription,
  alternates: {
    canonical: "/en/privacy",
    languages: { ar: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
  },
};

export default function Page() {
  return <LegalPage locale="en" doc="privacy" />;
}
