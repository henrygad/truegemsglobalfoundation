import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import LeaveReviewForm from "@/components/leave-review-form";

export const metadata: Metadata = buildMetadata({
  title: "Leave a Review",
  description: `Share your experience with ${siteConfig.name}.`,
  path: "/testimonials/leave-review",
});

export default function LeaveReviewPage() {
  return (
    <Section containerClassName="max-w-2xl">
      <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Leave a review</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">Tell us how it went</h1>
      <p className="text-muted-foreground mb-10 leading-relaxed">
        We review every submission before publishing it — unedited, with your name attached, unless you
        ask us not to.
      </p>

      <LeaveReviewForm />
    </Section>
  );
}
