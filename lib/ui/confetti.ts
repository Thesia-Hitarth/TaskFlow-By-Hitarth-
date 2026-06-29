import confetti from "canvas-confetti";

export function fireCelebration() {
  // Standard completion burst from bottom-center using theme colors (amber/gold)
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: 0.5, y: 0.8 },
    colors: ["#fbbf24", "#f59e0b", "#d97706", "#b45309", "#10b981"],
  });
}

export function fireBadgeCelebration() {
  // More dramatic multi-angle burst for badge unlocks
  const duration = 1500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#fbbf24", "#f59e0b", "#d97706"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#fbbf24", "#f59e0b", "#3b82f6"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  requestAnimationFrame(frame);
}
