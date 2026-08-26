"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { getContent, site, type Locale } from "@/lib/content";
import { IconArrow, IconAt, IconGlobe, IconMail } from "./Icons";

const fieldClass =
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/50 outline-none transition-colors focus:border-brand-600 focus:bg-white/[0.07]";

type Status = "idle" | "sending" | "sent" | "handoff" | "error";

type Payload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  locale: Locale;
  website?: string;
};

export default function Contact({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const t = content.contact;
  const [status, setStatus] = useState<Status>("idle");

  /**
   * Posts to `app/api/contact`, which emails the company inbox.
   *
   * If that route is not configured yet (no Resend key on the deploy) it
   * answers 501, and we fall back to handing the message to the visitor's mail
   * client — the behaviour this form had before the route existed. A network
   * failure is reported rather than swallowed.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: Payload = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? ""),
      locale,
      website: String(data.get("website") ?? ""),
    };

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (response.status === 501) {
        openMailClient(payload);
        setStatus("handoff");
        return;
      }
      setStatus("error");
    } catch {
      // Offline or the route is unreachable — do not lose what they typed.
      openMailClient(payload);
      setStatus("handoff");
    }
  }

  function openMailClient(p: Payload) {
    const body = [
      `${t.mail.name}: ${p.name}`,
      `${t.mail.company}: ${p.company}`,
      `${t.mail.email}: ${p.email}`,
      `${t.mail.phone}: ${p.phone}`,
      `${t.mail.service}: ${p.service}`,
      "",
      p.message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `${t.mail.subject} — ${p.company || p.name}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  const contactLines = [
    { Icon: IconMail, label: site.email, href: `mailto:${site.email}` },
    { Icon: IconGlobe, label: site.domain, href: `https://${site.domain}` },
    { Icon: IconAt, label: site.handle, href: site.linktree, external: true },
  ];

  return (
    <section
      id="contact"
      className="edge-gradient relative overflow-hidden bg-coal-800 py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-brand-600/15 blur-[120px]"
      />

      <div className="container-awj relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow={t.eyebrow}
            tone="dark"
            title={
              <>
                {t.titleLead}
                <br />
                <span className="gradient-text">{t.titleHighlight}</span>
              </>
            }
            body={t.body}
          />

          <ul className="mt-9 space-y-4">
            {contactLines.map(({ Icon, label, href, external }, i) => (
              <Reveal as="li" key={label} delay={200 + i * 80}>
                <span className="flex items-center gap-3 text-white/70">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/12 text-brand-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <a
                    href={href}
                    dir="ltr"
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-[15px] transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={160}>
          <form
            onSubmit={handleSubmit}
            className="relative rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm sm:p-9"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-white/60">
                  {t.name} <span className="text-brand-500">*</span>
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={t.namePlaceholder}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/60">
                  {t.company}
                </span>
                <input
                  name="company"
                  autoComplete="organization"
                  placeholder={t.companyPlaceholder}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/60">
                  {t.email} <span className="text-brand-500">*</span>
                </span>
                {/* dir="ltr" keeps the address itself readable; the alignment
                    follows the page so the field does not look detached. */}
                <input
                  name="email"
                  type="email"
                  required
                  dir="ltr"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`${fieldClass} text-right ltr:text-left`}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/60">
                  {t.phone}
                </span>
                <input
                  name="phone"
                  type="tel"
                  dir="ltr"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={t.phonePlaceholder}
                  className={`${fieldClass} text-right ltr:text-left`}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm text-white/60">
                  {t.service}
                </span>
                <select name="service" className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    {t.servicePlaceholder}
                  </option>
                  {content.services.items.map((service) => (
                    <option key={service.id}>{service.title}</option>
                  ))}
                  <option>{t.serviceOther}</option>
                </select>
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm text-white/60">
                {t.message}
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder={t.messagePlaceholder}
                className={`${fieldClass} resize-y`}
              />
            </label>

            {/* Honeypot — hidden from people, irresistible to bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-7 py-3.5 font-semibold text-coal-950 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? t.status.sending : t.submit}
              <IconArrow className="h-5 w-5 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
            </button>

            {/* The live region stays mounted so assistive tech is watching it,
                but the text only appears on submit — an always-present string
                is never announced as a change. */}
            <p
              role="status"
              className={`mt-4 min-h-5 text-sm ${
                status === "error" ? "text-red-300" : "text-brand-400"
              }`}
            >
              {status === "idle" ? "" : t.status[status]}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
