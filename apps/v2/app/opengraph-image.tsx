import { ImageResponse } from "next/og";

export const alt = "roz — Thoughtful websites. Remarkable results.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 75px", background: "#20241f", color: "#f8f8f3" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 50, fontWeight: 800, letterSpacing: -4 }}>roz<span style={{ color: "#e85f4c" }}>.</span></span><span style={{ fontSize: 18, letterSpacing: 3 }}>INDEPENDENT DIGITAL STUDIO</span></div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 85, fontWeight: 700, lineHeight: 1.05, letterSpacing: -5 }}><span>Good ideas deserve</span><span style={{ color: "#dce99a" }}>great websites.</span></div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, letterSpacing: 2 }}><span>THOUGHTFUL WEBSITES. REMARKABLE RESULTS.</span><span>BENGALURU / EVERYWHERE</span></div>
  </div>, size);
}
