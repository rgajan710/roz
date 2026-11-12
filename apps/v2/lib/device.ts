export function supportsRichMotion() {
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (!window.matchMedia("(min-width: 900px) and (hover: hover) and (prefers-reduced-motion: no-preference)").matches
    || (memory !== undefined && memory < 4)
    || (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4)) return false;
  const gl = document.createElement("canvas").getContext("webgl");
  if (!gl) return false;
  const debug = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = debug ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)) : "";
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return !/swiftshader|llvmpipe|software/i.test(renderer);
}
