"use client";

import { useEffect, useRef } from "react";
import { supportsRichMotion } from "@/lib/device";
import { updateScrollProgress } from "@/lib/scroll";

export function MotionShell() {
  const cursor = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBar = () => {
      if (!progressBar.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progressBar.current.style.transform = `scaleX(${Math.min(Math.max(p, 0), 1)})`;
    };
    updateBar();
    window.addEventListener("scroll", updateBar, { passive: true });
    window.addEventListener("resize", updateBar);
    return () => {
      window.removeEventListener("scroll", updateBar);
      window.removeEventListener("resize", updateBar);
    };
  }, []);

  useEffect(() => {
    if (!supportsRichMotion()) {
      document.documentElement.classList.add("reduced-effects");
      return () => document.documentElement.classList.remove("reduced-effects");
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // Fluid custom cursor physics
    const move = (event: PointerEvent) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        cursor.current.style.opacity = "1";
      }
    };
    const leave = () => {
      if (cursor.current) cursor.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    // Initialize Lenis + GSAP ScrollTrigger synchronized ticker
    void Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        anchors: true,
      });

      // Synchronize Lenis with ScrollTrigger & ScrollStore
      lenis.on("scroll", (e: { progress: number; velocity: number }) => {
        ScrollTrigger.update();
        updateScrollProgress(e.progress, e.velocity);
      });

      const tickerFn = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      // Force refresh on initial render
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(tickerFn);
        lenis.destroy();
      };
    }).catch((err) => {
      console.error("Scroll storytelling initialization error", err);
    });

    return () => {
      cancelled = true;
      cleanup?.();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={progressBar} className="scroll-progress" aria-hidden="true" />
      <div ref={cursor} className="custom-cursor" aria-hidden="true" />
    </>
  );
}
