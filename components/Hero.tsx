import Image from "next/image";
import Reveal from "./Reveal";
import { getContent, site, type Locale } from "@/lib/content";
import { IconArrow } from "./Icons";

export default function Hero({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const t = content.hero;
  return (
    // A column that fills the screen: the copy grows to take the slack and the
    // service strip stays pinned to the bottom edge. Without the floor the hero
    // was only as tall as its text, which reads as a short band on a desktop
    // monitor. `svh` rather than `vh` so mobile browser chrome does not push
    // the strip out of view on first paint.
    <section
      id="home"
      className="relative isolate flex min-h-[88svh] flex-col overflow-hidden bg-coal-950 pt-[72px] lg:min-h-svh"
    >
      {/* Earth at night — the hero backdrop. The gradient underneath is what
          shows if the photo is ever missing, so the hero never reads broken. */}
      <div aria-hidden className="hero-backdrop absolute inset-0 -z-20">
        <Image
          src="/assets/hero-earth.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_62%]"
        />
      </div>

      {/* Two light scrims — just enough for the header and the Arabic copy to
          stay legible, without washing the photo out. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-coal-950/85 via-transparent to-coal-950/75"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-l from-coal-950/80 via-coal-950/25 to-transparent ltr:bg-gradient-to-r"
      />

      <div className="container-awj relative grid flex-1 items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/30 bg-brand-600/10 px-4 py-1.5 text-[13px] font-medium text-brand-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {t.badge}
            </span>
          </Reveal>

          <Reveal delay={80}>
            {/* Stays a clear step above the section headings at every width:
                40/32 on phones, 50/44 on tablets, 58/52 on desktop. */}
            <h1 className="mt-6 text-[40px] font-bold leading-[1.22] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-[50px] lg:text-[58px] lg:leading-[1.18]">
              {t.titleTop}
              <br />
              {t.titleBottomLead}{" "}
              <span className="gradient-text">{t.titleBottomHighlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-[1.9] text-white/70 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
              {t.lead}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full gradient-bg px-7 py-3.5 font-semibold text-coal-950 transition-transform hover:scale-[1.03] active:scale-95"
              >
                {t.ctaPrimary}
                <IconArrow className="h-5 w-5 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-md">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-br from-brand-600/25 to-brand-500/5 blur-2xl"
            />
            <div className="rounded-[32px] border border-white/12 bg-coal-950/45 p-10 backdrop-blur-md">
              <Image
                src={content.logo}
                alt={locale === "en" ? site.nameEn : site.nameAr}
                width={144}
                height={180}
                priority
                unoptimized
                className="mx-auto h-auto w-full max-w-[180px]"
              />
              <div className="rule-gradient my-8" />
              <p
                dir="ltr"
                className="text-center text-sm tracking-wide text-white/60"
              >
                {site.taglineEn}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* The three service lines, stated plainly */}
      <div className="relative border-t border-brand-600/25 bg-coal-950/80 backdrop-blur-md">
        <ul className="container-awj grid gap-y-6 py-8 sm:grid-cols-3">
          {content.pillars.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar}
              delay={i * 90}
              className="flex items-center justify-center gap-3 text-center"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full gradient-bg" />
              <span className="text-[15px] font-medium text-white/75">
                {pillar}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
