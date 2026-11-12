import { Hero } from "@/components/hero";
import { SiteNav } from "@/components/site-nav";
import { Sequence } from "@/components/sequence";
import { Work } from "@/components/work";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Results } from "@/components/results";
import { Testimonial } from "@/components/testimonial";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { MotionShell } from "@/components/motion-shell";
import { Marquee } from "@/components/marquee";

export default function Home() {
  return <><MotionShell /><SiteNav /><main id="main"><Hero /><Services /><Marquee /><Sequence /><Work /><Process /><Results /><Testimonial /><Contact /></main><SiteFooter /></>;
}
