"use client";

import { Wordmark } from "@roz/brand/wordmark";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { soundFX } from "@/lib/audio";

export function SiteFooter() {
  const [bengaluruTime, setBengaluruTime] = useState("");

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
          href="#top"
          className="footer-back-top"
          onMouseEnter={() => soundFX.playHover()}
          onClick={() => soundFX.playClick()}
        >
          BACK TO TOP &uarr;
        </a>
      </div>

      <div className="footer-big-wordmark-wrap">
        <a
          href="#top"
          className="footer-wordmark"
          aria-label="Roz studio, back to top"
          onMouseEnter={() => soundFX.playHover()}
          onClick={() => soundFX.playClick()}
        >
          <Wordmark name="roz" />
        </a>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} ROZ LAB &middot; BESPOKE DIGITAL ARCHITECTURE</span>
        <span className="footer-loc">12.9716&deg; N, 77.5946&deg; E &mdash; BENGALURU &middot; WORLDWIDE</span>
        <a
          href="mailto:roz.enquire@gmail.com"
          className="footer-email-link"
          onMouseEnter={() => soundFX.playHover()}
          onClick={() => soundFX.playClick()}
        >
          roz.enquire@gmail.com <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
