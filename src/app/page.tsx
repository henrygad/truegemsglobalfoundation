import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ChapterRail } from "@/components/home/chapter-rail";
import { HeroChapter } from "@/components/home/hero-chapter";
import { AppealChapter } from "@/components/home/appeal-chapter";
import { AboutMissionChapter } from "@/components/home/about-mission-chapter";
import { MethodChapter } from "@/components/home/method-chapter";
import { ProgramsChapter } from "@/components/home/programs-chapter";
import { TestimonialsChapter } from "@/components/home/testimonials-chapter";
import { WhereWeWorkChapter } from "@/components/home/where-we-work-chapter";
import { GalleryChapter } from "@/components/home/gallery-chapter";
import { RecentStoriesChapter } from "@/components/home/recent-stories-chapter";
import { PeopleChapter } from "@/components/home/people-chapter";
import { AccountabilityChapter } from "@/components/home/accountability-chapter";
import { AskChapter } from "@/components/home/ask-chapter";
import { VolunteerChapter } from "@/components/home/volunteer-chapter";
import { FaqChapter } from "@/components/home/faq-chapter";
import { NewsletterChapter } from "@/components/home/newsletter-chapter";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <ChapterRail />
      <HeroChapter />
      <AppealChapter />
      <AboutMissionChapter />
      <MethodChapter />
      <ProgramsChapter />
      <WhereWeWorkChapter />
      <GalleryChapter />
      <RecentStoriesChapter />
      <PeopleChapter />
      <AccountabilityChapter />
      <AskChapter />
      <VolunteerChapter />
      <TestimonialsChapter />
      <FaqChapter />
      <NewsletterChapter />
    </>
  );
}
