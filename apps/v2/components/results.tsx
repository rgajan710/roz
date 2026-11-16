"use client";

import { useEffect, useRef } from "react";
import { motionConfig } from "@/lib/motion";
import { soundFX } from "@/lib/audio";

const metrics = [
  {
    number: 4,
    suffix: "",
    label: "Selected Flagships",
    note: "Bespoke digital platforms engineered from scratch.",
    color: "#ea452b",
  },
  {
    number: 447,
    suffix: "+",
    label: "Fragrances Archived",
    note: "Structured catalog for Scent Vault digital archive.",
    color: "#c59b4c",
  },
  {
    number: 68,
    suffix: "",
    label: "Global Houses",
    note: "Integrated into high-speed search and filtering.",
    color: "#10b981",
  },
] as const;

export function Results() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = section.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      soundFX.playHover();
      const start = performance.now();
      const counters = node.querySelectorAll<HTMLElement>("[data-count]");
      const tick = (now: number) => {
        const progress = Math.min((now - start) / motionConfig.counterDuration, 1);
        const eased = 1 - (1 - progress) ** 3;
        counters.forEach((counter) => {
          const target = Number(counter.dataset.count);
          counter.textContent = String(Math.round(target * eased)).padStart(target < 10 ? 2 : 1, "0");
        });
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="results" ref={section} className="proof-section" aria-labelledby="proof-heading">
      <div className="proof-container">
        {/* Testimonial Quote Header */}
        <div className="proof-quote-wrapper">
          <div className="section-eyebrow">
            <span className="status-dot" />
            <span>07 / 09 &middot; CLIENT PERSPECTIVE</span>
          </div>
          <blockquote className="proof-blockquote">
            &ldquo;Work done was quick and easy, process was very effective &mdash; very professional group of people working together to provide me a great experience for my business.&rdquo;
          </blockquote>
          <div className="proof-author">
            <span className="proof-avatar" style={{ background: "rgba(197, 155, 76, 0.15)", color: "#9c7324", border: "1px solid rgba(197, 155, 76, 0.3)" }}>VS</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <strong>Vidhushi Sharma</strong>
                <span className="proof-verified-pill">● VERIFIED CLIENT</span>
              </div>
              <span>Founder &middot; Scent Vault</span>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="proof-metrics-grid">
          {metrics.map((item) => (
            <div key={item.label} className="metric-cell" style={{ borderTop: `2px solid ${item.color}` }}>
              <div className="metric-number-row" style={{ color: item.color }}>
                <strong data-count={item.number} style={{ color: item.color }}>
                  {String(item.number).padStart(item.number < 10 ? 2 : 1, "0")}
                </strong>
                {item.suffix && <span className="metric-suffix" style={{ color: item.color }}>{item.suffix}</span>}
              </div>
              <h3 className="metric-label">{item.label}</h3>
              <p className="metric-note">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
