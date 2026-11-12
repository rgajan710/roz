"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { supportsRichMotion } from "@/lib/device";
import { motionConfig } from "@/lib/motion";

const WorkDistortion = dynamic(() => import("@/components/work-distortion"), { ssr: false });

const projects = [
  { name: "Scent Vault", category: "RETAIL / DIGITAL CATALOGUE", description: "A whole world of fragrance, beautifully organised.", image: "/work/scent-vault.webp", url: "https://perfvaultspidey.netlify.app/" },
  { name: "OUTLAND", category: "TRAVEL / E-COMMERCE", description: "A field-ready home for the outside and the everyday.", image: "/work/outland.webp", url: "https://celebrated-stroopwafel-1b72e2.netlify.app/" },
  { name: "sunroom", category: "BEAUTY / E-COMMERCE", description: "Making everyday skincare feel like a little sunshine.", image: "/work/sunroom.webp", url: "https://mellow-pudding-b10b58.netlify.app/" },
  { name: "FORME", category: "LIFESTYLE / E-COMMERCE", description: "A softer space for objects made to be lived with.", image: "/work/forme.webp", url: "https://illustrious-beijinho-c72671.netlify.app/" },
] as const;

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const card = useRef<HTMLAnchorElement>(null);
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (!card.current || !hovered) return;
    const rect = card.current.getBoundingClientRect();
    card.current.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -motionConfig.cardTilt}deg`);
    card.current.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * motionConfig.cardTilt}deg`);
  }
  function leave() {
    setHovered(false);
    card.current?.style.removeProperty("--tilt-x");
    card.current?.style.removeProperty("--tilt-y");
  }
  return <a ref={card} className="project-card" href={project.url} target="_blank" rel="noreferrer" onMouseEnter={() => setHovered(supportsRichMotion())} onMouseMove={move} onMouseLeave={leave}>
    <div className="project-image">
      <Image src={project.image} width={960} height={700} alt="" sizes="(max-width: 899px) 90vw, 42vw" />
      {hovered && <div className="project-distortion"><WorkDistortion src={project.image} /></div>}
      <span className="project-visit">VIEW PROJECT <ArrowUpRight size={17} aria-hidden="true" /></span>
    </div>
    <div className="project-topline"><span>0{index + 1} / {project.category}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
    <h3>{project.name}</h3>
    <p>{project.description}</p>
    <span className="sr-only">(opens in a new tab)</span>
  </a>;
}

export function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = section.current;
    const rail = track.current;
    if (!node || !rail || !supportsRichMotion()) return;
    let cancelled = false;
    let destroy: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const distance = () => Math.max(0, rail.scrollWidth - rail.clientWidth);
        if (!distance()) return;
        const animation = gsap.to(rail, {
          scrollLeft: distance,
          ease: "none",
          scrollTrigger: { trigger: node, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: motionConfig.sequenceScrub, invalidateOnRefresh: true },
        });
        const focus = () => {
          const trigger = animation.scrollTrigger;
          if (trigger && distance()) trigger.scroll(trigger.start + rail.scrollLeft / distance() * (trigger.end - trigger.start));
        };
        rail.addEventListener("focusin", focus);
        destroy = () => { rail.removeEventListener("focusin", focus); animation.scrollTrigger?.kill(); animation.kill(); };
      }).catch((cause) => console.error("Could not initialise the portfolio scroll", cause));
    }, { rootMargin: "250px" });
    observer.observe(node);
    return () => { cancelled = true; observer.disconnect(); destroy?.(); };
  }, []);

  return <section id="work" ref={section} className="work-section" aria-labelledby="work-heading">
    <div className="work-heading">
      <div><p className="section-kicker"><span className="status-dot" /> THE GOOD STUFF / 01—04</p><h2 id="work-heading">Selected <em>work.</em></h2></div>
      <p>Good people. Great ideas.<br />A few of the things we&apos;ve made together.</p>
    </div>
    <div ref={track} className="work-rail" tabIndex={0} aria-label="Selected projects, scroll horizontally">
      {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
      <div className="work-end"><span>HAVE SOMETHING<br />GOOD IN MIND?</span><a href="#contact">Let&apos;s make it happen <ArrowUpRight aria-hidden="true" /></a></div>
    </div>
    <div className="work-bottom"><span>SELECTED CLIENT PROJECTS</span><span>SCROLL TO EXPLORE &nbsp; →</span></div>
  </section>;
}
