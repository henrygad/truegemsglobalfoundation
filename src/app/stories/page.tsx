import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { stories } from "@/content/stories";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Stories",
  description: "Long-form stories from TrueGems Global Helping Hands Foundation's work in Maryland, Nigeria, and Africa.",
  path: "/stories",
});

export default function StoriesIndexPage() {
  return (
    <Section>
      <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Stories</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl mb-6">
        Told at length, with consent
      </h1>

      {stories.length === 0 ? (
        <p className="text-muted-foreground max-w-[34rem] leading-relaxed">
          {siteConfig.shortName} incorporated in {siteConfig.foundingYear}. We haven&apos;t published a full
          story yet — when a family agrees to share theirs, in their own words, it publishes here. Not a
          composite, not a stand-in.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {stories.map((story) => (
            <li key={story.slug}>
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
                <p className="text-xs font-medium tracking-wide uppercase text-accent-dark mb-1">{story.location}</p>
                <h2 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors">
                  {story.householdName}
                </h2>
                <time dateTime={story.publishedAt} className="block mt-1 text-sm text-muted-foreground">
                  {formatDate(story.publishedAt)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
