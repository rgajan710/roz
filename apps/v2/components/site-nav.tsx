"use client";

import { Wordmark } from "@roz/brand/wordmark";
import { ArrowUpRight, Menu, X, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { soundFX } from "@/lib/audio";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleAudioToggle = () => {
    const active = soundFX.toggleMute();
    setIsAudioActive(active);
  };

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-container">
        <a
          className="nav-logo"
          href="#top"
          aria-label="Roz studio home"
          onMouseEnter={() => soundFX.playHover()}
          onClick={() => soundFX.playClick()}
        >
          <Wordmark name="roz" />
        </a>

        <div className="nav-descriptor">
          <span className="nav-mono-tag">LAB // STUDIO</span>
          <span className="nav-city">12.9716&deg; N &middot; 77.5946&deg; E</span>
        </div>

        <nav className={`nav-links${open ? " is-open" : ""}`} aria-label="Main navigation">
          <a
            href="#work"
            onClick={() => { setOpen(false); soundFX.playClick(); }}
            onMouseEnter={() => soundFX.playHover()}
          >
            Selected Work
          </a>
          <a
            href="#studio"
            onClick={() => { setOpen(false); soundFX.playClick(); }}
            onMouseEnter={() => soundFX.playHover()}
          >
            Capabilities
          </a>

          {/* Sound Experience Toggle Button */}
          <button
            type="button"
            className={`nav-sound-btn${isAudioActive ? " is-active" : ""}`}
            onClick={handleAudioToggle}
            aria-label={isAudioActive ? "Mute interactive audio" : "Enable interactive sound design"}
            title={isAudioActive ? "Sound ON (Click to mute)" : "Sound OFF (Click for audio atmosphere)"}
          >
            {isAudioActive ? (
              <span className="equalizer-bars" aria-hidden="true">
                <span className="eq-bar eq-bar-1" />
                <span className="eq-bar eq-bar-2" />
                <span className="eq-bar eq-bar-3" />
                <span className="eq-bar eq-bar-4" />
              </span>
            ) : (
              <VolumeX size={14} />
            )}
            <span>{isAudioActive ? "SOUND ACTIVE" : "SOUND DESIGN"}</span>
          </button>

          <a
            href="#contact"
            className="nav-cta-btn"
            onClick={() => { setOpen(false); soundFX.playClick(); }}
            onMouseEnter={() => soundFX.playHover()}
          >
            Start Project <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>

        <button
          className="menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => { setOpen(!open); soundFX.playClick(); }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
