import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

/**
 * Allocations and filings on the homepage, not buried on a transparency page
 * nobody finds (AGENTS brief §5.6). No audited allocation figures exist yet —
 * the org's first fiscal year hasn't closed — so this is honest about that
 * rather than estimating a breakdown.
 */
export function AccountabilityChapter() {
  return (
    <section id="accountability" className="py-16 md:py-24 lg:py-32 scroll-mt-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="max-w-2xl">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-primary-foreground mb-4">
              Accountability
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl mb-6">What we can show you right now</h2>
          </ChapterRevealItem>

          <ChapterRevealItem>
            <ul className="space-y-3 text-primary-foreground">
              <li>
                Incorporated {siteConfig.foundingYear} in {siteConfig.incorporationState} as a{" "}
                {siteConfig.legalStatus}.
              </li>
              <li>
                A full allocation breakdown publishes once our first fiscal year closes — we&apos;d rather say
                that plainly than estimate a number now.
              </li>
              <li>Every filing we do have is on the transparency page, not held back.</li>
            </ul>
          </ChapterRevealItem>

          <ChapterRevealItem>
            <Link
              href="/transparency"
              className="group inline-flex items-center gap-2 mt-8 text-sm font-medium underline underline-offset-4"
            >
              See the transparency page
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ChapterRevealItem>
        </ChapterReveal>
      </div>
    </section>
  );
}
