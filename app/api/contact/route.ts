import { NextResponse } from "next/server";
import { isLocale, site } from "@/lib/content";

/**
 * Receives the contact form and emails it to the company inbox at Zoho.
 *
 * Delivery goes through ZeptoMail — Zoho's transactional mail product — called
 * over its REST API with `fetch` rather than an SDK, so the project gains no
 * dependency. Its REST API is what makes this work at all: the site runs on
 * Cloudflare Workers, which cannot open an outbound SMTP connection, so
 * `smtp.zoho.com` is not reachable from here no matter the credentials.
 *
 * Set these to turn it on (see `.env.example`):
 *
 *   ZEPTOMAIL_TOKEN   the Send Mail token from a ZeptoMail Mail Agent
 *   CONTACT_FROM      a sender on a domain verified inside ZeptoMail
 *   ZEPTOMAIL_HOST    optional — the regional API host for the data centre
 *
 * With the token absent the route answers 501 and the form falls back to
 * opening the visitor's mail client, which is what it did before this route
 * existed — so an unconfigured deploy still works, it just loses the trail.
 */

const TO = process.env.CONTACT_TO ?? site.email;
/** ZeptoMail is regional: .eu / .in accounts reject calls to the .com host. */
const API_HOST = process.env.ZEPTOMAIL_HOST ?? "api.zeptomail.com";
const MAX = 5000;

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  /** Which face of the site they wrote from — so you reply in their language. */
  locale?: string;
  /** Honeypot: a real person never sees this field, so anything in it is a bot. */
  website?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (clean(body.website)) {
    // Silently accept so the bot does not learn it was caught.
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const company = clean(body.company);
  const service = clean(body.service);
  const message = clean(body.message);
  const locale = isLocale(clean(body.locale)) ? clean(body.locale) : "ar";

  // Either channel is enough to answer them — the form only marks email as
  // required, but a phone-only submission must not be thrown away.
  if (!name || (!email && !phone)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }

  const token = process.env.ZEPTOMAIL_TOKEN;
  const from = process.env.CONTACT_FROM;
  if (!token || !from) {
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  // ZeptoMail's dashboard copies the token with the `Zoho-enczapikey ` prefix
  // already on it, and the header below adds the same prefix — pasting it
  // verbatim would send it twice. Accept the token with or without it.
  const key = token.replace(/^Zoho-enczapikey\s+/i, "").trim();

  // `ltr` on the value keeps an address or a `+966…` number from being
  // reordered by the surrounding RTL paragraph.
  const rows: Array<[string, string, "ltr"?]> = [
    ["الاسم", name],
    ["الجهة", company || "—"],
    ["البريد الإلكتروني", email || "—", "ltr"],
    ["رقم الجوال", phone || "—", "ltr"],
    ["الخدمة", service || "—"],
    ["لغة الزائر", locale === "en" ? "الإنجليزية" : "العربية"],
  ];

  const html = `<div dir="rtl" style="font-family:system-ui,sans-serif;line-height:1.9">
  <h2 style="margin:0 0 16px">طلب جديد من موقع ${escapeHtml(site.nameAr)}</h2>
  <table cellpadding="6" style="border-collapse:collapse">
    ${rows
      .map(
        ([label, value, dir]) =>
          `<tr><td style="color:#5b6779">${label}</td><td${
            dir ? ` dir="${dir}" align="right"` : ""
          }><strong>${escapeHtml(value)}</strong></td></tr>`,
      )
      .join("")}
  </table>
  ${message ? `<p style="margin-top:16px;white-space:pre-wrap">${escapeHtml(message)}</p>` : ""}
</div>`;

  const response = await fetch(`https://${API_HOST}/v1.1/email`, {
    method: "POST",
    headers: {
      // ZeptoMail's own scheme, not Bearer — the prefix is part of the value.
      Authorization: `Zoho-enczapikey ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      from: { address: from, name: site.nameAr },
      to: [{ email_address: { address: TO, name: site.nameAr } }],
      subject: `طلب مشروع — ${company || name}`,
      htmlbody: html,
      // Lets you hit reply and reach the sender when they left an address.
      ...(email.includes("@")
        ? { reply_to: [{ address: email, name: name }] }
        : {}),
    }),
  });

  if (!response.ok) {
    console.error(
      "contact: zeptomail rejected",
      response.status,
      await response.text(),
    );
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
