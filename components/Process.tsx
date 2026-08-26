import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import DeliveryRange from "./DeliveryRange";
import { delivery, process } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="bg-white py-24 sm:py-28">
      <div className="container-awj">
        <SectionHeading
          eyebrow="كيف نعمل"
          title="من أول جلسة إلى نظام يعمل"
          align="center"
        />

        {/* The delivery window, stated once and clearly */}
        <Reveal delay={120}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 rounded-card border border-brand-600/25 bg-brand-600/[0.06] px-6 py-6 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-right">
            <DeliveryRange className="text-3xl font-bold gradient-text sm:text-4xl" />
            <span className="hidden h-10 w-px bg-brand-600/25 sm:block" />
            <span className="max-w-xs text-[15px] leading-[1.8] text-ink-500">
              مدة تنفيذ الموقع أو التطبيق. {delivery.note}
            </span>
          </div>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Connecting rail — desktop only */}
          {/* The rail used to be a grey hairline — in brand colour it reads as
              one continuous path through the four steps. */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-7 hidden h-[2px] bg-gradient-to-l from-transparent via-brand-600/45 to-transparent md:block"
          />
          {process.map((step, i) => (
            <Reveal
              as="li"
              key={step.step}
              delay={i * 110}
              className="group relative"
            >
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl gradient-bg text-lg font-bold text-coal-950 transition-transform duration-300 group-hover:scale-110">
                {step.step}
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-1.5 inline-flex rounded-full bg-brand-600/[0.09] px-2.5 py-1 text-[13px] font-bold text-brand-700">
                {step.duration}
              </p>
              <p className="mt-3 text-[15px] leading-[1.9] text-ink-700">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
