import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, background: "#f4f3ec", color: "#20231f" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 700 }}><span>{site.name}.</span><span style={{ color: "#e75d4b" }}>✳</span></div><div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{site.tagline}</div><div style={{ fontSize: 21 }}>INDEPENDENT DIGITAL STUDIO / GOOD WORK FOR GOOD PEOPLE</div></div>, size); }