import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mission } from "@/content/mission";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

/**
 * Second homepage chapter — about us + mission, using the real legacy copy
 * (BRAND_EXTRACT.md / src/content/mission.ts). Replaces this slot's original
 * "a story" placeholder at the client's request: no real named-household
 * story exists yet, so this real, substantive content fills the spot instead
 * of an empty state. The <Story> layout and /stories routes are unaffected —
 * this is only about what leads the homepage.
 */
export function AboutMissionChapter() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">About us</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-6 max-w-md">
              We exist to serve the most vulnerable
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">{siteConfig.description}</p>
          </ChapterRevealItem>

          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Our mission</p>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed max-w-md">
              {mission.statement.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:underline"
            >
              Read more about us
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ChapterRevealItem>
        </ChapterReveal>
      </div>
    </section>
  );
}
