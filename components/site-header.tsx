"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }

  return <header className="site-header">
    <Link href="/" className="wordmark" aria-label={`${site.name} home`}>{site.name}<span className="wordmark-dot">.</span></Link>
    <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
      <Link href="/#work" onClick={() => setOpen(false)}>Work</Link><Link href="/#services" onClick={() => setOpen(false)}>What we do</Link><Link href="/#about" onClick={() => setOpen(false)}>How we work</Link>
      <Link className="nav-cta" href="/#contact" onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" /></Link>
    </nav>
    <div className="header-actions"><button className="icon-button theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme" title="Toggle color theme">{dark ? <Sun size={19} /> : <Moon size={19} />}</button><button className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} title={open ? "Close menu" : "Open menu"}>{open ? <X size={21} /> : <Menu size={21} />}</button></div>
  </header>;
}