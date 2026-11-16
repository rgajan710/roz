import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms of Use — Roz",
  description: "Terms governing use of the Roz website and inquiries.",
};

export default function TermsPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="legal-page">
        <div className="legal-container">
          <p className="section-eyebrow"><span className="status-dot" /> LEGAL</p>
          <h1 className="legal-title">Terms of Use</h1>
          <p className="legal-updated">Last updated: 2026</p>

          <section className="legal-section">
            <h2>Website use</h2>
            <p>
              By accessing this website, you agree to use it lawfully and not to misuse its content, forms, or functionality. The content on this site is provided for general information about Roz and our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>Intellectual property</h2>
            <p>
              Unless otherwise stated, all text, visuals, design, and code presented on this website are the property of Roz or its respective owners and may not be reproduced without permission.
            </p>
          </section>

          <section className="legal-section">
            <h2>Project inquiries</h2>
            <p>
              Submitting an inquiry does not create a client relationship or obligation to provide services. Any engagement, scope, timeline, and fees are defined only in a separate written agreement between Roz and the client.
            </p>
          </section>

          <section className="legal-section">
            <h2>External links</h2>
            <p>
              Our portfolio may link to third-party websites. We are not responsible for the content or practices of external sites.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact</h2>
            <p>
              Questions about these terms can be directed to{" "}
              <a href="mailto:roz.enquire@gmail.com">roz.enquire@gmail.com</a>.
            </p>
          </section>

          <p className="legal-back"><Link href="/">← Back to home</Link></p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
