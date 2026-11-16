"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface WordRevealProps {
  children: string | ReactNode;
  className?: string;
  /** Additional delay before the first word starts (ms) */
  delay?: number;
  /** Stagger between consecutive words (ms) */
  staggerMs?: number;
}

export function WordReveal({
  children,
  className,
  delay = 0,
  staggerMs = 65,
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference — just show text
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("word-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("word-revealed");
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  // If children is not a plain string, render as-is inside a wrapper
  if (typeof children !== "string") {
    return (
      <span ref={ref} className={className}>
        {children}
      </span>
    );
  }

  const words = children.split(" ");

  return (
    <span ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="word-mask" aria-hidden="true">
          <span
            className="word-inner"
            style={
              {
                "--i": i,
                transitionDelay: `calc(${i} * ${staggerMs}ms + ${delay}ms)`,
              } as React.CSSProperties & Record<string, string | number>
            }
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </span>
  );
}
