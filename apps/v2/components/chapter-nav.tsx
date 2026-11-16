"use client";

import { useEffect, useState } from "react";
import { soundFX } from "@/lib/audio";

const chapters = [
  { id: "top", num: "01", label: "ARCHIVE" },
  { id: "manifesto", num: "02", label: "DOCTRINE" },
  { id: "work", num: "03", label: "ARTIFACTS" },
  { id: "studio", num: "04", label: "DISCIPLINES" },
  { id: "process", num: "05", label: "METHODOLOGY" },
  { id: "contact", num: "06", label: "INQUIRY" },
];

export function ChapterNav() {
  const [activeId, setActiveId] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    soundFX.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="chapter-nav-rail" aria-label="Chapter Navigator">
      <div className="chapter-nav-track">
        {chapters.map((ch) => {
          const isActive = activeId === ch.id;
          return (
            <button
              key={ch.id}
              className={`chapter-nav-node${isActive ? " is-active" : ""}`}
              onClick={() => scrollTo(ch.id)}
              onMouseEnter={() => soundFX.playHover()}
              title={`Jump to Chapter ${ch.num}: ${ch.label}`}
              aria-label={`Jump to Chapter ${ch.num}: ${ch.label}`}
            >
              <span className="chapter-nav-line" />
              <span className="chapter-nav-meta">
                <span className="chapter-nav-num">{ch.num}</span>
                <span className="chapter-nav-name">{ch.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
