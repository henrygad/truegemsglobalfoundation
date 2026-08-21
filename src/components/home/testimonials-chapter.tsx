"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useTestimonial } from "@/context/testimonial-context";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

const MAX_ON_HOMEPAGE = 3;

/**
 * Real Firestore testimonials only (AGENTS brief §6, §7) — same
 * approved-only, no-seed source as /testimonials (src/context/testimonial-context.tsx).
 * Renders nothing while loading and nothing if the collection is empty —
 * no skeleton flash, no "no testimonials yet" placeholder text on the
 * homepage; an empty section here should just not exist, not visibly say so.
 */
export function TestimonialsChapter() {
  const { testimonials, loading } = useTestimonial();

  if (loading || testimonials.length === 0) return null;

  const featured = testimonials.slice(0, MAX_ON_HOMEPAGE);

  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 scroll-mt-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <ChapterRevealItem className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">
              What people tell us
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">Directly, unedited</h2>
          </ChapterRevealItem>
          <ChapterRevealItem>
            <Link href="/testimonials/leave-review" className="text-sm font-medium text-primary hover:underline">
              Share your experience
            </Link>
          </ChapterRevealItem>
        </ChapterReveal>

        <ChapterReveal
          className={`grid grid-cols-1 gap-8 ${featured.length > 1 ? "sm:grid-cols-2" : ""} ${
            featured.length > 2 ? "lg:grid-cols-3" : ""
          }`}
        >
          {featured.map((testimonial) => (
            <ChapterRevealItem key={testimonial.id}>
              <div className="p-6 rounded-md border border-border bg-card h-full flex flex-col">
                <div
                  className="flex items-center gap-1 mb-4"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < testimonial.rating
                          ? "size-4 fill-accent-dark text-accent-dark"
                          : "size-4 text-muted-foreground"
                      }
                    />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed flex-1">{testimonial.message}</p>
                <div className="flex items-center gap-3 mt-6">
                  {testimonial.photo && (
                    <Image
                      src={testimonial.photo}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full object-cover size-10"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.profession} · {testimonial.country}
                    </p>
                  </div>
                </div>
              </div>
            </ChapterRevealItem>
          ))}
        </ChapterReveal>
      </div>
    </section>
  );
}
