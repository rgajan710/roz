"use client";

import { useState } from "react";
import { soundFX } from "@/lib/audio";
import { CheckCircle2, Cpu, Layers, Sparkles, Zap } from "lucide-react";

const PHASES = [
  {
    num: "01",
    name: "Archaeology & Market Moat",
    subtitle: "Discovery, Olfactory Architecture & Typographic Codex",
    color: "#3b82f6",
    badge: "PHASE 01 // FOUNDATION",
    icon: Sparkles,
    duration: "WEEKS 01–02",
    deliverables: [
      "Competitive White-Space & Moat Audit",
      "Typographic & Color System Calibration",
      "Information Architecture & User Journeys",
      "Brand Codex & Creative Direction",
    ],
    metric: "100% Bespoke Identity",
  },
  {
    num: "02",
    name: "Spatial UI & Design Systems",
    subtitle: "High-Density Layouts & Tactile Micro-Interactions",
    color: "#8b5cf6",
    badge: "PHASE 02 // SYSTEMS",
    icon: Layers,
    duration: "WEEKS 03–05",
    deliverables: [
      "Atomic Token Architecture in CSS/Tailwind",
      "Interactive High-Fidelity Prototypes",
      "Mobile-First Responsive Choreography",
      "Micro-copy & Sensorial Touchpoints",
    ],
    metric: "Zero Generic Templates",
  },
  {
    num: "03",
    name: "Creative Code & 3D Shaders",
    subtitle: "Next.js 16, Three.js WebGL & Lenis 60 FPS Sync",
    color: "#ea452b",
    badge: "PHASE 03 // ENGINEERING",
    icon: Cpu,
    duration: "WEEKS 06–09",
    deliverables: [
      "Turbopack App Router Engineering",
      "Custom GLSL Vertex & Fragment Shaders",
      "Lenis Smooth Scroll & GSAP ScrollTrigger",
      "Spatial Web Audio Design & Sound FX",
    ],
    metric: "Native 60 FPS Fidelity",
  },
  {
    num: "04",
    name: "Edge Hardening & Commerce Scale",
    subtitle: "Global CDN Delivery, Headless Checkout & Sub-50ms APIs",
    color: "#10b981",
    badge: "PHASE 04 // DEPLOYMENT",
    icon: Zap,
    duration: "WEEKS 10–12",
    deliverables: [
      "Shopify Plus / Headless Commerce Bridge",
      "Global Edge Caching & Asset Compression",
      "Zero Layout Shift (CLS 0.00) Optimization",
      "Post-Launch Analytics & Growth Tuning",
    ],
    metric: "Sub-50ms Global Latency",
  },
] as const;

export function Process() {
  const [activePhase, setActivePhase] = useState<number>(0);

  return (
    <section id="process" className="process-section" aria-labelledby="process-heading">
      <div className="process-container">
        <div className="process-header">
          <div className="section-eyebrow">
            <span className="status-dot" />
            <span>05 / 07 &middot; EXECUTION BLUEPRINT</span>
          </div>
          <div className="process-header-split">
            <h2 id="process-heading" className="section-title">
              Disciplined<br />
              <em>Methodology.</em>
            </h2>
            <p className="section-subtitle">
              How we take ambitious concepts from zero to enduring digital flagships &mdash; engineered for high conversion, tactile emotion, and architectural longevity.
            </p>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="process-tabs-row" role="tablist">
          {PHASES.map((phase, idx) => {
            const isActive = activePhase === idx;
            return (
              <button
                key={phase.num}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`process-tab-btn${isActive ? " is-active" : ""}`}
                style={{
                  borderBottomColor: isActive ? phase.color : undefined,
                }}
                onClick={() => {
                  setActivePhase(idx);
                  soundFX.playClick();
                }}
                onMouseEnter={() => soundFX.playHover()}
              >
                <span className="tab-phase-num" style={{ color: isActive ? phase.color : undefined }}>
                  {phase.num}
                </span>
                <span className="tab-phase-name">{phase.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        {(() => {
          const current = PHASES[activePhase];
          const Icon = current.icon;
          return (
            <div
              className="process-detail-card"
              style={{
                borderLeft: `5px solid ${current.color}`,
              }}
            >
              <div className="process-card-header">
                <div className="process-phase-badge" style={{ color: current.color, borderColor: `${current.color}40`, background: `${current.color}10` }}>
                  <Icon size={12} aria-hidden="true" />
                  {current.badge} &middot; {current.duration}
                </div>
                <span className="process-metric-pill" style={{ color: current.color }}>
                  ✦ {current.metric}
                </span>
              </div>

              <div className="process-card-body">
                <div>
                  <h3 className="process-card-title">{current.name}</h3>
                  <p className="process-card-subtitle" style={{ color: current.color }}>
                    {current.subtitle}
                  </p>
                </div>

                <div className="deliverables-grid">
                  <span className="deliverables-heading">CORE DELIVERABLES &amp; CODE ARTIFACTS:</span>
                  <div className="deliverables-list">
                    {current.deliverables.map((item) => (
                      <div key={item} className="deliverable-item">
                        <CheckCircle2 size={16} className="deliverable-icon" style={{ color: current.color }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
