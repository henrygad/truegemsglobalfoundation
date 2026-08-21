import Link from "next/link";
import { Button } from "@/components/ui/button";
import { givingTiers } from "@/content/giving-tiers";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

/**
 * The ask (AGENTS brief §5.7). The brief specifies "what specific amounts buy
 * at real field prices" — no verified unit costs exist yet (CONTENT_TODO.md),
 * so amounts are presented as what they are: giving tiers, not paired with an
 * invented "$25 feeds a family for a week" claim.
 */
export function AskChapter() {
  return (
    <section id="ask" className="py-16 md:py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="max-w-2xl mx-auto text-center">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">The ask</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-4">
              Give what you can, directly
            </h2>
            <p className="text-muted-foreground mb-10">
              Field-cost figures for each program publish as soon as they&apos;re verified. Until then, every
              gift goes to the work described above — food, health outreach, and direct community support.
            </p>
          </ChapterRevealItem>

          <ChapterRevealItem>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {givingTiers.map((tier) => (
                <Button
                  key={tier.amount}
                  variant="outline"
                  size="lg"
                  nativeButton={false}
                  render={<Link href={`/donate?amount=${tier.amount}`}>${tier.amount}</Link>}
                />
              ))}
            </div>
            <Button size="lg" nativeButton={false} render={<Link href="/donate">Give another amount</Link>} />
          </ChapterRevealItem>
        </ChapterReveal>
      </div>
    </section>
  );
}
