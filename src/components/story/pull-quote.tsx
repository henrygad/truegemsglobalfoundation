"use client";

import { m } from "motion/react";
import { revealViewport, usePullQuoteVariants } from "@/lib/motion";

/** The single loudest typographic moment in a story (AGENTS brief §6.6) — one per story, maximum. */
export function PullQuote({ children }: { children: React.ReactNode }) {
  const variants = usePullQuoteVariants();

  return (
    <m.blockquote
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      className="my-12 sm:my-16 font-heading text-2xl sm:text-3xl text-center text-primary italic leading-snug max-w-2xl mx-auto"
    >
      &ldquo;{children}&rdquo;
    </m.blockquote>
  );
}
