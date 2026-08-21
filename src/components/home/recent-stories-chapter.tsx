import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stories } from "@/content/stories";
import { formatDate } from "@/lib/utils";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

const MAX_ON_HOMEPAGE = 3;

/**
 * Reads the same `Story` content type the `<Story>` layout and /stories
 * consume (src/content/stories.ts) — nothing new to keep in sync. Renders
 * nothing while that array is empty, same as it is today; no real story
 * exists yet (see CONTENT_TODO.md §1), and a "coming soon" card here would
 * duplicate the honest empty-state already on the homepage's About/Mission
 * section and on /stories itself.
 */
export function RecentStoriesChapter() {
  if (stories.length === 0) return null;

  const recent = [...stories]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ON_HOMEPAGE);

  return (
    <section id="recent-stories" className="py-16 md:py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Stories</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground max-w-xl">
              Told at length, with consent
            </h2>
          </ChapterRevealItem>
          <ChapterRevealItem>
            <Link
              href="/stories"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              All stories
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ChapterRevealItem>
        </ChapterReveal>

        <ChapterReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recent.map((story) => (
            <ChapterRevealItem key={story.slug}>
              <Link href={`/stories/${story.slug}`} className="group block">
                <div className="relative aspect-4/5 overflow-hidden rounded-md mb-4">
                  <Image
                    src={story.coverImage.src}
                    alt={story.coverImage.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs font-medium tracking-wide uppercase text-accent-dark mb-1">
                  {story.location}
                </p>
                <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors">
                  {story.householdName}
                </h3>
                <time dateTime={story.publishedAt} className="block mt-1 text-sm text-muted-foreground">
                  {formatDate(story.publishedAt)}
                </time>
              </Link>
            </ChapterRevealItem>
          ))}
        </ChapterReveal>
      </div>
    </section>
  );
}
