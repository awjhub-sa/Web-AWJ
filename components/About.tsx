import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { about } from "@/lib/content";

const cards = [about.vision, about.mission, about.goals];

export default function About() {
  return (
    <section id="about" className="bg-white py-24 sm:py-28">
      <div className="container-awj">
        <SectionHeading
          eyebrow="من نحن"
          title="أوج لحلول الأعمال"
          body="شركة سعودية تبني الأنظمة التي تُدار بها الأعمال — من التحليل والتصميم، إلى التنفيذ والإطلاق، ثم التشغيل والدعم."
          align="center"
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal as="li" key={card.title} delay={i * 100}>
              <article className="group flex h-full flex-col rounded-card border border-line bg-shell p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/40 hover:bg-white hover:shadow-[0_18px_45px_-22px_rgba(20,196,138,0.45)]">
                <span className="text-sm font-bold text-brand-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[22px] font-bold text-ink-900">
                  {card.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.95] text-ink-700">
                  {card.body}
                </p>
                {"extra" in card && card.extra ? (
                  <p className="mt-4 border-t border-line pt-4 text-[15px] leading-[1.9] text-ink-500">
                    {card.extra}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
