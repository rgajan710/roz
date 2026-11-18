"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { soundFX } from "@/lib/audio";

const faqs = [
  {
    q: "What types of projects does Roz take on?",
    a: "We specialize in bespoke digital flagships: brand sites, e-commerce storefronts, editorial experiences, and interactive 3D web platforms. If your project needs a distinctive point of view and careful craft, we are a good fit.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "Most projects run 8–12 weeks from kickoff to launch, depending on scope. Smaller focused builds can move faster, while complex commerce or 3D-heavy experiences may take longer. We share a clear roadmap before work begins.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We are based in Bengaluru and partner with clients worldwide. Our process is designed for remote collaboration with async updates, scheduled reviews, and clear documentation across time zones.",
  },
  {
    q: "What do you need from us to get started?",
    a: "A short brief on your goals, audience, timeline, and any existing brand assets or references is enough to begin. From there we can shape scope, recommend an approach, and provide a detailed proposal.",
  },
  {
    q: "Can you redesign or improve an existing site?",
    a: "Absolutely. We audit what is working, identify friction in design or performance, and rebuild with intention—whether that means a visual refresh, a new architecture, or a full replatform.",
  },
  {
    q: "What happens after launch?",
    a: "We offer post-launch support for fixes, tuning, and iteration. Many clients continue with us for ongoing improvements, new pages, or performance and conversion optimization as their business grows.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="faq-container">
        <div className="faq-header">
          <div className="section-eyebrow">
            <span className="status-dot" />
            <span>08 / 09 &middot; QUESTIONS &amp; ANSWERS</span>
          </div>
          <div className="faq-header-split">
            <h2 id="faq-heading" className="section-title">
              Frequently <em>Asked.</em>
            </h2>
            <p className="section-subtitle">
              Practical details about working with the studio, timelines, and what to expect from a partnership with Roz.
            </p>
          </div>
        </div>

        <div className="faq-content-grid">
          <div className="faq-list" role="list">
            {faqs.map((item, i) => {
              const open = openIndex === i;
              const panelId = `faq-panel-${i}`;
              const btnId = `faq-btn-${i}`;
              return (
                <div key={item.q} className={`faq-item${open ? " is-open" : ""}`} role="listitem">
                  <button
                    id={btnId}
                    type="button"
                    className="faq-question"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => {
                      setOpenIndex(open ? null : i);
                      soundFX.playClick();
                    }}
                    onMouseEnter={() => soundFX.playHover()}
                  >
                    <span>{item.q}</span>
                    <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="faq-answer-wrap"
                    hidden={!open}
                  >
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="faq-visual-panel" aria-label="Visual highlights">
            <div className="faq-visual-card accent-coral">
              <Image src="/work/sunroom-flagship.webp" alt="sunroom project visual" width={520} height={360} className="faq-visual-img" />
              <div className="faq-visual-meta"><strong>Warm, sensory interfaces</strong><span>Beauty & lifestyle experiences</span></div>
            </div>
            <div className="faq-visual-card accent-blue">
              <Image src="/globe.svg" alt="Global collaboration illustration" width={520} height={320} className="faq-visual-img contain" />
              <div className="faq-visual-meta"><strong>Based in Bengaluru</strong><span>Collaborating with clients worldwide</span></div>
            </div>
            <div className="faq-visual-mini-grid">
              <div className="faq-mini-tile" style={{ background: "linear-gradient(135deg,#c59b4c22,#c59b4c55)" }}><span>Scent Vault</span></div>
              <div className="faq-mini-tile" style={{ background: "linear-gradient(135deg,#22c55e22,#22c55e55)" }}><span>OUTLAND</span></div>
              <div className="faq-mini-tile" style={{ background: "linear-gradient(135deg,#3b82f622,#3b82f655)" }}><span>3D / Motion</span></div>
              <div className="faq-mini-tile" style={{ background: "linear-gradient(135deg,#ea452b22,#ea452b55)" }}><span>Commerce</span></div>
            </div>

            <a href="#contact" className="faq-cta-card" onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>
              <span className="faq-cta-eyebrow">STILL CURIOUS</span>
              <strong>Have a project in mind?</strong>
              <span className="faq-cta-link">Start a conversation <ArrowUpRight size={14} aria-hidden="true" /></span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
