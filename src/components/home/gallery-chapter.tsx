"use client";

import GalleryPreview from "@/components/gallery-preview";
import { ChapterReveal } from "./chapter-reveal";

/** Homepage teaser for the real Firestore/Cloudinary-backed gallery — images and video in one grid, one flow. */
export function GalleryChapter() {
  return (
    <ChapterReveal stagger={false}>
      <GalleryPreview id="gallery" number={8} displayButtons={false} />
    </ChapterReveal>
  );
}
