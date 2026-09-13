"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The one piece of 3D on the site, and it earns its place: the company builds
 * systems that run in the field, and the two markers are where they run —
 * Riyadh and Makkah, the Hajj season NSAB was built for.
 *
 * `cobe` rather than Three.js on purpose. A three.js + react-three-fiber globe
 * costs well over a megabyte of dependency for the same picture; cobe is a
 * single WebGL shader in about twenty kilobytes. On a marketing page served to
 * phones in Saudi Arabia that difference is the whole argument.
 *
 * It is also imported inside the effect rather than at module scope, so the
 * library lands in its own chunk fetched after hydration — the hero paints at
 * exactly the speed it did before, and the globe arrives into it.
 */

/** Where the work actually runs. */
const MARKERS = [
  { location: [24.7136, 46.6753] as [number, number], size: 0.055 }, // الرياض
  { location: [21.3891, 39.8579] as [number, number], size: 0.075 }, // مكة
];

export default function Globe({ label }: { label: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  // Rotation state lives in refs, not React state: these change every frame and
  // re-rendering the tree sixty times a second would cost far more than the
  // globe itself.
  const phi = useRef(0);
  const drag = useRef<{ x: number; phi: number } | null>(null);
  const spin = useRef(0.0032);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let globe: import("cobe").Globe | null = null;
    let cancelled = false;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) spin.current = 0;

    // A square that tracks the column width.
    let size = wrap.clientWidth;
    const observer = new ResizeObserver(() => {
      size = wrap.clientWidth;
    });
    observer.observe(wrap);

    let frame = 0;

    (async () => {
      let createGlobe;
      try {
        createGlobe = (await import("cobe")).default;
      } catch {
        // No WebGL, a blocked chunk, an old browser — the hero simply keeps
        // the layout it already has rather than showing a broken frame.
        return;
      }
      if (cancelled) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio, 2),
        width: size * 2,
        height: size * 2,
        phi: 0,
        theta: 0.24,
        dark: 1,
        diffuse: 1.3,
        scale: 1,
        mapSamples: 15000,
        mapBrightness: 5.2,
        // The identity, in the 0–1 range cobe wants: navy landmass, the blue
        // accent for the markers, a cool rim light.
        baseColor: [0.13, 0.19, 0.29],
        markerColor: [0.23, 0.45, 0.84],
        glowColor: [0.16, 0.25, 0.42],
        markers: MARKERS,
      });

      // createGlobe paints once on its own, so the canvas already has the
      // globe on it here. Revealing on that fact rather than from inside a
      // frame callback matters: a throttled tab never runs the callback, and
      // gating visibility on it would leave the globe invisible for good.
      setReady(true);

      // cobe v2 draws only when told to — it ships no loop of its own — so the
      // rotation and the resize both ride this one.
      const tick = () => {
        if (cancelled || !globe) return;
        if (!drag.current) phi.current += spin.current;
        globe.update({
          phi: phi.current,
          width: size * 2,
          height: size * 2,
        });
        frame = requestAnimationFrame(tick);
      };
      tick();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      globe?.destroy();
    };
  }, []);

  /** Drag to spin it by hand; releasing hands it back to the idle rotation. */
  function onPointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    drag.current = { x: event.clientX, phi: phi.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    const from = drag.current;
    if (!from) return;
    phi.current = from.phi + (event.clientX - from.x) / 180;
  }
  function onPointerUp(event: React.PointerEvent<HTMLCanvasElement>) {
    drag.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div ref={wrapRef} className="relative mx-auto aspect-square w-full max-w-[430px]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`h-full w-full cursor-grab touch-pan-y transition-opacity duration-1000 active:cursor-grabbing ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
