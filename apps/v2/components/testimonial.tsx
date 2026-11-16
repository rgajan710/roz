"use client";

import { useEffect, useRef } from "react";

const QUOTE_TEXT = "Work done was quick and easy, process was very effective, very professional group of people working together to provide me a great experience for my business";

export function Testimonial() {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const words = QUOTE_TEXT.split(" ");

  useEffect(() => {
    const el = quoteRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el?.querySelectorAll<HTMLElement>(".word-inner").forEach((w) => {
        w.style.transform = "none";
      });
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("word-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonial-section section-pad" aria-labelledby="testimonial-heading">
      <div className="quote-top">
        <p className="section-kicker"><span className="status-dot" /> KIND WORDS / 01</p>
        <span>THE BEST PART IS THE PEOPLE</span>
      </div>
      <h2 id="testimonial-heading" className="sr-only">A word from a client</h2>
      <div className="quote-mark" aria-hidden="true">“</div>
      <blockquote ref={quoteRef}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="word-mask">
            <span
              className="word-inner"
              style={{ "--i": i } as React.CSSProperties}
            >
              {word}{i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </blockquote>
      <div className="quote-credit">
        <span className="quote-avatar">VS</span>
        <div>
          <strong>Vidhushi Sharma</strong>
          <span>Scent Vault</span>
        </div>
      </div>
    </section>
  );
}
