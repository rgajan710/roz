import { ArrowUpRight, Braces, Compass, Layers3, Sparkles } from "lucide-react";
import { MagneticLink } from "@/components/magnetic-link";
import { SpotlightCard } from "@/components/spotlight-card";

const services = [
  { number: "01", name: "Strategy & identity", text: "The clear thinking and creative direction that make your brand unmistakably yours.", icon: Compass },
  { number: "02", name: "Digital design", text: "Distinctive, intuitive experiences that make people want to stay a little longer.", icon: Layers3 },
  { number: "03", name: "Development", text: "Fast, accessible websites built with care and ready for what comes next.", icon: Braces },
  { number: "04", name: "E-commerce & care", text: "Thoughtful storefronts and ongoing support for the businesses behind them.", icon: Sparkles },
] as const;

export function Services() {
  return <section id="studio" className="services-section section-pad" aria-labelledby="services-heading">
    <div className="services-intro">
      <p className="section-kicker"><span className="status-dot" /> SMALL STUDIO. BIG FEELING.</p>
      <h2 id="services-heading">We make the<br /><em>internet feel</em><br />a little more human<span className="coral">.</span></h2>
      <div className="services-intro-bottom"><p>Thoughtful strategy, good design, and the kind of details you can feel. From the first conversation to the final click, we&apos;re in it with you.</p><MagneticLink href="#contact">Get to know us</MagneticLink></div>
    </div>
    <div className="service-grid">
      {services.map(({ number, name, text, icon: Icon }) => <SpotlightCard key={number}>
        <div className="service-card-top"><span>({number})</span><Icon size={22} strokeWidth={1.3} aria-hidden="true" /></div>
        <div><h3>{name}</h3><p>{text}</p></div>
        <ArrowUpRight className="service-arrow" size={18} aria-hidden="true" />
      </SpotlightCard>)}
    </div>
    <div className="services-foot"><span>INDEPENDENT BY DESIGN</span><span>GOOD WORK FOR GOOD PEOPLE &nbsp; ✳</span></div>
  </section>;
}
