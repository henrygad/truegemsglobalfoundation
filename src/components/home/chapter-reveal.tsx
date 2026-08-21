"use client";

import { m } from "motion/react";
import { revealViewport, useFadeUpVariants, useStaggerContainerVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Wraps a homepage chapter's content so it enters on scroll (AGENTS brief §6.2).
 * `once: true` is mandatory — re-animating on scroll-up is explicitly called out
 * as the cheapest-looking mistake in this category, so it's baked in here
 * rather than left for each chapter to remember.
 */
export function ChapterReveal({
  children,
  className,
  stagger = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Set false for chapters with a single block of content, nothing to stagger. */
  stagger?: boolean;
}) {
  const containerVariants = useStaggerContainerVariants();
  const itemVariants = useFadeUpVariants();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={stagger ? containerVariants : itemVariants}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}

/** A single reveal-on-scroll child inside a staggered ChapterReveal. */
export function ChapterRevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const variants = useFadeUpVariants();
  return (
    <m.div variants={variants} className={cn(className)}>
      {children}
    </m.div>
  );
}
