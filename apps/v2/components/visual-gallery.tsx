"use client";

import Image from "next/image";

const galleryItems = [
  { src: "/work/scent-vault-flagship.webp", alt: "Scent Vault flagship interface", label: "Luxury Archive", color: "#c59b4c" },
  { src: "/work/outland-flagship.webp", alt: "OUTLAND expedition commerce", label: "Field Commerce", color: "#22c55e" },
  { src: "/work/sunroom-flagship.webp", alt: "sunroom beauty storefront", label: "Sensory Beauty", color: "#f59e0b" },
  { src: "/work/forme-flagship.webp", alt: "FORME handcrafted objects", label: "Sculptural Living", color: "#c25e3e" },
  { src: "/sequence/012.webp", alt: "3D motion frame", label: "Motion Study", color: "#3b82f6" },
  { src: "/sequence/024.webp", alt: "3D motion frame", label: "Spatial Depth", color: "#8b5cf6" },
];

export function VisualGallery() {
  return (
    <section className="visual-gallery-section" aria-label="Visual highlights">
      <div className="visual-gallery-header">
        <p className="section-eyebrow" style={{ justifyContent: "center" }}>
          <span className="status-dot" />
          <span>VISUAL SNAPSHOTS &middot; COLOR &amp; CRAFT</span>
        </p>
        <h2 className="visual-gallery-title">
          A more <em>visual</em> look at the work<span className="coral">.</span>
        </h2>
        <p className="visual-gallery-subtitle">
          Interfaces, textures, and motion frames from recent builds — designed to feel vivid, tactile, and memorable.
        </p>
      </div>

      <div className="visual-gallery-marquee" aria-hidden="true">
        <div className="visual-gallery-track">
          {[...galleryItems, ...galleryItems].map((item, idx) => (
            <figure key={`${item.src}-${idx}`} className="visual-gallery-card" style={{ ["--card-accent" as string]: item.color }}>
              <div className="visual-gallery-img-wrap">
                <Image src={item.src} alt={item.alt} width={640} height={420} className="visual-gallery-img" />
              </div>
              <figcaption className="visual-gallery-caption">
                <span className="visual-gallery-dot" style={{ background: item.color }} />
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
