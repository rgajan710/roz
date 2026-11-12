import type { Metadata } from "next";
import { sans, display } from "@roz/brand/fonts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` }, description: site.description, openGraph: { type: "website", title: `${site.name} | ${site.tagline}`, description: site.description, siteName: site.name }, twitter: { card: "summary_large_image" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: site.name, url: site.url, email: site.email }, { "@type": "Service", name: "Website design and development", provider: { "@type": "Organization", name: site.name }, description: site.description, serviceType: "Web design and development" }] };
  return <html lang="en" className={`${sans.variable} ${display.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div id="main-content">{children}</div><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></body></html>;
}