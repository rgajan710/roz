"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { soundFX } from "@/lib/audio";

const capabilities = [
  {
    num: "01",
    title: "Brand Strategy & Visual Architecture",
    badge: "STRATEGY & IDENTITY",
    color: "#3b82f6",
    badgeBg: "rgba(59, 130, 246, 0.1)",
    summary: "Clear market positioning, creative direction, and visual identity systems that give your company a distinct, unforgettable presence.",
    tags: ["Positioning", "Visual Identity", "Typography Systems", "Art Direction"],
    previewImg: "/work/forme-flagship.webp",
  },
  {
    num: "02",
    title: "Digital Product & Experience Design",
    badge: "PRODUCT & UI/UX",
    color: "#8b5cf6",
    badgeBg: "rgba(139, 92, 246, 0.1)",
    summary: "Intuitive, high-converting digital interfaces engineered to captivate audiences and inspire confidence across every touchpoint.",
    tags: ["UI / UX Architecture", "Design Systems", "Interactive Prototyping", "Mobile First"],
    previewImg: "/work/sunroom-flagship.webp",
  },
  {
    num: "03",
    title: "Creative Engineering & 3D WebGL",
    badge: "3D & CREATIVE CODE",
    color: "#ea452b",
    badgeBg: "rgba(234, 69, 43, 0.1)",
    summary: "Modern web applications powered by Next.js, Three.js, and custom GLSL shaders — delivering 60 FPS motion without compromising accessibility.",
    tags: ["Next.js & React", "Three.js & WebGL", "GSAP & Motion", "Performance Auditing"],
    previewImg: "/work/outland-flagship.webp",
  },
  {
    num: "04",
    title: "E-Commerce Flagships & Scaled Platforms",
    badge: "COMMERCE ARCHITECTURE",
    color: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.1)",
    summary: "Bespoke digital flagships and headless storefronts built for enduring reliability, frictionless checkout, and international scale.",
    tags: ["Headless Commerce", "Shopify Plus", "Catalog Optimization", "Speed Optimization"],
    previewImg: "/work/scent-vault-flagship.webp",
  },
] as const;

export function Services() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="studio" className="services-section" aria-labelledby="services-heading">
      <div className="services-header">
        <div className="section-eyebrow">
          <span className="status-dot" />
          <span>05 / 09 &middot; DISCIPLINES &amp; CAPABILITIES</span>
        </div>
        <div className="services-header-split">
          <h2 id="services-heading" className="section-title">
            Disciplines &amp;<br />
            <em>Capabilities.</em>
          </h2>
          <p className="section-subtitle">
            We operate at the convergence of strategic brand narrative, architectural interface design, and cutting-edge creative engineering.
          </p>
        </div>
      </div>

      <div className="capabilities-table">
        {capabilities.map((cap, i) => {
          const isActive = active === i;
          return (
            <div
              key={cap.num}
              className={`capability-row${isActive ? " is-active" : ""}`}
              style={{
                borderLeft: isActive ? `3px solid ${cap.color}` : "3px solid transparent",
              }}
              onMouseEnter={() => {
                setActive(i);
                soundFX.playHover();
              }}
              onClick={() => soundFX.playClick()}
            >
              <div className="cap-num" style={{ color: isActive ? cap.color : undefined }}>
                {cap.num}
              </div>

              <div className="cap-main">
                <div className="cap-badge-row">
                  <span
                    className="cap-pill"
                    style={{
                      background: cap.badgeBg,
                      color: cap.color,
                      borderColor: `${cap.color}40`,
                    }}
                  >
                    {cap.badge}
                  </span>
                </div>

                <h3 className="cap-title">
                  {cap.title}
                </h3>
                <p className="cap-summary">{cap.summary}</p>
                <div className="cap-tags">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="cap-tag"
                      style={isActive ? { borderColor: `${cap.color}50`, color: "var(--text-primary)" } : undefined}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="cap-preview-col">
                <div className="cap-thumb-wrap">
                  <Image
                    src={cap.previewImg}
                    alt={cap.title}
                    width={400}
                    height={250}
                    className="cap-thumb-img"
                  />
                </div>
                <ArrowUpRight
                  size={24}
                  className="cap-arrow"
                  style={{ color: isActive ? cap.color : undefined }}
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
