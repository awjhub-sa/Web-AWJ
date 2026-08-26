import { getContent, site, type Locale } from "@/lib/content";
import { IconWhatsApp } from "./Icons";

/**
 * Floating chat button. Sits on the reading-end side (left in Arabic, right in
 * English) and below the header's z-50 so an open mobile nav still covers it.
 *
 * wa.me opens the app on a phone and web.whatsapp.com on a desktop, so one
 * link covers both without sniffing the device.
 */
export default function WhatsAppButton({ locale }: { locale: Locale }) {
  const t = getContent(locale).whatsapp;
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    t.prefill,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.aria}
      title={t.tooltip}
      className="group fixed bottom-5 end-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-110 active:scale-95 sm:bottom-6 sm:end-6"
    >
      <IconWhatsApp className="h-7 w-7" />
      {/* A quiet pulse so the button is noticed without nagging. Motion is
          dropped entirely for visitors who ask for reduced motion. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping"
      />
    </a>
  );
}
