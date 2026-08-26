import type { ReactNode } from "react";
import Shell from "@/components/Shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("ar");

export const viewport = { themeColor: "#252525" };

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return <Shell locale="ar">{children}</Shell>;
}
