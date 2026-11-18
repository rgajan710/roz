"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Globe, Sparkles, Zap } from "lucide-react";
import { motionConfig } from "@/lib/motion";
import { soundFX } from "@/lib/audio";

const metrics = [
  {
    number: 4,
    suffix: "",
    label: "Flagship launches",
    note: "Bespoke digital platforms engineered from scratch.",
    color: "#ea452b",
  },
  {
    number: 447,
    suffix: "+",
    label: "Products archived",
    note: "Structured catalogue built for the Scent Vault flagship.",
    color: "#c59b4c",
  },
  {
    number: 68,
    suffix: "",
    label: "Global houses",
    note: "Integrated into high-speed search and filtering.",
    color: "#8b5cf6",
  },
  {
    number: 12,
    suffix: "wks",
    label: "Average build",
    note: "From kickoff to live launch on flagship projects.",
    color: "#10b981",
  },
] as const;

const commitments = [
  { icon: CheckCircle2, text: "Direct founder leadership", color: "#ea452b" },
  { icon: Zap, text: "60 FPS motion targets", color: "#3b82f6" },
  { icon: Globe, text: "IST + global overlap", color: "#10b981" },
  { icon: Sparkles, text: "100% bespoke builds", color: "#8b5cf6" },
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
        <div className="proof-top-grid">
          <div className="proof-heading-col">
            <div className="section-eyebrow">
              <span className="status-dot" />
              <span>07 / 09 &middot; OUTCOMES &amp; PROOF</span>
            </div>
            <h2 id="proof-heading" className="proof-heading">
              Proof in the <em>build.</em>
            </h2>
            <p className="proof-sub">
              Selected results from flagship partnerships &mdash; measured in shipped products, structured catalogues, and launches that hold up in the real world.
            </p>
          </div>

          <div className="proof-partner-card">
            <div className="proof-partner-top">
              <span className="proof-partner-label">PARTNERSHIP 01</span>
              <span className="proof-verified-pill">&#9679; VERIFIED CLIENT</span>
            </div>
            <div className="proof-author">
              <span
                className="proof-avatar"
                style={{ background: "rgba(197, 155, 76, 0.15)", color: "#9c7324", border: "1px solid rgba(197, 155, 76, 0.3)" }}
              >
                VS
              </span>
              <div>
                <strong>Vidhushi Sharma</strong>
                <span>Founder &middot; Scent Vault</span>
              </div>
            </div>
            <p className="proof-partner-note">
              Founder-led collaboration from first sketch to live launch, with direct access to the people doing the work.
            </p>
            <div className="proof-partner-tags">
              <span>Luxury archive</span>
              <span>447 products</span>
              <span>68 houses</span>
            </div>
          </div>
        </div>

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

        <div className="proof-commitments">
          {commitments.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="commitment-chip" style={{ ["--commit" as string]: item.color }}>
                <Icon size={15} aria-hidden="true" style={{ color: item.color }} />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
