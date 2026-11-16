"use client";

import Image from "next/image";
import { Palette, Rocket, Shield, Sparkles } from "lucide-react";

const principles = [
  {
    icon: Sparkles,
    title: "Intentional craft",
    text: "Every detail—from typography to motion—is chosen to serve the story and the user, never decoration for its own sake.",
    color: "#ea452b",
    bg: "rgba(234, 69, 43, 0.1)",
  },
  {
    icon: Rocket,
    title: "Performance first",
    text: "Fast, accessible experiences are non-negotiable. We build for real devices, real networks, and real audiences.",
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.1)",
  },
  {
    icon: Palette,
    title: "Distinct identity",
    text: "No templates, no shortcuts. Each project gets a visual and technical language tailored to the brand it represents.",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.1)",
  },
  {
    icon: Shield,
    title: "Reliable partnership",
    text: "Clear communication, honest timelines, and direct collaboration from kickoff to launch and beyond.",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
  },
];

export function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="about-container">
        <div className="about-header">
          <div className="section-eyebrow">
            <span className="status-dot" />
            <span>STUDIO ETHOS &middot; WHY ROZ</span>
          </div>
          <div className="about-header-split">
            <h2 id="about-heading" className="section-title">
              Built on <em>Principle.</em>
            </h2>
            <p className="section-subtitle">
              Roz is an independent digital studio in Bengaluru partnering with ambitious brands worldwide. We combine strategy, design, and engineering to create work that feels considered and performs with confidence.
            </p>
          </div>
        </div>

        <div className="about-visual-row">
          <div className="about-principles-grid">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="about-principle-card" style={{ borderTop: `3px solid ${item.color}` }}>
                  <div className="about-principle-icon" style={{ color: item.color, background: item.bg }}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="about-principle-title">{item.title}</h3>
                  <p className="about-principle-text">{item.text}</p>
                </article>
              );
            })}
          </div>

          <div className="about-image-mosaic" aria-label="Studio visual highlights">
            <figure className="about-mosaic-item large">
              <Image src="/hero-devices.svg" alt="Responsive device showcase illustration" width={720} height={480} className="about-mosaic-img" />
              <figcaption>Responsive by design</figcaption>
            </figure>
            <figure className="about-mosaic-item">
              <Image src="/work/scent-vault-flagship.webp" alt="Scent Vault visual" width={480} height={320} className="about-mosaic-img" />
              <figcaption style={{ color: "#c59b4c" }}>Scent Vault</figcaption>
            </figure>
            <figure className="about-mosaic-item">
              <Image src="/work/outland-flagship.webp" alt="OUTLAND visual" width={480} height={320} className="about-mosaic-img" />
              <figcaption style={{ color: "#22c55e" }}>OUTLAND</figcaption>
            </figure>
            <figure className="about-mosaic-item wide">
              <Image src="/hero-roz.svg" alt="Roz brand illustration" width={720} height={360} className="about-mosaic-img" />
              <figcaption>Brand &amp; interface craft</figcaption>
            </figure>
          </div>
        </div>

        <div className="about-stats-strip" aria-label="Studio highlights">
          <div className="about-stat" style={{ ["--stat-color" as string]: "#ea452b" }}>
            <strong style={{ color: "#ea452b" }}>4</strong>
            <span>Flagship launches</span>
          </div>
          <div className="about-stat" style={{ ["--stat-color" as string]: "#3b82f6" }}>
            <strong style={{ color: "#3b82f6" }}>100%</strong>
            <span>Bespoke builds</span>
          </div>
          <div className="about-stat" style={{ ["--stat-color" as string]: "#10b981" }}>
            <strong style={{ color: "#10b981" }}>Global</strong>
            <span>Client partnerships</span>
          </div>
          <div className="about-stat" style={{ ["--stat-color" as string]: "#c59b4c" }}>
            <strong style={{ color: "#c59b4c" }}>24h</strong>
            <span>Typical response time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
