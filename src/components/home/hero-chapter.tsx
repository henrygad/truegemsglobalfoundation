"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { placeholderImages } from "@/content/placeholder-images";
import { duration, ease, stagger, useReducedMotion } from "@/lib/motion";
import { siteConfig } from "@/config/site";

const headline = siteConfig.tagline;

export function HeroChapter() {
  const reducedMotion = useReducedMotion();
  const words = headline.split(" ");

  return (
    <section
      id="hero"
      className="relative h-[92vh] min-h-[560px] flex items-end overflow-hidden scroll-mt-20 bg-primary-dark"
    >
      <m.div
        className="absolute inset-0"
        initial={reducedMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: duration.slow * 1.75, ease: ease.out }}
      >
        <Image
          src={placeholderImages.hero.src}
          alt={placeholderImages.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </m.div>

      <m.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow, ease: ease.out }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 text-white">
        <m.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.fast, ease: ease.out, delay: reducedMotion ? 0 : 0.3 }}
          className="text-sm font-medium tracking-wide uppercase text-white/80 mb-4"
        >
          Truegems Global Helping Hands Foundation
        </m.p>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.1] max-w-3xl mb-6">
          {words.map((word, i) => (
            <m.span
              key={i}
              initial={reducedMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: duration.fast,
                ease: ease.out,
                delay: reducedMotion ? 0 : 0.45 + i * stagger.base,
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </m.span>
          ))}
        </h1>

        <m.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration.base,
            ease: ease.out,
            delay: reducedMotion ? 0 : 0.45 + words.length * stagger.base + 0.1,
          }}
          className="text-lg text-white/90 max-w-xl mb-8"
        >
          A global foundation delivering food relief, health outreach, and community work directly to the
          people who need it.
        </m.p>

        <m.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration.base,
            ease: ease.out,
            delay: reducedMotion ? 0 : 0.45 + words.length * stagger.base + 0.25,
          }}
        >
          <Button size="lg" nativeButton={false} render={<Link href="/donate">Give today</Link>} />
        </m.div>
      </div>
    </section>
  );
}
