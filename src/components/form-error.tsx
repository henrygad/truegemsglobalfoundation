"use client";

import { m, AnimatePresence } from "motion/react";
import { duration, ease, useReducedMotion } from "@/lib/motion";

/** Field/form error message that slides in rather than appearing abruptly (AGENTS brief §6.11). */
export function FormError({ message }: { message: string | null }) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {message && (
        <m.p
          role="alert"
          initial={reducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: duration.fast, ease: ease.out }}
          className="text-sm text-destructive"
        >
          {message}
        </m.p>
      )}
    </AnimatePresence>
  );
}
