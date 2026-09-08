import LegalPage from "@/components/LegalPage";
import { getContent } from "@/lib/content";

const doc = getContent("ar").legal.privacy;

export const metadata = {
  title: doc.title,
  description: doc.metaDescription,
  alternates: {
    canonical: "/privacy",
    languages: { ar: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
  },
};

export default function Page() {
  return <LegalPage locale="ar" doc="privacy" />;
}
