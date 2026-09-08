import LegalPage from "@/components/LegalPage";
import { getContent } from "@/lib/content";

const doc = getContent("en").legal.terms;

export const metadata = {
  title: doc.title,
  description: doc.metaDescription,
  alternates: {
    canonical: "/en/terms",
    languages: { ar: "/terms", en: "/en/terms", "x-default": "/terms" },
  },
};

export default function Page() {
  return <LegalPage locale="en" doc="terms" />;
}
