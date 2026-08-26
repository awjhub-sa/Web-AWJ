import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { getContent, type Locale } from "@/lib/content";

export default function WhyUs({ locale }: { locale: Locale }) {
  const t = getContent(locale).why;
  return (
    <section id="why" className="bg-shell py-24 sm:py-28">
      <div className="container-awj">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          body={t.body}
          align="center"
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {t.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 100}>
              <article className="group relative h-full overflow-hidden rounded-card border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-[0_18px_45px_-22px_rgba(20,196,138,0.45)]">
                <span
                  aria-hidden
                  className="absolute inset-y-0 start-0 w-1 gradient-bg transition-[width] duration-300 group-hover:w-1.5"
                />
                <span className="text-sm font-bold text-brand-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[22px] font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.9] text-ink-700">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
