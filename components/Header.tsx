"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // How far down the page the reader is — drawn as the rail below.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Highlight the nav item whose section currently owns the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target.id) setActive(`#${top.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-coal-950/85 backdrop-blur-xl shadow-[0_1px_0_rgba(20,196,138,0.22)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-awj flex h-[72px] items-center justify-between gap-4">
        <a
          href="#home"
          className="flex shrink-0 items-center"
          aria-label={`${site.nameAr} — الصفحة الرئيسية`}
        >
          <Image
            src="/assets/awj-ar-light.svg"
            alt={site.nameAr}
            width={144}
            height={180}
            priority
            // Vector already — the optimizer has nothing to gain here, and it
            // refuses SVG without `dangerouslyAllowSVG`.
            unoptimized
            className="h-11 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="رئيسية">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-[15px] transition-colors ${
                active === item.href
                  ? "text-brand-500"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full gradient-bg px-5 py-2.5 text-[15px] font-semibold text-coal-950 transition-transform hover:scale-[1.03] active:scale-95 sm:inline-block"
          >
            ابدأ مشروعك
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[7px] h-0.5 rounded bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[14px] h-0.5 rounded bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Reading progress. Grows from the right because the page is RTL. */}
      <div
        aria-hidden
        className={`h-[2px] w-full origin-right transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="gradient-bg h-full origin-right"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        // Collapsed to max-height 0, but the links stay focusable unless the
        // sheet is taken out of the accessibility tree entirely.
        inert={!open}
        className={`overflow-hidden border-t border-white/10 bg-coal-950/95 backdrop-blur-xl transition-[max-height] duration-400 lg:hidden ${
          open ? "max-h-[520px]" : "max-h-0"
        }`}
      >
        <nav className="container-awj flex flex-col py-3" aria-label="جوال">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3.5 text-[17px] text-white/80 last:border-0 hover:text-brand-500"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 mb-2 rounded-full gradient-bg px-5 py-3 text-center font-semibold text-coal-950"
          >
            ابدأ مشروعك
          </a>
        </nav>
      </div>
    </header>
  );
}
