import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import NewsletterForm from "@/components/newsletter-form";

export const metadata: Metadata = buildMetadata({
  title: "Newsletter",
  description: `Subscribe to updates from ${siteConfig.name}.`,
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <Section containerClassName="max-w-xl">
      <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Newsletter</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">Hear from us, rarely</h1>
      <p className="text-muted-foreground mb-10 leading-relaxed">
        We send an update when there&apos;s something real to share — a completed program, a new story, or a
        filing. No filler, no weekly newsletter for its own sake.
      </p>

      <NewsletterForm />
    </Section>
  );
}
