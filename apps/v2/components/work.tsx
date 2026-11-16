"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useRef, useEffect, type MouseEvent } from "react";
import { supportsRichMotion } from "@/lib/device";
import { soundFX } from "@/lib/audio";

const projects = [
  {
    id: "01",
    name: "Scent Vault",
    subtitle: "The Haute Parfumerie Codex",
    category: "LUXURY ARCHIVE & PRIVATE COMMERCE",
    year: "2025",
    color: "#c59b4c",
    badgeBg: "rgba(197, 155, 76, 0.12)",
    badgeColor: "#9c7324",
    badgeBorder: "rgba(197, 155, 76, 0.3)",
    pill: "447+ FRAGRANCES · 68 HOUSES",
    description: "An extensive digital catalogue of luxury fragrance houses with olfactory mapping, real-time concentration search, and direct allocation commerce.",
    techStack: ["Next.js 16 App Router", "Olfactory Codex Engine", "Direct Allocation", "Turbopack 60 FPS"],
    image: "/work/scent-vault-flagship.webp",
    url: "https://perfvaultspidey.netlify.app/",
  },
  {
    id: "02",
    name: "OUTLAND",
    subtitle: "Out There Is Yours",
    category: "EXPEDITION & TECHNICAL APPAREL",
    year: "2025",
    color: "#22c55e",
    badgeBg: "rgba(34, 197, 94, 0.12)",
    badgeColor: "#15803d",
    badgeBorder: "rgba(34, 197, 94, 0.3)",
    pill: "FIELD TESTED · GLOBAL COMMERCE",
    description: "A field-ready digital home for technical outdoor equipment, rugged survival goods, and modern expedition apparel engineered for harsh terrain.",
    techStack: ["Alpine Commerce Engine", "Topographical Grid", "Sub-50ms Search", "Field Tested UI"],
    image: "/work/outland-flagship.webp",
    url: "https://celebrated-stroopwafel-1b72e2.netlify.app/",
  },
  {
    id: "03",
    name: "sunroom",
    subtitle: "Skincare for Real Life",
    category: "BEAUTY & BOTANICAL RITUALS",
    year: "2024",
    color: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.12)",
    badgeColor: "#b45309",
    badgeBorder: "rgba(245, 158, 11, 0.3)",
    pill: "CLEAN BEAUTY · SENSORY STOREFRONT",
    description: "An airy, sun-drenched digital storefront transforming everyday skincare into an elevated daily ritual of light, organic ingredients, and warmth.",
    techStack: ["Sensory Skincare Ritual", "Clean Botanical Micro-copy", "Tactile Interface", "High-Converting Storefront"],
    image: "/work/sunroom-flagship.webp",
    url: "https://mellow-pudding-b10b58.netlify.app/",
  },
  {
    id: "04",
    name: "FORME",
    subtitle: "Objects with Intention",
    category: "LIFESTYLE & HANDCRAFTED OBJECTS",
    year: "2024",
    color: "#c25e3e",
    badgeBg: "rgba(194, 94, 62, 0.12)",
    badgeColor: "#9a3412",
    badgeBorder: "rgba(194, 94, 62, 0.3)",
    pill: "BESPOKE LIVING · ENDURING OBJECTS",
    description: "A sculptural, tranquil e-commerce sanctuary for handcrafted homeware, bespoke ceramic furniture, and timeless interior objects designed to endure generations.",
    techStack: ["Architectural Living Layout", "Handcrafted Homeware Codex", "Spatial Ceramics", "Bespoke Curation"],
    image: "/work/forme-flagship.webp",
    url: "https://illustrious-beijinho-c72671.netlify.app/",
  },
] as const;

function StickyProjectCard({
  project,
  index,
  total,
}: {
  project: typeof projects[number];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (!cardRef.current || !supportsRichMotion()) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty("--tilt-x", `${-y * 3.5}deg`);
    cardRef.current.style.setProperty("--tilt-y", `${x * 3.5}deg`);
  }

  function handleMouseEnter() {
    soundFX.playHover();
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.setProperty("--tilt-x", "0deg");
      cardRef.current.style.setProperty("--tilt-y", "0deg");
    }
  }

  return (
    <div
      className="sticky-card-wrapper"
      data-stack-card
      style={{
        top: `calc(90px + ${index * 18}px)`,
        zIndex: index + 10,
        marginBottom: index === total - 1 ? "0" : "55vh",
      }}
    >
      <a
        ref={cardRef}
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="sticky-project-card"
        style={{
          "--brand-color": project.color,
          borderLeft: `5px solid ${project.color}`,
        } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => soundFX.playClick()}
      >
        <div className="project-media-wrap">
          <Image
            src={project.image}
            width={1600}
            height={1000}
            alt={`${project.name} - ${project.subtitle}`}
            className="project-img"
            sizes="(max-width: 899px) 100vw, 62vw"
            priority={index === 0}
          />
          <div
            className="project-media-glow"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${project.color}25 0%, transparent 70%)`,
            }}
          />

          <div className="project-badge-row">
            <span
              className="project-badge-pill"
              style={{
                color: project.color,
                borderColor: `${project.color}35`,
              }}
            >
              <Sparkles size={11} aria-hidden="true" style={{ color: project.color }} />
              {project.pill}
            </span>
            <span className="project-badge">
              VISIT LIVE STORE <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="project-info">
          <div className="project-header">
            <span
              className="project-category-tag"
              style={{ color: project.color }}
            >
              {project.id} &mdash; {project.category}
            </span>
            <span className="project-year">{project.year}</span>
          </div>

          <div>
            <h3 className="project-title">
              {project.name}
              <ArrowUpRight
                className="project-arrow"
                size={32}
                aria-hidden="true"
                style={{ color: project.color }}
              />
            </h3>
            <span
              className="project-subtitle-text"
              style={{ color: project.color }}
            >
              {project.subtitle}
            </span>
          </div>

          <p className="project-desc">{project.description}</p>

          {/* Architectural Specs & Engineering Highlights */}
          <div className="project-specs-grid">
            {project.techStack.map((spec) => (
              <span key={spec} className="project-spec-chip">
                <span className="spec-dot" style={{ background: project.color }} />
                {spec}
              </span>
            ))}
          </div>

          <div className="project-action-row">
            <span
              className="project-action-link"
              style={{ color: project.color }}
            >
              Launch Flagship Platform ↗
            </span>
            <div
              className="project-action-line"
              style={{ background: `${project.color}35` }}
            />
            <span className="project-counter">
              {index + 1} / {total}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

export function Work() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !supportsRichMotion()) return;

    let cleanup: (() => void) | undefined;

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll(".sticky-card-wrapper")
      );

      // Smooth depth scaling as subsequent cards arrive
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];
          const innerCard = card.querySelector(".sticky-project-card");
          if (!innerCard) return;

          gsap.to(innerCard, {
            scale: 0.96,
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 85%",
              end: "top 25%",
              scrub: true,
            },
          });
        }
      });

      cleanup = () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (container.contains(st.trigger as Node)) {
            st.kill();
          }
        });
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <section id="work" ref={containerRef} className="work-showcase" aria-labelledby="work-heading">
      <div className="work-intro">
        <div className="section-eyebrow">
          <span className="status-dot" />
          <span>03 / 06 &middot; SELECTED ARTIFACTS</span>
        </div>
        <div className="work-intro-split">
          <h2 id="work-heading" className="section-title">
            Selected <em>Artifacts.</em>
          </h2>
          <p className="section-subtitle">
            Four bespoke digital flagships engineered from scratch &mdash; featuring sensory archives, field expedition commerce, and sculptural living.
          </p>
        </div>

        {/* Interactive Filter & Direct Launch Pills */}
        <div className="work-filter-bar">
          <span className="filter-pill is-active">
            <span className="filter-dot" style={{ background: "#ea452b" }} />
            ALL ARTIFACTS (4)
          </span>
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="filter-pill"
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
            >
              <span className="filter-dot" style={{ background: p.color }} />
              {p.name}
            </a>
          ))}
        </div>
      </div>

      <div className="sticky-stack-container" data-sticky-stack>
        {projects.map((project, index) => (
          <StickyProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
