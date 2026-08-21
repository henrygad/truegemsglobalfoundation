import Link from "next/link";
import { appeal, isAppealLive } from "@/content/appeal";
import { Button } from "@/components/ui/button";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

function formatDeadline(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Renders nothing outside its date window (AGENTS brief: "a stale appeal is
 * worse than no appeal"). Currently always null — see src/content/appeal.ts
 * for why, and how to populate a real one.
 */
export function AppealChapter() {
  if (!isAppealLive(appeal)) return null;

  return (
    <section id="appeal" className="py-10 md:py-14 scroll-mt-20 bg-accent/10 border-y border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-2">
              Current appeal · closes {formatDeadline(appeal.endDate)}
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">{appeal.title}</h2>
            <p className="text-muted-foreground max-w-2xl">{appeal.description}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Goal: ${appeal.targetAmount.toLocaleString()}
            </p>
          </ChapterRevealItem>

          <ChapterRevealItem>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={appeal.ctaHref}>{appeal.ctaLabel}</Link>}
            />
          </ChapterRevealItem>
        </ChapterReveal>
      </div>
    </section>
  );
}
