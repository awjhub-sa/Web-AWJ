import { delivery, getContent, type Locale } from "@/lib/content";

/**
 * "2–6" written with an en dash. The dash is a bidi-neutral character, so in
 * an RTL paragraph the two numbers get reordered and the range reads "6–2".
 * The dir="ltr" attribute isolates the run and keeps the order correct — it is
 * harmless on the English page, where the run is already LTR.
 */
export default function DeliveryRange({
  locale,
  withUnit = true,
  className = "",
}: {
  locale: Locale;
  withUnit?: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      <span dir="ltr">
        {delivery.min}–{delivery.max}
      </span>
      {withUnit ? ` ${getContent(locale).delivery.unit}` : null}
    </span>
  );
}
