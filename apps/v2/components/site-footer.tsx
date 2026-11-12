import { Wordmark } from "@roz/brand/wordmark";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-topline"><span>THOUGHTFUL WEBSITES.<br />REMARKABLE RESULTS.</span><a href="#top">BACK TO TOP ↑</a></div>
    <a href="#top" className="footer-wordmark" aria-label="Roz, back to top"><Wordmark name="roz" /></a>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} ROZ STUDIO. MADE WITH INTENTION.</span><span>BENGALURU, INDIA / WORKING EVERYWHERE</span><a href="mailto:roz.enquire@gmail.com">SAY HELLO <ArrowUpRight size={14} aria-hidden="true" /></a></div>
  </footer>;
}
