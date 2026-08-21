import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { stories } from "@/content/stories";

const routes = [
  "",
  "/about",
  "/about/team",
  "/programs",
  "/where-we-work",
  "/stories",
  "/events",
  "/gallery",
  "/testimonials",
  "/testimonials/leave-review",
  "/transparency",
  "/donate",
  "/volunteer",
  "/newsletter",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routes.map((route) => ({
    url: new URL(route, siteConfig.baseUrl).toString(),
    lastModified: new Date(),
  }));

  const storyEntries = stories.map((story) => ({
    url: new URL(`/stories/${story.slug}`, siteConfig.baseUrl).toString(),
    lastModified: new Date(story.publishedAt),
  }));

  return [...staticEntries, ...storyEntries];
}
