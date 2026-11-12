"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

export function SpotlightCard({ children }: { children: ReactNode }) {
  const card = useRef<HTMLElement>(null);
  function move(event: PointerEvent<HTMLElement>) {
    if (!card.current) return;
    const rect = card.current.getBoundingClientRect();
    card.current.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.current.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }
  return <article ref={card} className="service-card" onPointerMove={move}>{children}</article>;
}
