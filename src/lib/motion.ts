"use client";

import { useReducedMotion as useFramerReducedMotion, type Variants } from "motion/react";

/**
 * The single motion vocabulary for the whole site (AGENTS brief §6). Every
 * animation imports its easing/duration/stagger values from here — no inline
 * one-off easings anywhere else.
 */
export const ease = {
  out: [0.22, 0.61, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
  story: 1.1,
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.07,
  loose: 0.12,
} as const;

/** The standard viewport config for scroll reveals — see §6 rule: `once: true` is mandatory. */
export const revealViewport = { once: true, margin: "0px 0px -80px 0px" } as const;

/**
 * True reduced-motion guard, honoring both the OS setting (via framer-motion's
 * useReducedMotion) — components should build their variants through the
 * hooks below rather than branching on this directly, so the guard can't be
 * forgotten per-component.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}

const instant: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0 } },
};

/** Standard chapter/element reveal: fade + rise. */
export function useFadeUpVariants(dur: number = duration.base): Variants {
  const reduced = useReducedMotion();
  if (reduced) return instant;

  return {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: dur, ease: ease.out } },
  };
}

/** Parent wrapper for staggered children — pair with useFadeUpVariants() on each child. */
export function useStaggerContainerVariants(gap: number = stagger.base): Variants {
  const reduced = useReducedMotion();
  if (reduced) return { hidden: {}, visible: {} };

  return {
    hidden: {},
    visible: { transition: { staggerChildren: gap } },
  };
}

/** Hero headline: word-by-word, small y offset, blur-to-clear. */
export function useWordRevealVariants(): Variants {
  const reduced = useReducedMotion();
  if (reduced) return instant;

  return {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: duration.fast, ease: ease.out },
    },
  };
}

/** Full-bleed image plates: gentle scale-in on entry (not the scroll-linked parallax — that's useScroll-driven per component). */
export function useImageEntranceVariants(): Variants {
  const reduced = useReducedMotion();
  if (reduced) return instant;

  return {
    hidden: { opacity: 0, scale: 1.06 },
    visible: { opacity: 1, scale: 1, transition: { duration: duration.slow, ease: ease.out } },
  };
}

/** Pull quote: the loudest typographic moment — one per story maximum. */
export function usePullQuoteVariants(): Variants {
  const reduced = useReducedMotion();
  if (reduced) return instant;

  return {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: duration.story, ease: ease.out } },
  };
}
