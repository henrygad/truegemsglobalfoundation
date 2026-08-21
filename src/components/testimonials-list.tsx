"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useTestimonial } from "@/context/testimonial-context";
import { ChapterReveal, ChapterRevealItem } from "@/components/home/chapter-reveal";

/**
 * Genuinely Firestore-backed, no seed data (see BRAND_EXTRACT.md §5) — unlike
 * donor-context, testimonial-context has never had fake entries, so this shows
 * exactly what's really in the collection, including empty.
 */
export function TestimonialsList() {
  const { testimonials, loading } = useTestimonial();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 rounded-md bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <p className="text-muted-foreground max-w-[34rem]">
        No testimonials on record yet. As people we&apos;ve worked with share their experience, they&apos;ll
        appear here — unedited, with attribution.
      </p>
    );
  }

  return (
    <ChapterReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <ChapterRevealItem key={testimonial.id}>
          <div className="p-6 rounded-md border border-border h-full flex flex-col">
            <div className="flex items-center gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < testimonial.rating ? "size-4 fill-accent-dark text-accent-dark" : "size-4 text-muted-foreground"
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
  );
}
