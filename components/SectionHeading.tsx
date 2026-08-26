import Reveal from "./Reveal";

/**
 * The heading block every section opens with. The three parts read in order:
 * a small labelled chip (which section you are in), the title itself, and an
 * optional lead paragraph. The gradient rule between the title and the lead is
 * what makes the block read as a section opener rather than as another card
 * heading — the section titles and the card titles inside them used to sit
 * only one step apart on the type scale.
 */
export default function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "light",
  align = "start",
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
}) {
  const dark = tone === "dark";
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2.5 rounded-full border-[1.5px] px-5 py-2.5 text-[17px] font-bold leading-none sm:text-[19px] ${
            dark
              ? "border-brand-600/40 bg-brand-600/[0.14] text-brand-400"
              : // brand-700 lands at 3.0:1 on the tinted fill — technically a
                // pass for large bold text, but with no margin. brand-800
                // clears 4.6:1 and still reads as the brand green.
                "border-brand-600/35 bg-brand-600/[0.10] text-brand-800"
          }`}
        >
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full bg-brand-500"
          />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={70}>
        <h2
          className={`mt-5 text-[32px] font-bold leading-[1.25] tracking-[-0.01em] sm:text-[44px] sm:leading-[1.2] lg:text-[52px] ${
            dark ? "text-white" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={110}>
        <div
          className={`gradient-bg mt-6 h-[3px] w-[88px] rounded-full ${
            centered ? "mx-auto" : ""
          }`}
        />
      </Reveal>
      {body ? (
        <Reveal delay={150}>
          <p
            className={`mt-6 text-[17px] leading-[1.95] sm:text-[18px] ${
              dark ? "text-white/65" : "text-ink-700"
            }`}
          >
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
