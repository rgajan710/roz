import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const output = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sequence");
await mkdir(output, { recursive: true });

for (let frame = 0; frame < 36; frame++) {
  const progress = frame / 35;
  const angle = -22 + progress * 62;
  const size = 0.72 + progress * 0.52;
  const x = 485 + Math.sin(progress * Math.PI) * 55;
  const y = 304 - progress * 30;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600">
    <defs>
      <radialGradient id="bg"><stop stop-color="#455544"/><stop offset="1" stop-color="#171e1a"/></radialGradient>
      <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eff6b9"/><stop offset=".38" stop-color="#9cab70"/><stop offset=".68" stop-color="#56694c"/><stop offset="1" stop-color="#e9b18b"/></linearGradient>
      <linearGradient id="rim"><stop stop-color="#e85f4c"/><stop offset=".5" stop-color="#dce99a"/><stop offset="1" stop-color="#e85f4c"/></linearGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="30"/></filter>
    </defs>
    <rect width="960" height="600" fill="url(#bg)"/>
    <ellipse cx="${x}" cy="${y + 90}" rx="330" ry="180" fill="#dce99a" opacity=".1" filter="url(#blur)"/>
    <g transform="translate(${x} ${y}) rotate(${angle}) scale(${size})">
      <ellipse rx="292" ry="205" fill="none" stroke="#111b16" stroke-width="92" opacity=".45" transform="translate(15 25)"/>
      <ellipse rx="292" ry="205" fill="none" stroke="url(#ribbon)" stroke-width="78"/>
      <ellipse rx="208" ry="284" fill="none" stroke="url(#ribbon)" stroke-width="67" transform="rotate(58)"/>
      <ellipse rx="292" ry="205" fill="none" stroke="url(#rim)" stroke-width="2" opacity=".5"/>
      <ellipse rx="208" ry="284" fill="none" stroke="#eef5bd" stroke-width="1" opacity=".35" transform="rotate(58)"/>
    </g>
    <g fill="#e1e9be" font-family="Arial,sans-serif" font-size="10" letter-spacing="3" opacity=".55"><text x="35" y="46">ROZ / THE ART OF BECOMING</text><text x="35" y="565">STUDY 01 — FORM IN MOTION</text><text x="850" y="565">${String(frame + 1).padStart(2, "0")} / 36</text></g>
    <path d="M35 64H925 M35 539H925" stroke="#dce99a" opacity=".18"/>
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 76, effort: 5 }).toFile(join(output, `${String(frame + 1).padStart(3, "0")}.webp`));
}
console.log(`Generated 36 original frames in ${output}`);
