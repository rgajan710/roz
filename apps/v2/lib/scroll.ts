// Lightweight global scroll state for high-performance 60-120 FPS animation
// Decoupled from React state to eliminate re-renders during scroll scrubbing

export interface ScrollState {
  progress: number;       // 0 to 1 across whole page
  targetProgress: number; // smoothed
  velocity: number;
  currentSection: number; // 0 to 4
}

export const scrollState: ScrollState = {
  progress: 0,
  targetProgress: 0,
  velocity: 0,
  currentSection: 0,
};

export function updateScrollProgress(p: number, v: number = 0) {
  scrollState.targetProgress = Math.max(0, Math.min(1, p));
  scrollState.velocity = v;

  if (p < 0.2) scrollState.currentSection = 0;
  else if (p < 0.45) scrollState.currentSection = 1;
  else if (p < 0.75) scrollState.currentSection = 2;
  else if (p < 0.9) scrollState.currentSection = 3;
  else scrollState.currentSection = 4;
}
