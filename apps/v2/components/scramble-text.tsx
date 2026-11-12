"use client";

import { useEffect, useRef, useState } from "react";
import { motionConfig } from "@/lib/motion";

export function ScrambleText({ text }: { text: string }) {
  const [visible, setVisible] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);
  function scramble() {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    if (timer.current) clearInterval(timer.current);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let tick = 0;
    const steps = Math.ceil(motionConfig.scrambleDuration / 50);
    timer.current = setInterval(() => {
      tick++;
      setVisible(text.split("").map((character, index) => {
        if (character === " " || index < text.length * tick / steps) return character;
        return characters[(tick * 7 + index * 11) % characters.length];
      }).join(""));
      if (tick >= steps && timer.current) { clearInterval(timer.current); timer.current = null; setVisible(text); }
    }, 50);
  }
  return <span onPointerEnter={scramble}><span className="sr-only">{text}</span><span aria-hidden="true">{visible}</span></span>;
}
