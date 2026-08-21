import NewsletterForm from "@/components/newsletter-form";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

/**
 * Last homepage section — catches everyone not ready to give today (AGENTS
 * brief). Reuses the existing NewsletterForm (src/components/newsletter-form.tsx)
 * as-is: already Turnstile-protected via useVerifiedSubmit(), already writes
 * to Firestore, already sends the confirmation email through
 * /api/email/newsletter — the legacy form promised that and sent nothing,
 * this one actually does it. Nothing new to build here beyond the homepage
 * presentation around it.
 */
export function NewsletterChapter() {
  return (
    <section id="newsletter" className="py-16 md:py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="max-w-xl mx-auto text-center" stagger={false}>
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Stay in touch</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-4">Hear from us, rarely</h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              We send an update when there&apos;s something real to share — a completed program, a new story, or
              a filing. No filler, no weekly newsletter for its own sake.
            </p>
          </ChapterRevealItem>

          <ChapterRevealItem className="text-left">
            <NewsletterForm />
          </ChapterRevealItem>
        </ChapterReveal>
      </div>
    </section>
  );
}
