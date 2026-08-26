import Image from "next/image";
import { getContent, site, type Locale } from "@/lib/content";
import {
  IconInstagram,
  IconLinkedIn,
  IconLinktree,
  IconX,
} from "./Icons";

/** Shown inside the Linktree button as a hint of what is behind it. */
const platforms = [IconX, IconLinkedIn, IconInstagram];

export default function Footer({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const t = content.footer;
  return (
    <footer className="edge-gradient relative overflow-hidden bg-coal-950 pt-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 right-1/4 h-[320px] w-[320px] rounded-full bg-brand-600/12 blur-[130px]"
      />
      <div className="container-awj relative">
        <div className="grid gap-12 pb-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/assets/awj-full-light.svg"
              alt={`${site.nameAr} — ${site.nameEn}`}
              width={444}
              height={180}
              unoptimized
              className="h-auto w-[260px] max-w-full"
            />
            <p className="mt-6 max-w-xs text-[15px] leading-[1.9] text-white/60">
              {t.tagline}
            </p>
          </div>

          <nav aria-labelledby="f-nav">
            <h2 id="f-nav" className="text-sm font-semibold text-white">
              {t.links}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {content.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[15px] text-white/55 transition-colors hover:text-brand-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white">{t.services}</h2>
            <ul className="mt-4 space-y-2.5">
              {content.services.items.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[15px] text-white/55 transition-colors hover:text-brand-400"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-7 text-sm font-semibold text-white">
              {t.projects}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {content.projects.items.map((project) => (
                <li key={project.id}>
                  <a
                    href="#projects"
                    className="text-[15px] text-white/55 transition-colors hover:text-brand-400"
                  >
                    {project.name} {project.subtitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t.contact}</h2>
            <ul className="mt-4 space-y-2.5 text-[15px] text-white/55">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  dir="ltr"
                  className="inline-block transition-colors hover:text-brand-400"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://${site.domain}`}
                  dir="ltr"
                  className="inline-block transition-colors hover:text-brand-400"
                >
                  {site.domain}
                </a>
              </li>
              <li>
                <a
                  href={site.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="inline-block transition-colors hover:text-brand-400"
                >
                  {site.handle}
                </a>
              </li>
            </ul>

            {/* One link, not three dead ones: every account lives on Linktree.
                The three marks are decoration — they say what is behind the
                button without pretending to be separate destinations. */}
            <a
              href={site.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[14px] font-semibold text-white/75 transition-colors hover:border-brand-600/50 hover:bg-brand-600/10 hover:text-white"
            >
              <IconLinktree className="h-4 w-4 shrink-0 text-brand-400" />
              {t.allAccounts}
              <span
                aria-hidden
                className="flex items-center gap-2 border-s border-white/12 ps-3 text-white/40 transition-colors group-hover:text-brand-400"
              >
                {platforms.map((Platform, i) => (
                  <Platform key={i} className="h-3.5 w-3.5" />
                ))}
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-[13px] text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            {locale === "en" ? site.nameEn : site.nameAr}. {t.rights}
          </p>
          <p dir="ltr">
            {site.nameEn} — {site.taglineEn}
          </p>
        </div>
      </div>
    </footer>
  );
}
