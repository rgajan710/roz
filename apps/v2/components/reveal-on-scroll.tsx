"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal transition starts (ms) */
  delay?: number;
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  threshold = 0.15,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion — reveal immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties & Record<string, string>}
    >
      {children}
    </div>
  );
}
