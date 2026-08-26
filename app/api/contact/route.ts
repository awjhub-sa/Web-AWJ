import { NextResponse } from "next/server";
import { site } from "@/lib/content";

/**
 * Receives the contact form and emails it to the company inbox.
 *
 * Delivery goes through Resend's REST API — called with `fetch` rather than
 * their SDK so the project gains no dependency. Set two variables to turn it
 * on (see `.env.example`):
 *
 *   RESEND_API_KEY   the key from resend.com
 *   CONTACT_FROM     a sender on a domain verified in Resend
 *
 * With the key absent the route answers 501 and the form falls back to opening
 * the visitor's mail client, which is what it did before this route existed —
 * so an unconfigured deploy still works, it just loses the audit trail.
 */

const TO = process.env.CONTACT_TO ?? site.email;
const MAX = 5000;

type Payload = {
  name?: string;
  company?: string;
  contact?: string;
  service?: string;
  message?: string;
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
  const contact = clean(body.contact);
  const company = clean(body.company);
  const service = clean(body.service);
  const message = clean(body.message);

  if (!name || !contact) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) {
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const rows: Array<[string, string]> = [
    ["الاسم", name],
    ["الجهة", company || "—"],
    ["وسيلة التواصل", contact],
    ["الخدمة", service || "—"],
  ];

  const html = `<div dir="rtl" style="font-family:system-ui,sans-serif;line-height:1.9">
  <h2 style="margin:0 0 16px">طلب جديد من موقع ${escapeHtml(site.nameAr)}</h2>
  <table cellpadding="6" style="border-collapse:collapse">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="color:#5b6779">${label}</td><td><strong>${escapeHtml(
            value,
          )}</strong></td></tr>`,
      )
      .join("")}
  </table>
  ${message ? `<p style="margin-top:16px;white-space:pre-wrap">${escapeHtml(message)}</p>` : ""}
</div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [TO],
      subject: `طلب مشروع — ${company || name}`,
      html,
      // Lets you hit reply and reach the sender when they left an address.
      ...(contact.includes("@") ? { reply_to: contact } : {}),
    }),
  });

  if (!response.ok) {
    console.error("contact: resend rejected", response.status, await response.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
