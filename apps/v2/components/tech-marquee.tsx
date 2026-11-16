"use client";

const STACK_ITEMS = [
  { name: "Next.js 16 App Architecture", color: "#3b82f6" },
  { name: "Three.js & WebGL 3D", color: "#ea452b" },
  { name: "Custom GLSL Shaders", color: "#8b5cf6" },
  { name: "Headless Commerce Engines", color: "#10b981" },
  { name: "GSAP 60 FPS Motion", color: "#f59e0b" },
  { name: "Turbopack Edge Delivery", color: "#c59b4c" },
  { name: "Bespoke Design Systems", color: "#c25e3e" },
  { name: "Zero Disposable Templates", color: "#ea452b" },
];

export function TechMarquee() {
  return (
    <div className="tech-marquee-container" aria-label="Creative Engineering Stack">
      <div className="tech-marquee-track">
        {[...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS].map((item, idx) => (
          <div key={`${item.name}-${idx}`} className="tech-marquee-item">
            <span className="marquee-dot" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}80` }} />
            <span className="marquee-text">{item.name}</span>
            <span className="marquee-sep">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
