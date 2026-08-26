"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { faqs } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="container-awj grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow="أسئلة متكررة"
          title="ما يسأل عنه العملاء عادة"
          body="لم تجد سؤالك؟ اكتب لنا وسنرد خلال يوم عمل واحد."
        />

        <ul className="divide-y divide-line border-y-2 border-brand-600/20">
          {faqs.map((item, i) => {
            const expanded = open === i;
            return (
              <Reveal as="li" key={item.q} delay={i * 70}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-right"
                  >
                    <span
                      className={`text-[17px] font-semibold transition-colors ${
                        expanded ? "text-brand-700" : "text-ink-900"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink-500 transition-transform duration-300 ${
                        expanded
                          ? "rotate-45 border-brand-600 text-brand-700"
                          : ""
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  // The row collapses to 0fr but the text stays in the DOM;
                  // without `inert` a screen reader still announces it.
                  inert={!expanded}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pl-12 text-[15px] leading-[1.9] text-ink-500">
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
