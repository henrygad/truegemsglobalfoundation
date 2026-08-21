"use client";

import { m } from "motion/react";
import { revealViewport, useFadeUpVariants } from "@/lib/motion";

/**
 * Story prose reveal (AGENTS brief §6.5): paragraphs fade and rise as they
 * enter, lightly staggered — pacing the reading. Each paragraph gets its own
 * viewport trigger rather than a shared parent stagger, since paragraphs in a
 * long story are far enough apart that a single container stagger wouldn't
 * read naturally against scroll speed. Text is never delayed past readable —
 * the fade is a `y` + opacity nudge, not a hold.
 */
export function StoryProse({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-6 font-heading text-lg sm:text-xl leading-relaxed text-foreground">
      {paragraphs.map((paragraph, i) => (
        <StoryParagraph key={i} text={paragraph} />
      ))}
    </div>
  );
}

function StoryParagraph({ text }: { text: string }) {
  const variants = useFadeUpVariants();

  return (
    <m.p initial="hidden" whileInView="visible" viewport={revealViewport} variants={variants}>
      {text}
    </m.p>
  );
}
