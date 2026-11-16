"use client";

import { useEffect, useRef, useState } from "react";
import { motionConfig } from "@/lib/motion";
import { supportsRichMotion } from "@/lib/device";

export function Sequence() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const node = section.current;
    if (!node || !supportsRichMotion()) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || !section.current || !canvas.current) return;
    const node = section.current;
    const surface = canvas.current;
    let cancelled = false;
    let destroy: (() => void) | undefined;

    async function prepare() {
      const frames: HTMLImageElement[] = [];
      try {
        for (let i = 0; i < motionConfig.sequenceFrames; i += 4) {
          const batch = await Promise.all(Array.from({ length: Math.min(4, motionConfig.sequenceFrames - i) }, async (_, index) => {
            const image = new Image();
            image.src = `/sequence/${String(i + index + 1).padStart(3, "0")}.webp`;
            await image.decode();
            return image;
          }));
          if (cancelled) return;
          frames.push(...batch);
          setProgress(Math.round(frames.length / motionConfig.sequenceFrames * 100));
        }
        const context = surface.getContext("2d");
        if (!context) throw new Error("Canvas 2D context is unavailable");
        const draw = (position: number) => {
          const index = Math.min(frames.length - 1, Math.max(0, Math.round(position * (frames.length - 1))));
          const image = frames[index];
          if (!image) return;
          context.clearRect(0, 0, surface.width, surface.height);
          context.drawImage(image, 0, 0, surface.width, surface.height);
        };
        draw(0);
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const trigger = ScrollTrigger.create({
          trigger: node,
          start: "top top",
          end: "bottom bottom",
          scrub: motionConfig.sequenceScrub,
          onUpdate: (self) => {
            draw(self.progress);
            node.style.setProperty("--sequence-first", String(Math.max(0, Math.min(1, (0.65 - self.progress) * 5))));
            node.style.setProperty("--sequence-second", String(Math.max(0, Math.min(1, (self.progress - 0.48) * 5))));
          },
        });
        destroy = () => trigger.kill();
      } catch (cause) {
        if (!cancelled) {
          console.error("Could not load the cinematic sequence", cause);
          setError(true);
        }
      }
    }

    void prepare();
    return () => { cancelled = true; destroy?.(); };
  }, [active]);

  return <section ref={section} className="sequence" aria-labelledby="sequence-title">
    <div className="sequence-stage">
      <canvas ref={canvas} width="960" height="600" aria-hidden="true" className={progress === 100 && !error ? "is-ready" : ""} />
      <div className="sequence-shade" />
      <div className="sequence-copy">
        <p className="eyebrow"><span className="status-dot" /> THE ART OF BECOMING</p>
        <h2 id="sequence-title">From a little idea<br /><em>to a lasting impression.</em></h2>
        <p>Every great website starts with a spark. We help it find its shape.</p>
      </div>
      <div className="sequence-copy sequence-copy-second">
        <p className="eyebrow"><span className="status-dot" /> MADE WITH INTENTION</p>
        <h2>Built to look good.<br /><em>Made to work harder.</em></h2>
        <p>Considered from the first sketch to the final click.</p>
      </div>
      <div className="sequence-meta"><span>STRATEGY &nbsp; / &nbsp; DESIGN &nbsp; / &nbsp; DEVELOPMENT</span><span><span className="sequence-desktop-label">{error ? "STATIC VIEW" : active && progress < 100 ? `LOADING ${progress}%` : "SCROLL TO TRANSFORM"}</span><span className="sequence-mobile-label">STATIC VIEW</span></span></div>
    </div>
  </section>;
}
