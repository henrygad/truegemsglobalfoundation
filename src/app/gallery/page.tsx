import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import GalleryPreview from "@/components/gallery-preview";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Photos and videos from TrueGems Global Helping Hands Foundation's work in Maryland, Nigeria, and Africa.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <Section className="pb-0">
        <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Gallery</p>
        <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl">
          What the work looks like
        </h1>
      </Section>

      <GalleryPreview number={24} displayButtons />
    </>
  );
}
