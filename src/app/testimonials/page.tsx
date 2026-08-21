import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { TestimonialsList } from "@/components/testimonials-list";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials",
  description: "What people who've worked with TrueGems Global Helping Hands Foundation say, unedited.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Testimonials</p>
          <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl">
            What people tell us directly
          </h1>
        </div>
        <Button variant="outline" nativeButton={false} render={<Link href="/testimonials/leave-review">Leave a review</Link>} />
      </div>

      <TestimonialsList />
    </Section>
  );
}
