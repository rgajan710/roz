"use client";

import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motionConfig } from "@/lib/motion";
import { supportsRichMotion } from "@/lib/device";
import { ScrambleText } from "@/components/scramble-text";

const HeroScene = dynamic(() => import("@/components/hero-scene"), { ssr: false });

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const [showScene, setShowScene] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(node);
    if (supportsRichMotion()) {
      const timer = window.setTimeout(() => setShowScene(true), motionConfig.sceneDelay);
      return () => { window.clearTimeout(timer); observer.disconnect(); };
    }
    return () => observer.disconnect();
  }, []);

  return <section id="top" ref={section} className="hero">
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-orb" />
      {showScene && visible && <HeroScene />}
      <div className="hero-visual-label"><span>FORM / FUNCTION / FEELING</span><span>01 — 04</span></div>
    </div>
    <div className="hero-content">
      <motion.div className="hero-reveal" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionConfig.revealDuration, ease: motionConfig.ease }}>
        <p className="eyebrow"><span className="status-dot" /> A LITTLE STUDIO FOR BIG IDEAS <span>✳</span> EST. FOR WHAT&apos;S NEXT</p>
        <h1>For ideas<br /><em>with</em><br /><ScrambleText text="a pulse" /><span className="coral">.</span></h1>
        <div className="hero-bottom">
          <p>Digital experiences with a little more feeling — and a lot more purpose.</p>
          <Button asChild><a href="#work">Explore our work <ArrowUpRight size={18} aria-hidden="true" /></a></Button>
        </div>
      </motion.div>
    </div>
    <div className="hero-index"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={18} aria-hidden="true" /><span>© ROZ STUDIO</span></div>
  </section>;
}
