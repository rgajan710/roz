import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

export function SiteFooter() {
  return <footer className="footer"><div className="footer-top"><div><Link href="/" className="footer-logo">{site.name}.</Link><p>{site.tagline}<br />Made with thought, from start to finish.</p></div><div className="footer-links"><div><span>EXPLORE</span><Link href="/#work">Our work</Link><Link href="/#services">What we do</Link><Link href="/#about">Our process</Link></div><div><span>SAY HELLO</span><a href={`mailto:${site.email}`}>{site.email}</a><Link href="/#contact">Start a project <ArrowUpRight size={14} /></Link><span>{site.location}</span></div></div></div><div className="footer-bottom"><span>© 2026 {site.name}. Made with intention.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a></div></div></footer>;
}