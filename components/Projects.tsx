import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { getContent, type Locale } from "@/lib/content";
import { IconArrow, IconCheck } from "./Icons";

/**
 * Our own products. NSAB is one project of AWJ HUB — presented as a case,
 * not as the company's identity.
 */
export default function Projects({ locale }: { locale: Locale }) {
  const t = getContent(locale).projects;
  return (
    <section
      id="projects"
      className="edge-gradient relative overflow-hidden bg-coal-800 py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-600/15 blur-[120px]"
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

        {t.items.map((project) => (
          <div
            key={project.id}
            className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
          >
            <Reveal>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm">
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
              </div>
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
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600/15 text-brand-400">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[15px] leading-[1.8] text-white/70">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group mt-9 inline-flex items-center gap-2 rounded-full border border-brand-600/40 bg-brand-600/10 px-6 py-3 font-semibold text-brand-400 transition-colors hover:bg-brand-600/20"
              >
                {t.cta}
                <IconArrow className="h-5 w-5 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
