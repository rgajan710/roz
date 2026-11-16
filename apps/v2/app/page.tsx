import WorldScene from "@/components/world-scene";
import { Hero } from "@/components/hero";
import { TechMarquee } from "@/components/tech-marquee";
import { Manifesto } from "@/components/manifesto";
import { SiteNav } from "@/components/site-nav";
import { Work } from "@/components/work";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Results } from "@/components/results";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { MotionShell } from "@/components/motion-shell";
import { ChapterNav } from "@/components/chapter-nav";

export default function Home() {
  return (
    <>
      <MotionShell />
      <WorldScene />
      <SiteNav />
      <ChapterNav />
      <main id="main">
        <Hero />
        <TechMarquee />
        <Manifesto />
        <Work />
        <Services />
        <Process />
        <Results />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
