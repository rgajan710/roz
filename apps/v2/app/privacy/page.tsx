import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Roz",
  description: "How Roz collects, uses, and protects information shared through our website.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="legal-page">
        <div className="legal-container">
          <p className="section-eyebrow"><span className="status-dot" /> LEGAL</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last updated: 2026</p>

          <section className="legal-section">
            <h2>Overview</h2>
            <p>
              Roz respects your privacy. This page explains what information we collect when you visit our website or submit a project inquiry, and how we use it.
            </p>
          </section>

          <section className="legal-section">
            <h2>Information we collect</h2>
            <p>
              When you contact us through our inquiry form, we collect the details you provide such as your name, email address, project scope selections, and message. We use this information solely to respond to your inquiry and discuss potential work.
            </p>
          </section>

          <section className="legal-section">
            <h2>How we use information</h2>
            <p>
              We do not sell your personal information. Submitted information is used to communicate with you about your project and to improve our services. Inquiry messages may be processed through our email delivery provider to reach our inbox.
            </p>
          </section>

          <section className="legal-section">
            <h2>Cookies and analytics</h2>
            <p>
              This site may use essential technical storage required for basic functionality. If analytics or additional tracking tools are added in the future, this policy will be updated accordingly.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact</h2>
            <p>
              If you have questions about this policy or your data, contact us at{" "}
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
