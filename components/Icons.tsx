import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconBuild(p: IconProps) {
  // Layers + cursor: designing then shipping the solution
  return (
    <svg {...base} {...p}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m4.5 12 7.5 4 7.5-4" />
      <path d="m4.5 16.5 7.5 4 7.5-4" />
    </svg>
  );
}

export function IconWeb(p: IconProps) {
  // Browser window + phone: the two screens the work ships on
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="4.5" width="12" height="9.5" rx="2" />
      <path d="M2.5 8h12" />
      <path d="M8.5 14v4.5M5.75 18.5h5.5" />
      <rect x="16.5" y="9" width="5" height="10.5" rx="1.6" />
      <path d="M18.4 17.2h1.2" />
    </svg>
  );
}

export function IconSupport(p: IconProps) {
  // Headset: the channel that receives reports and clears faults
  return (
    <svg {...base} {...p}>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <path d="M4 14.5h1.8a1.2 1.2 0 0 1 1.2 1.2v2.6A1.2 1.2 0 0 1 5.8 19.5H4Z" />
      <path d="M20 14.5h-1.8a1.2 1.2 0 0 0-1.2 1.2v2.6a1.2 1.2 0 0 0 1.2 1.2H20Z" />
      <path d="M18.5 19.5v.5a2 2 0 0 1-2 2H13" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconArrow({ className = "", ...p }: IconProps) {
  // Drawn pointing right-to-left for the Arabic page; `ltr:-scale-x-100` flips
  // it on the English one. Tailwind v4 writes scale and translate to separate
  // CSS properties, so the hover nudge at the call site still composes.
  return (
    <svg
      {...base}
      className={`ltr:-scale-x-100 ${className}`.trim()}
      {...p}
    >
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function IconGlobe(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9.5h17M3.5 14.5h17" />
      <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z" />
    </svg>
  );
}

export function IconAt(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M15.6 8.4v4.8a2.7 2.7 0 0 0 5.4 0V12a9 9 0 1 0-3.6 7.2" />
    </svg>
  );
}

export const serviceIcons = {
  build: IconBuild,
  web: IconWeb,
  support: IconSupport,
} as const;

/* ── Social marks ─────────────────────────────────────────
   Filled glyphs rather than the stroked set above: these are brand marks and
   only stay recognisable at 16px in their solid form. */

const solid = { viewBox: "0 0 24 24", fill: "currentColor" };

export function IconX(p: IconProps) {
  return (
    <svg {...solid} {...p}>
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-6.09l-4.77-6.23L5.42 21H2.4l7.06-8.07L2.25 3h6.24l4.31 5.7L17.53 3Zm-1.06 16.2h1.67L7.6 4.71H5.81l10.66 14.49Z" />
    </svg>
  );
}

export function IconLinkedIn(p: IconProps) {
  return (
    <svg {...solid} {...p}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06C20.44 8.58 21 10.8 21 13.7V21h-4v-6.47c0-1.54-.03-3.53-2.15-3.53-2.15 0-2.48 1.68-2.48 3.42V21H9V9Z" />
    </svg>
  );
}

export function IconInstagram(p: IconProps) {
  return (
    <svg {...solid} {...p}>
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.46.66.26 1.22.6 1.77 1.16.56.55.9 1.11 1.16 1.77.25.64.41 1.36.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.21 1.79-.46 2.43-.26.66-.6 1.22-1.16 1.77-.55.56-1.11.9-1.77 1.16-.64.25-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.21-2.43-.46a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.41-1.36-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.21-1.79.46-2.43.26-.66.6-1.22 1.16-1.77a4.9 4.9 0 0 1 1.77-1.16c.64-.25 1.36-.41 2.43-.46C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.35-.3.88-.34 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.14.88.3 1.86.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.35.3-.88.34-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.35-.14-.88-.3-1.86-.34-1.05-.05-1.37-.06-4.04-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
  );
}

export function IconLinktree(p: IconProps) {
  return (
    <svg {...solid} {...p}>
      <path d="M13.736 5.853 17.741 1.736l2.325 2.38-4.2 4.005h5.908v3.305h-5.937l4.229 4.108-2.325 2.334-5.766-5.802-5.766 5.802-2.325-2.325 4.229-4.108H2.226V8.121h5.909l-4.2-4.004 2.324-2.381 4.005 4.117V0h3.472v5.853ZM10.264 18.44h3.472V24h-3.472v-5.56Z" />
    </svg>
  );
}
