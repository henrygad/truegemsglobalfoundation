"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";
import { appeal, isAppealLive } from "@/content/appeal";

export const chapters = [
  { id: "hero", label: "Welcome" },
  // Only tracked while a real appeal is actually rendering — an untracked
  // rail entry pointing at a section that isn't in the DOM would never
  // resolve in the IntersectionObserver below.
  ...(isAppealLive(appeal) ? [{ id: "appeal", label: "Current appeal" }] : []),
  { id: "about", label: "About us" },
  { id: "method", label: "The method" },
  { id: "programs", label: "Programs" },
  { id: "where-we-work", label: "Where we work" },
  { id: "gallery", label: "Gallery" },
  { id: "recent-stories", label: "Stories" },
  { id: "people", label: "Our team" },
  { id: "accountability", label: "Accountability" },
  { id: "ask", label: "The ask" },
  { id: "volunteer", label: "Volunteer" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "Questions" },
  { id: "newsletter", label: "Stay in touch" },
] as const;

/** Fixed left rail marking position in the narrative (AGENTS brief §6.3), desktop ≥1180px only. */
export function ChapterRail() {
  const [activeId, setActiveId] = useState<string>(chapters[0].id);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const mostVisible = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
        setActiveId(mostVisible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    chapters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Chapters"
      className="hidden fixed left-8 top-1/2 -translate-y-1/2 z-40 [@media(min-width:1180px)]:block"
    >
      <ol className="flex flex-col gap-4">
        {chapters.map((chapter) => {
          const isActive = chapter.id === activeId;
          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span className="relative h-px w-6 bg-border">
                  {isActive && (
                    <m.span
                      layoutId={reducedMotion ? undefined : "chapter-rail-indicator"}
                      className="absolute inset-y-0 left-0 w-10 origin-left bg-primary"
                      initial={reducedMotion ? false : { scaleX: 0.6 }}
                      animate={{ scaleX: 1 }}
                      transition={
                        reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 32 }
                      }
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium tracking-wide whitespace-nowrap transition-opacity",
                    isActive ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-60 text-foreground"
                  )}
                >
                  {chapter.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
