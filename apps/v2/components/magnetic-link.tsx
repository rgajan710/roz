"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";

export function MagneticLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const link = useRef<HTMLAnchorElement>(null);
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches || !link.current) return;
    const rect = link.current.getBoundingClientRect();
    link.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.1}px, ${(event.clientY - rect.top - rect.height / 2) * 0.1}px)`;
  }
  return <a ref={link} href={href} className={`button button-dark magnetic-link ${className}`} onMouseMove={move} onMouseLeave={() => { if (link.current) link.current.style.transform = ""; }}>{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}
