"use client";

import Link from "next/link";
import { Wordmark } from "@roz/brand/wordmark";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { soundFX } from "@/lib/audio";

export function SiteFooter() {
  const [bengaluruTime, setBengaluruTime] = useState("");
  const pathname = usePathname();
  const sectionHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setBengaluruTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <div className="footer-status-pill">
          <span className="status-dot" />
          <span>STUDIO ONLINE // ACCEPTING Q2/Q3 2026 ENGAGEMENTS</span>
        </div>

        <div className="footer-clock-badge">
          <span>BENGALURU, IN:</span>
          <strong>{bengaluruTime || "21:20:00"} IST</strong>
        </div>

        <a
          href={sectionHref("#top")}
          className="footer-back-top"
          onMouseEnter={() => soundFX.playHover()}
          onClick={() => soundFX.playClick()}
        >
          BACK TO TOP &uarr;
        </a>
      </div>

      <div className="footer-main-grid">
        <div className="footer-brand-col">
          <a
            href={sectionHref("#top")}
            className="footer-wordmark"
            aria-label="Roz studio, back to top"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
          >
            <Wordmark name="roz" />
          </a>
          <p className="footer-tagline">
            An independent digital studio crafting thoughtful websites, brand experiences, and commerce platforms for ambitious businesses worldwide.
          </p>
          <a
            href="mailto:roz.enquire@gmail.com"
            className="footer-email-link"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
          >
            roz.enquire@gmail.com <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="footer-links-col">
          <h3 className="footer-col-title">Navigate</h3>
          <ul className="footer-link-list">
            <li><a href={sectionHref("#about")} onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>Studio</a></li>
            <li><a href={sectionHref("#work")} onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>Selected Work</a></li>
            <li><a href={sectionHref("#studio")} onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>Capabilities</a></li>
            <li><a href={sectionHref("#process")} onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>Process</a></li>
            <li><a href={sectionHref("#faq")} onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>FAQ</a></li>
            <li><a href={sectionHref("#contact")} onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>Start a Project</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h3 className="footer-col-title">Studio</h3>
          <ul className="footer-link-list">
            <li><span className="footer-muted">Bengaluru, India</span></li>
            <li><span className="footer-muted">Working worldwide</span></li>
            <li><span className="footer-muted">Strategy · Design · Code</span></li>
            <li><span className="footer-muted">Accepting Q2/Q3 2026</span></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h3 className="footer-col-title">Legal</h3>
          <ul className="footer-link-list">
            <li><Link href="/privacy" onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>Privacy Policy</Link></li>
            <li><Link href="/terms" onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>Terms of Use</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-cta-strip">
        <div className="footer-cta-copy">
          <span className="footer-cta-eyebrow">
            <span className="footer-india-badge" aria-hidden="true">
              <span className="india-dot saffron" />
              <span className="india-dot white" />
              <span className="india-dot green" />
            </span>
            MADE IN INDIA &middot; WORKING WORLDWIDE
          </span>
          <h2 className="footer-cta-title">
            Ready to build something <em>with pop?</em>
          </h2>
        </div>
        <div className="footer-cta-actions">
          <a href={sectionHref("#contact")} className="footer-cta-btn" onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>
            Start a project <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="mailto:roz.enquire@gmail.com" className="footer-cta-ghost" onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>
            Email the studio
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} ROZ LAB &middot; BESPOKE DIGITAL ARCHITECTURE</span>
        <span className="footer-loc">12.9716&deg; N, 77.5946&deg; E &mdash; BENGALURU &middot; WORLDWIDE</span>
      </div>
    </footer>
  );
}
