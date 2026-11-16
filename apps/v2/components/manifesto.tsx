"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { soundFX } from "@/lib/audio";
import { supportsRichMotion } from "@/lib/device";

const MANIFESTO_WORDS = [
  { word: "We", accent: null },
  { word: "do", accent: null },
  { word: "not", accent: null },
  { word: "build", accent: null },
  { word: "disposable", accent: null },
  { word: "templates.", accent: null },
  { word: "We", accent: null },
  { word: "architect", accent: null },
  { word: "singular", accent: "coral" },
  { word: "digital", accent: null },
  { word: "flagships", accent: null },
  { word: "where", accent: null },
  { word: "artistry,", accent: "gold" },
  { word: "engineering,", accent: "green" },
  { word: "and", accent: null },
  { word: "human", accent: null },
  { word: "emotion", accent: "coral" },
  { word: "converge.", accent: null },
];

const studioWorlds = [
  { name: "Scent Vault", category: "Haute Parfumerie Codex", img: "/work/scent-vault-flagship.webp", color: "#c59b4c" },
  { name: "OUTLAND", category: "Alpine Field Apparel", img: "/work/outland-flagship.webp", color: "#22c55e" },
  { name: "sunroom", category: "Botanical Sun Care", img: "/work/sunroom-flagship.webp", color: "#f59e0b" },
  { name: "FORME", category: "Architectural Homeware", img: "/work/forme-flagship.webp", color: "#c25e3e" },
];

export function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supportsRichMotion()) return;
    const container = containerRef.current;
    const wordsContainer = wordsRef.current;
    const strip = stripRef.current;
    if (!container || !wordsContainer) return;

    let cleanup: (() => void) | undefined;

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const wordSpans = wordsContainer.querySelectorAll<HTMLElement>(".manifesto-word");

      // Smooth natural scroll scrub reveal without rigid pinning clipping
      const wordsTween = gsap.fromTo(
        wordSpans,
        {
          opacity: 0.18,
          y: 18,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: wordsContainer,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );

      // Staggered upward entrance for the 4 visual craft cards
      let stripTween: gsap.core.Tween | undefined;
      if (strip) {
        const cards = strip.querySelectorAll(".craft-card");
        stripTween = gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: strip,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.6,
            },
          }
        );
      }

      cleanup = () => {
        wordsTween.scrollTrigger?.kill();
        wordsTween.kill();
        stripTween?.scrollTrigger?.kill();
        stripTween?.kill();
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <section id="manifesto" ref={containerRef} className="manifesto-section" aria-label="Studio Manifesto">
      <div className="manifesto-stage">
        <div className="section-eyebrow">
          <span className="status-dot" />
          <span>02 / 06 &middot; THE ROZ DOCTRINE</span>
        </div>

        <div ref={wordsRef} className="manifesto-text-wrap">
          {MANIFESTO_WORDS.map((item, i) => (
            <span
              key={`${item.word}-${i}`}
              className={`manifesto-word${item.accent ? ` is-${item.accent}` : ""}`}
            >
              {item.word}&nbsp;
            </span>
          ))}
        </div>

        {/* Visual Craft Strip showing the 4 worlds Roz architects */}
        <div ref={stripRef} className="manifesto-craft-strip">
          {studioWorlds.map((world) => (
            <a
              key={world.name}
              href="#work"
              className="craft-card"
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
            >
              <div className="craft-card-img-wrap" style={{ borderColor: `${world.color}40` }}>
                <Image
                  src={world.img}
                  alt={world.name}
                  width={380}
                  height={220}
                  className="craft-img"
                />
                <span className="craft-tag" style={{ color: world.color, borderColor: `${world.color}30` }}>
                  {world.name}
                </span>
                <span className="craft-hover-hint">VIEW FLAGSHIP ↗</span>
              </div>
              <span className="craft-meta">{world.category}</span>
            </a>
          ))}
        </div>

        <div className="manifesto-footer-line">
          <span>02 / 06 &mdash; DOCTRINE</span>
          <span>BENGALURU, INDIA &mdash; WORLDWIDE</span>
        </div>
      </div>
    </section>
  );
}
