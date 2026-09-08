import LegalPage from "@/components/LegalPage";
import { getContent } from "@/lib/content";

const doc = getContent("ar").legal.terms;

export const metadata = {
  title: doc.title,
  description: doc.metaDescription,
  alternates: {
    canonical: "/terms",
    languages: { ar: "/terms", en: "/en/terms", "x-default": "/terms" },
  },
};

export default function Page() {
  return <LegalPage locale="ar" doc="terms" />;
}
