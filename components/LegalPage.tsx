import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import Reveal from "./Reveal";
import { getContent, localePath, type Locale } from "@/lib/content";
import { IconArrow } from "./Icons";

/**
 * The shared frame for the privacy policy and the terms. Both are plain
 * reading documents, so this deliberately drops the marketing rhythm of the
 * home page: one column, generous measure, no cards.
 */
export default function LegalPage({
  locale,
  doc,
}: {
  locale: Locale;
  doc: "privacy" | "terms";
}) {
  const content = getContent(locale);
  const t = content.legal;
  const page = t[doc];

  // The same document in the other language, so the switch keeps your place.
  const altHref = locale === "en" ? `/${doc}` : `/en/${doc}`;

  return (
    <>
      <Header locale={locale} onSubpage altHref={altHref} />
      <main id="main">
        <article className="bg-white pb-24 pt-[128px] sm:pb-28 sm:pt-[152px]">
          <div className="container-awj max-w-[820px]">
            <Reveal>
              <h1 className="text-[34px] font-bold leading-[1.25] text-ink-900 sm:text-[46px]">
                {page.title}
              </h1>
              <div className="rule-draw gradient-bg mt-6 h-[3px] w-[88px] rounded-full" />
              <p className="mt-6 text-[13px] text-ink-500">
                {t.updatedLabel}: {t.updated}
              </p>
              <p className="mt-6 text-[17px] leading-[1.95] text-ink-700">
                {page.intro}
              </p>
            </Reveal>

            {page.sections.map((section, i) => (
              <Reveal key={section.heading} delay={Math.min(i, 4) * 60}>
                <section className="mt-12 border-t border-line pt-9">
                  <h2 className="text-[22px] font-bold text-ink-900 sm:text-[24px]">
                    {section.heading}
                  </h2>
                  {section.body ? (
                    <p className="mt-4 text-[16px] leading-[1.95] text-ink-700">
                      {section.body}
                    </p>
                  ) : null}
                  {section.list ? (
                    <ul className="mt-5 space-y-3">
                      {section.list.map((line) => (
                        <li key={line} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full gradient-bg"
                          />
                          <span className="text-[16px] leading-[1.9] text-ink-700">
                            {line}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}

            <Reveal delay={80}>
              <Link
                href={localePath[locale]}
                className="group mt-14 inline-flex items-center gap-2 rounded-full border border-brand-600/40 bg-brand-600/[0.07] px-6 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-600/15"
              >
                {t.backHome}
                <IconArrow className="h-5 w-5 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </article>
      </main>
      <Footer locale={locale} onSubpage />
      <WhatsAppButton locale={locale} />
    </>
  );
}
