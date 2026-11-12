import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const output = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "work");
await mkdir(output, { recursive: true });

const projects = [
  {
    slug: "scent-vault", label: "SCENT VAULT", line: "A WORLD OF", title: "scent.", category: "THE FRAGRANCE ARCHIVE", bg: "#d8cbb8", paper: "#f5f0e7", ink: "#3d342d", accent: "#b7835d",
    art: `<ellipse cx="695" cy="500" rx="150" ry="25" fill="#806b58" opacity=".18"/><rect x="590" y="215" width="215" height="270" rx="32" fill="#e8d9bf" stroke="#ac8e72" stroke-width="5"/><rect x="635" y="160" width="125" height="72" rx="8" fill="#5c4b3b"/><rect x="620" y="300" width="155" height="100" fill="#f7f1e8"/><text x="697" y="345" text-anchor="middle" fill="#544338" font-family="Georgia" font-size="16" letter-spacing="3">SCENT</text><text x="697" y="370" text-anchor="middle" fill="#544338" font-family="Georgia" font-size="16" letter-spacing="3">VAULT</text>`,
  },
  {
    slug: "outland", label: "OUTLAND", line: "OUT THERE", title: "is yours.", category: "GO FURTHER / STAY CURIOUS", bg: "#71816c", paper: "#1d2b22", ink: "#f4f3df", accent: "#dce99a",
    art: `<circle cx="700" cy="250" r="115" fill="#dce99a" opacity=".75"/><path d="M470 520 L610 270 L690 390 L755 300 L880 520Z" fill="#425844"/><path d="M420 520 L555 340 L640 455 L720 370 L865 520Z" fill="#2c4030"/><path d="M530 520 L650 400 L740 470 L785 420 L885 520Z" fill="#17271d"/><path d="M610 270 L585 315 L610 302 L628 320 L645 321Z" fill="#dce3cc" opacity=".7"/>`,
  },
  {
    slug: "sunroom", label: "sunroom", line: "A LITTLE", title: "sun daily.", category: "CARE FOR YOUR REAL LIFE", bg: "#f1c47b", paper: "#fcf5e9", ink: "#3b322b", accent: "#e87859",
    art: `<circle cx="690" cy="320" r="190" fill="#f6dbac"/><ellipse cx="700" cy="498" rx="155" ry="24" fill="#ab7954" opacity=".15"/><rect x="590" y="278" width="110" height="208" rx="23" fill="#fffdf8" stroke="#e1cfb8" stroke-width="4"/><rect x="603" y="240" width="84" height="44" rx="8" fill="#e8b48c"/><rect x="715" y="320" width="130" height="165" rx="19" fill="#f8a686"/><rect x="724" y="300" width="112" height="30" rx="6" fill="#efcfaa"/><text x="645" y="388" text-anchor="middle" fill="#cb7059" font-family="Georgia" font-size="19">sunroom</text><text x="780" y="405" text-anchor="middle" fill="#633e34" font-family="Arial" font-size="11">DAILY CARE</text>`,
  },
  {
    slug: "forme", label: "FORME", line: "MAKE ROOM", title: "for living.", category: "OBJECTS WITH INTENTION", bg: "#cec9ba", paper: "#f4f1e9", ink: "#303b31", accent: "#bd8b71",
    art: `<circle cx="690" cy="310" r="190" fill="#e3ddd1"/><ellipse cx="690" cy="508" rx="160" ry="23" fill="#726b5d" opacity=".16"/><path d="M590 355 Q590 270 655 260 H740 Q808 270 808 355 V415 H590Z" fill="#aab4a1"/><path d="M570 390 Q570 350 610 350 H785 Q825 350 825 390 V435 H570Z" fill="#788c77"/><rect x="600" y="425" width="22" height="76" rx="5" fill="#574a3e"/><rect x="775" y="425" width="22" height="76" rx="5" fill="#574a3e"/><path d="M697 268V345" stroke="#e5e9df" opacity=".5" stroke-width="3"/>`,
  },
];

for (const project of projects) {
  const { slug, label, line, title, category, bg, paper, ink, accent, art } = project;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="700" viewBox="0 0 960 700">
    <rect width="960" height="700" fill="${bg}"/><rect x="45" y="50" width="870" height="600" rx="5" fill="${paper}"/>
    <path d="M45 95H915" stroke="${ink}" opacity=".2"/><circle cx="68" cy="72" r="4" fill="${accent}"/><circle cx="81" cy="72" r="4" fill="${ink}" opacity=".25"/><circle cx="94" cy="72" r="4" fill="${ink}" opacity=".12"/>
    <text x="118" y="79" fill="${ink}" font-family="Arial,sans-serif" font-size="16" font-weight="bold" letter-spacing="2">${label}</text>
    <text x="730" y="78" fill="${ink}" font-family="Arial,sans-serif" font-size="9" letter-spacing="2">ABOUT &#160;&#160; SHOP &#160;&#160; EXPLORE</text>
    <text x="85" y="202" fill="${accent}" font-family="Arial,sans-serif" font-size="11" font-weight="bold" letter-spacing="3">${category}</text>
    <text x="85" y="278" fill="${ink}" font-family="Arial,sans-serif" font-size="47" font-weight="bold" letter-spacing="-2">${line}</text>
    <text x="85" y="345" fill="${ink}" font-family="Georgia,serif" font-size="69" font-style="italic">${title}</text>
    <path d="M85 380H310" stroke="${ink}" opacity=".35"/><text x="85" y="415" fill="${ink}" font-family="Arial,sans-serif" font-size="12">Considered details for a better everyday.</text>
    <rect x="85" y="450" width="150" height="43" fill="${ink}"/><text x="100" y="477" fill="${paper}" font-family="Arial,sans-serif" font-size="10" font-weight="bold" letter-spacing="1">DISCOVER MORE ↗</text>
    ${art}<text x="85" y="605" fill="${ink}" font-family="Arial,sans-serif" font-size="10" font-weight="bold" letter-spacing="2">A DIGITAL EXPERIENCE BY ROZ</text><text x="810" y="605" fill="${ink}" font-family="Arial,sans-serif" font-size="10" letter-spacing="2">01 / 04</text>
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 82, effort: 5 }).toFile(join(output, `${slug}.webp`));
}
console.log(`Generated ${projects.length} original portfolio illustrations in ${output}`);
