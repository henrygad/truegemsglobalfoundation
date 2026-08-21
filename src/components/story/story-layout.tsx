import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Story } from "@/content/stories";
import { ScrollScaleImage } from "@/components/scroll-scale-image";
import { StoryProse } from "./story-prose";
import { PullQuote } from "./pull-quote";
import { formatDate } from "@/lib/utils";

/**
 * The reusable story layout (AGENTS brief §5) — every story published at
 * /stories/[slug] goes through this, so the team can add more as their own
 * content type without touching a component.
 */
export function StoryLayout({ story }: { story: Story }) {
  // Split paragraphs so the pull quote breaks up the reading roughly a third in,
  // not tacked onto the very end or the very start.
  const breakIndex = Math.max(1, Math.floor(story.paragraphs.length / 3));
  const firstHalf = story.paragraphs.slice(0, breakIndex);
  const secondHalf = story.paragraphs.slice(breakIndex);

  return (
    <article>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          All stories
        </Link>
      </div>

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">{story.location}</p>
        <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-3xl">{story.householdName}</h1>
        <time dateTime={story.publishedAt} className="block mt-4 text-sm text-muted-foreground">
          {formatDate(story.publishedAt)}
        </time>
      </header>

      <ScrollScaleImage
        src={story.coverImage.src}
        alt={story.coverImage.alt}
        sizes="100vw"
        className="h-[50vh] min-h-[360px] mb-16"
      />

      <div className="max-w-[34rem] mx-auto px-4 sm:px-6">
        <StoryProse paragraphs={firstHalf} />
        <PullQuote>{story.pullQuote}</PullQuote>
        <StoryProse paragraphs={secondHalf} />
      </div>
    </article>
  );
}
