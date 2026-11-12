"use client";

import { useEffect, useRef } from "react";
import { motionConfig } from "@/lib/motion";

const results = [
  { number: 4, label: "selected client projects", note: "A few collaborations we're proud to share." },
  { number: 447, label: "fragrances", note: "Brought together in the Scent Vault catalogue." },
  { number: 68, label: "perfume houses", note: "Made easier to explore on Scent Vault." },
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
      const start = performance.now();
      const counters = node.querySelectorAll<HTMLElement>("[data-count]");
      const tick = (now: number) => {
        const progress = Math.min((now - start) / motionConfig.counterDuration, 1);
        const eased = 1 - (1 - progress) ** 3;
        counters.forEach((counter) => { counter.textContent = String(Math.round(Number(counter.dataset.count) * eased)).padStart(Number(counter.dataset.count) < 10 ? 2 : 1, "0"); });
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return <section ref={section} className="results-section section-pad" aria-labelledby="results-heading">
    <div className="results-title"><p className="section-kicker"><span className="status-dot" /> A LITTLE PROOF</p><h2 id="results-heading">The details<br /><em>add up.</em></h2><p>Real work. Real details.<br />Nothing pulled out of thin air.</p></div>
    <div className="results-grid">{results.map((result) => <article key={result.label}><strong data-count={result.number}>{String(result.number).padStart(result.number < 10 ? 2 : 1, "0")}</strong><h3>{result.label}</h3><p>{result.note}</p></article>)}</div>
  </section>;
}
