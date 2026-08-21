"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Thin top progress bar (AGENTS brief §6.4) — transform-only, driven by scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 32, restDelta: 0.001 });

  return (
    <m.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-accent"
      aria-hidden="true"
    />
  );
}
