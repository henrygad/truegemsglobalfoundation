"use client";

import { m } from "motion/react";
import { duration, ease, useReducedMotion } from "@/lib/motion";

/**
 * Page transitions (AGENTS brief §6.9): opacity + small y offset, under 300ms.
 *
 * Note on AnimatePresence: the brief calls for it here, but App Router's
 * `template.tsx` unmounts the previous route's template before the next one
 * mounts — there's never a moment with both present, so AnimatePresence has
 * nothing to coordinate an exit against in this file. It would be inert
 * decoration. What actually produces the transition is the enter animation
 * below, which fires fresh on every navigation because template.tsx remounts
 * per route by design.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.fast, ease: ease.out }}
    >
      {children}
    </m.div>
  );
}
