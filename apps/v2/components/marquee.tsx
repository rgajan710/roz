export function Marquee() {
  const line = "GOOD IDEAS ✳ MADE WITH FEELING ✳ BUILT TO LAST ✳ ";
  return <div className="marquee" aria-hidden="true"><div><span>{line}{line}</span><span>{line}{line}</span></div></div>;
}
