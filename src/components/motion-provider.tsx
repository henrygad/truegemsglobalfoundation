"use client";

import { LazyMotion, domAnimation } from "motion/react";
import { ReactLenis } from "lenis/react";

/**
 * The motion foundation for the whole app (AGENTS brief §6): Lenis smooth
 * scroll, and LazyMotion so the full framer-motion bundle never ships — every
 * animated component should use the `m` component from motion/react, not
 * `motion`, so it stays inside this lazy-loaded feature set.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.2,
        }}
      >
        {children}
      </ReactLenis>
    </LazyMotion>
  );
}
