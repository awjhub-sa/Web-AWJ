import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { services } from "@/lib/content";
import { IconCheck, serviceIcons } from "./Icons";

export default function Services() {
  return (
    <section id="services" className="bg-shell py-24 sm:py-28">
      <div className="container-awj">
        <SectionHeading
          eyebrow="خدماتنا"
          title="ما نقدمه لك"
          body="نصمّم الحل الرقمي، ونشغّله، ونبقى معك بعد التسليم."
          align="center"
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal as="li" key={service.id} delay={i * 100}>
                <article className="group flex h-full flex-col rounded-card border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-[0_18px_45px_-22px_rgba(20,196,138,0.45)]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl gradient-bg text-coal-950 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-[22px] font-bold text-ink-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.9] text-ink-700">
                    {service.body}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-600/12 text-brand-700">
                          <IconCheck className="h-2.5 w-2.5" strokeWidth={2.4} />
                        </span>
                        <span className="text-[14px] leading-[1.8] text-ink-500">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
