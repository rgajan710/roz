import { display, sans } from "@roz/brand/fonts";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { motionStyles } from "@/lib/motion";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "roz — Thoughtful websites. Remarkable results.",
  description: "An independent digital studio building thoughtful websites for good businesses.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: "roz — Thoughtful websites. Remarkable results.", description: "An independent digital studio building thoughtful websites for good businesses.", siteName: "roz" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${sans.variable} ${display.variable}`} style={motionStyles}><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
