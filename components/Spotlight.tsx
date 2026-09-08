"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps a card so a soft brand glow follows the cursor across it.
 *
 * The position is written straight to CSS custom properties on the node rather
 * than through React state: this fires on every mouse move, and re-rendering
 * a card subtree at that rate is the one thing that would make the effect feel
 * worse than not having it. The paint itself lives in `.spotlight::before`.
 *
 * Touch devices never fire the handler, and the glow is bound to `:hover`, so
 * they simply get the card as it was.
 */
export default function Spotlight({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);

  function track(event: React.MouseEvent<HTMLElement>) {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
  }

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      onMouseMove={track}
      className={`spotlight ${className}`}
    >
      {children}
    </Tag>
  );
}
