import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stories } from "@/content/stories";
import { buildMetadata } from "@/lib/seo";
import { StoryLayout } from "@/components/story/story-layout";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return {};

  return buildMetadata({
    title: story.householdName,
    description: story.pullQuote,
    path: `/stories/${story.slug}`,
    image: story.coverImage.src,
  });
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);

  if (!story) notFound();

  return <StoryLayout story={story} />;
}
