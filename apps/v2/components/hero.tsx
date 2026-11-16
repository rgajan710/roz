"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { soundFX } from "@/lib/audio";
import { supportsRichMotion } from "@/lib/device";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supportsRichMotion()) return;
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    let cleanup: (() => void) | undefined;

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      // Hero text gently recedes, tracks, and fades as scroll begins into Chapter 2
      const st = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (content) {
            const p = self.progress;
            content.style.transform = `translate3d(0, ${p * 120}px, 0) scale(${1 - p * 0.08})`;
            content.style.opacity = `${Math.max(1 - p * 1.6, 0)}`;
          }
        },
      });

      cleanup = () => {
        st.kill();
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <section id="top" ref={heroRef} className="hero">
      <div className="hero-radial-glow" aria-hidden="true" />

      <div ref={contentRef} className="hero-content">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="status-dot" />
            <span>INDEPENDENT DIGITAL STUDIO</span>
            <span className="hero-sep">/</span>
            <span>STRATEGY &middot; DESIGN &middot; CODE</span>
            <span className="hero-sep">/</span>
            <span className="hero-studio-pill">● 4 FLAGSHIPS LIVE</span>
          </div>

          <h1 className="hero-headline">
            Digital experiences.<br />
            <em>Crafted with intention</em><span className="coral">.</span>
          </h1>

          <div className="hero-meta">
            <p className="hero-desc">
              We architect bespoke digital platforms, e-commerce storefronts, and brand identities for ambitious companies worldwide.
            </p>
            <div className="hero-actions">
              <Button
                asChild
                variant="light"
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
              >
                <a href="#work">
                  Selected Work <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
              >
                <a href="#contact">
                  Start an Inquiry
                </a>
              </Button>
            </div>
          </div>

          {/* Color-accented Flagship Quick Links */}
          <div className="hero-flagship-chips">
            <span className="flagship-chip-label">FLAGSHIP CASES:</span>
            <a href="#work" className="flagship-chip" onClick={() => soundFX.playClick()}>
              <span className="chip-dot" style={{ background: "#c59b4c" }} />
              <span>Scent Vault</span>
            </a>
            <a href="#work" className="flagship-chip" onClick={() => soundFX.playClick()}>
              <span className="chip-dot" style={{ background: "#22c55e" }} />
              <span>OUTLAND</span>
            </a>
            <a href="#work" className="flagship-chip" onClick={() => soundFX.playClick()}>
              <span className="chip-dot" style={{ background: "#f59e0b" }} />
              <span>sunroom</span>
            </a>
            <a href="#work" className="flagship-chip" onClick={() => soundFX.playClick()}>
              <span className="chip-dot" style={{ background: "#c25e3e" }} />
              <span>FORME</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-footer-bar">
        <span>01 / 09 &mdash; ARCHIVE</span>
        <span>SCROLL TO EXPLORE &darr;</span>
        <span>12.9716&deg; N, 77.5946&deg; E</span>
      </div>
    </section>
  );
}
