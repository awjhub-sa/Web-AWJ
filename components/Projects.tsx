"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Spotlight from "./Spotlight";
import { getContent, type Locale } from "@/lib/content";
import { IconArrow, IconCheck } from "./Icons";

/**
 * Our own products. NSAB is one project of AWJ HUB — presented as a case,
 * not as the company's identity.
 *
 * Built as an ARIA tab set so it scales: the moment a second project is added
 * to `lib/content.ts` the strip appears and the panel starts switching. With a
 * single project the strip is omitted entirely rather than shown as one lonely
 * tab, and what remains is the featured layout this section always had.
 */
export default function Projects({ locale }: { locale: Locale }) {
  const t = getContent(locale).projects;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const many = t.items.length > 1;
  const project = t.items[active];

  /**
   * Arrow keys move between tabs, as the tab pattern requires — and because
   * the page is RTL the "next" tab sits to the left, so the horizontal keys
   * are swapped when the document reads right to left.
   */
  function onKeyDown(event: React.KeyboardEvent) {
    const rtl = getContent(locale).dir === "rtl";
    const last = t.items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = rtl ? active - 1 : active + 1;
    else if (event.key === "ArrowLeft") next = rtl ? active + 1 : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;

    event.preventDefault();
    const clamped = next < 0 ? last : next > last ? 0 : next;
    setActive(clamped);
    tabRefs.current[clamped]?.focus();
  }

  return (
    <section
      id="projects"
      className="edge-gradient dot-grid relative overflow-hidden bg-navy-800 py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="orb pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-600/20 blur-[120px]"
      />

      <div className="container-awj relative">
        <SectionHeading
          eyebrow={t.eyebrow}
          tone="dark"
          title={
            <>
              {t.titleLead}{" "}
              <span className="gradient-text">{t.titleHighlight}</span>
            </>
          }
        />

        {many ? (
          <Reveal delay={120}>
            <div
              role="tablist"
              aria-label={t.tablistAria}
              onKeyDown={onKeyDown}
              className="mt-12 flex flex-wrap gap-2.5"
            >
              {t.items.map((item, i) => {
                const on = i === active;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabRefs.current[i] = node;
                    }}
                    role="tab"
                    id={`project-tab-${item.id}`}
                    aria-selected={on}
                    aria-controls={`project-panel-${item.id}`}
                    // Only the active tab is reachable by Tab; the arrow keys
                    // move within the set. That is the whole point of the
                    // pattern — one stop for the group, not one per project.
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`rounded-full border px-5 py-2.5 text-[15px] font-semibold transition-all duration-300 ${
                      on
                        ? "border-brand-500/60 bg-brand-600/20 text-white"
                        : "border-white/12 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        <div
          // Remounting on change replays the entry animation, which is what
          // makes switching read as a change rather than a text swap.
          key={project.id}
          role={many ? "tabpanel" : undefined}
          id={`project-panel-${project.id}`}
          aria-labelledby={many ? `project-tab-${project.id}` : undefined}
          tabIndex={many ? 0 : undefined}
          className={`panel-in mt-12 grid gap-12 outline-none lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 ${
            many ? "" : "mt-14"
          }`}
        >
          <Reveal>
            <Spotlight className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm transition-colors duration-300 hover:border-brand-500/30">
              <Image
                src={project.logoLight}
                alt={project.name}
                width={608}
                height={179}
                unoptimized
                className="mx-auto h-auto w-full max-w-[240px]"
              />
              <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-600/30 bg-brand-600/10 px-3.5 py-1.5 text-xs font-medium text-brand-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {project.status}
              </span>
              <p className="mt-5 text-[15px] leading-[1.9] text-white/55">
                {project.summary}
              </p>

              {project.tags?.length ? (
                <ul className="mt-6 flex flex-wrap justify-center gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/12 px-3 py-1 text-[12px] text-white/55"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Spotlight>
          </Reveal>

          <Reveal delay={140}>
            <h3 className="text-2xl font-bold text-white sm:text-[28px]">
              {project.name}{" "}
              <span className="text-white/50">{project.subtitle}</span>
            </h3>
            <p className="mt-4 max-w-xl text-[16px] leading-[1.9] text-white/55">
              {project.lead}
            </p>

            <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <li
                  key={feature}
                  // Each line arrives just after the one before it, so the
                  // list assembles instead of appearing all at once.
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                  className="feature-in group/f flex items-start gap-3"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600/15 text-brand-400 transition-colors duration-300 group-hover/f:bg-brand-600/30">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] leading-[1.8] text-white/70 transition-colors duration-300 group-hover/f:text-white">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-brand-600/40 bg-brand-600/10 px-6 py-3 font-semibold text-brand-400 transition-colors hover:bg-brand-600/20 hover:text-white"
            >
              {t.cta}
              <IconArrow className="h-5 w-5 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
