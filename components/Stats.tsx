"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { getContent, type Locale } from "@/lib/content";

/**
 * Counts from zero to `to` the first time it is scrolled into view, then stops
 * observing. Anyone who asks for reduced motion is handed the final figure
 * immediately — a number ticking up is exactly the kind of movement that
 * setting is about.
 */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || typeof IntersectionObserver === "undefined") {
      setShown(to);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const run = (now: number) => {
          const p = Math.min(1, (now - start) / 1600);
          // Same curve the reveals use, so the count settles like they do.
          const eased = 1 - Math.pow(1 - p, 4);
          setShown(Math.round(to * eased));
          if (p < 1) frame = requestAnimationFrame(run);
        };
        frame = requestAnimationFrame(run);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <span ref={ref} dir="ltr">
      {shown}
      {suffix}
    </span>
  );
}

export default function Stats({ locale }: { locale: Locale }) {
  const t = getContent(locale).stats;

  return (
    <section
      aria-label={t.aria}
      className="dot-grid relative overflow-hidden bg-navy-900 py-16 sm:py-20"
    >
      <span
        aria-hidden
        className="orb-slow pointer-events-none absolute -top-32 start-1/3 h-[360px] w-[360px] rounded-full bg-brand-600/20 blur-[130px]"
      />

      <ul className="container-awj relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {t.items.map((item, i) => (
          <Reveal as="li" key={item.label} delay={i * 110} className="text-center">
            <p className="gradient-text text-[42px] font-bold leading-none tracking-tight sm:text-[54px]">
              {"count" in item && item.count !== undefined ? (
                <CountUp to={item.count} suffix={item.suffix ?? ""} />
              ) : (
                // A range, not a figure — the dash is bidi-neutral, so it is
                // isolated the same way DeliveryRange isolates it.
                <span dir="ltr">{item.display}</span>
              )}
            </p>
            <p className="mx-auto mt-4 max-w-[210px] text-[14px] leading-[1.75] text-white/60">
              {item.label}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
