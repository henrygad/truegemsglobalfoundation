import type { PlaceholderImage } from "./placeholder-images";

/**
 * Long-form stories — the homepage's emotional spine (AGENTS brief §5) and the
 * content type behind /stories/[slug].
 *
 * Deliberately empty. No named household, consented beneficiary story, or
 * quote exists anywhere in the legacy repo — inventing one here would violate
 * the brief's honesty constraints (§7) more directly than any other content
 * gap on this site. The homepage's story chapter and /stories index both
 * handle an empty array with calm, honest placeholder copy instead of hiding
 * or faking the section. See CONTENT_TODO.md — this is the single highest-
 * priority content item.
 */

export type Story = {
  slug: string;
  /** First name (or family name) only, with the household's consent on file. */
  householdName: string;
  location: string;
  pullQuote: string;
  paragraphs: string[];
  coverImage: PlaceholderImage;
  publishedAt: string;
};

export const stories: Story[] = [];
