import Reveal from "./Reveal";
import { IconArrow } from "./Icons";
import { getContent, type Locale } from "@/lib/content";

export default function CtaBand({ locale }: { locale: Locale }) {
  const t = getContent(locale).cta;
  return (
    <section className="bg-shell py-16 sm:py-20">
      <div className="container-awj">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] gradient-bg px-8 py-12 sm:px-14 sm:py-16">
            {/* Soft light sweep so the flat gradient does not read as a plain block */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/25 blur-[70px]"
            />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold leading-[1.45] text-coal-950 sm:text-[32px] sm:leading-[1.35]">
                  {t.titleTop}
                  <br className="hidden sm:block" /> {t.titleBottom}
                </h2>
                <p className="mt-3 max-w-lg text-[16px] leading-[1.85] text-coal-950/70">
                  {t.body}
                </p>
              </div>
              <a
                href="#contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-coal-950 px-7 py-3.5 font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
              >
                {t.button}
                <IconArrow className="h-5 w-5 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
