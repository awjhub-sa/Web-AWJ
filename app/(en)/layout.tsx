import type { ReactNode } from "react";
import Shell from "@/components/Shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("en");

export const viewport = { themeColor: "#252525" };

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <Shell locale="en">{children}</Shell>;
}
