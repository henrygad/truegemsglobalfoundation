"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Full-bleed image plate with a gentle scroll-linked scale, 1 → 1.08 (AGENTS
 * brief §6.8). Images only — this component intentionally has no slot for
 * text inside the scaling layer, so parallax-on-text (the most common way
 * this style goes wrong) isn't possible to accidentally wire up here.
 */
export function ScrollScaleImage({
  src,
  alt,
  sizes = "100vw",
  className,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 1.08]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <m.div style={{ scale }} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </m.div>
    </div>
  );
}
