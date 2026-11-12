"use client";

import { Wordmark } from "@roz/brand/wordmark";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
    <a className="nav-logo" href="#top" aria-label="Roz home"><Wordmark name="roz" /></a>
    <span className="nav-note">INDEPENDENT DIGITAL STUDIO<br />BENGALURU / EVERYWHERE</span>
    <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
      <a href="#work" onClick={() => setOpen(false)}>Work</a>
      <a href="#studio" onClick={() => setOpen(false)}>Studio</a>
      <a href="#contact" onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" /></a>
    </nav>
    <button className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </header>;
}
