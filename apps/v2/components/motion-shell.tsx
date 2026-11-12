"use client";

import { useEffect, useRef } from "react";
import { supportsRichMotion } from "@/lib/device";
import { motionConfig } from "@/lib/motion";

export function MotionShell() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!supportsRichMotion()) {
      document.documentElement.classList.add("reduced-effects");
      return () => document.documentElement.classList.remove("reduced-effects");
    }
    let cancelled = false;
    let frame = 0;
    let cleanup: (() => void) | undefined;
    const move = (event: PointerEvent) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        cursor.current.style.opacity = "1";
      }
    };
    const leave = () => { if (cursor.current) cursor.current.style.opacity = "0"; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ anchors: true, lerp: motionConfig.smoothLerp });
      const tick = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
      cleanup = () => lenis.destroy();
    }).catch((error) => console.error("Could not initialise smooth scrolling", error));
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      cleanup?.();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <><div className="intro-loader" aria-hidden="true"><span>roz<span>.</span></span><small>A LITTLE STUDIO FOR BIG IDEAS</small></div><div ref={cursor} className="custom-cursor" aria-hidden="true" /></>;
}
