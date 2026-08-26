"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { delivery, services, site } from "@/lib/content";
import { IconArrow, IconAt, IconGlobe, IconMail } from "./Icons";

const fieldClass =
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/50 outline-none transition-colors focus:border-brand-600 focus:bg-white/[0.07]";

type Status = "idle" | "sending" | "sent" | "handoff" | "error";

const STATUS_TEXT: Record<Exclude<Status, "idle">, string> = {
  sending: "جارٍ الإرسال…",
  sent: "وصلنا طلبك — نعود إليك خلال يوم عمل واحد.",
  handoff: "تم تجهيز رسالتك — أكمل الإرسال من برنامج البريد لديك.",
  error: "تعذّر الإرسال. جرّب مرة أخرى أو راسلنا مباشرة على البريد أعلاه.",
};

export default function Contact() {
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
    const payload = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      contact: String(data.get("contact") ?? ""),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? ""),
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

  function openMailClient(p: {
    name: string;
    company: string;
    contact: string;
    service: string;
    message: string;
  }) {
    const body = [
      `الاسم: ${p.name}`,
      `الجهة: ${p.company}`,
      `وسيلة التواصل: ${p.contact}`,
      `الخدمة: ${p.service}`,
      "",
      p.message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `طلب مشروع — ${p.company || p.name}`,
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
            eyebrow="تواصل معنا"
            tone="dark"
            title={
              <>
                احكِ لنا عن
                <br />
                <span className="gradient-text">العملية التي تُتعبك</span>
              </>
            }
            body={`أرسل تفاصيل احتياجك وسنعود إليك بنطاق عمل مبدئي وتقدير للمدة والتكلفة. التنفيذ عادة بين ${delivery.min} و${delivery.max} ${delivery.unit}.`}
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
                  الاسم <span className="text-brand-500">*</span>
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="اسمك الكامل"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/60">
                  الجهة / الشركة
                </span>
                <input
                  name="company"
                  autoComplete="organization"
                  placeholder="اسم المنشأة (اختياري)"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/60">
                  بريد أو جوال للتواصل{" "}
                  <span className="text-brand-500">*</span>
                </span>
                <input
                  name="contact"
                  required
                  dir="ltr"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`${fieldClass} text-right`}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/60">
                  الخدمة المطلوبة
                </span>
                <select name="service" className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    اختر الخدمة
                  </option>
                  {services.map((service) => (
                    <option key={service.id}>{service.title}</option>
                  ))}
                  <option>غير محدد بعد</option>
                </select>
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm text-white/60">
                تفاصيل الاحتياج
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="ما العملية التي تريد أتمتتها؟ من يستخدمها؟ وما الموعد المستهدف؟"
                className={`${fieldClass} resize-y`}
              />
            </label>

            {/* Honeypot — hidden from people, irresistible to bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                الموقع الإلكتروني
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-7 py-3.5 font-semibold text-coal-950 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "جارٍ الإرسال…" : "أرسل الطلب"}
              <IconArrow className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
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
              {status === "idle" ? "" : STATUS_TEXT[status]}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
