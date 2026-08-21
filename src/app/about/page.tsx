import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { values } from "@/content/values";
import { timeline } from "@/content/timeline";
import { mission } from "@/content/mission";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { ChapterReveal, ChapterRevealItem } from "@/components/home/chapter-reveal";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `About ${siteConfig.name} — a young, honest 501(c)(3) nonprofit working in Maryland, Nigeria, and Africa.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section className="pb-0">
        <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">About us</p>
        <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl mb-6">
          A young foundation, built on work already done
        </h1>
        <p className="text-lg text-muted-foreground max-w-[34rem] leading-relaxed">
          {siteConfig.name} was incorporated in {siteConfig.incorporationState} in {siteConfig.foundingYear}
          , but the work behind it started years earlier — direct, hands-on support for families in
          Maryland, Nigeria, and partner communities across Africa.
        </p>
        <p className="mt-4 text-lg text-muted-foreground max-w-[34rem] leading-relaxed">
          {siteConfig.description}
        </p>
      </Section>

      <Section>
        <ChapterReveal className="grid grid-cols-1 md:grid-cols-2 gap-12" stagger={false}>
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Our mission</p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {mission.statement.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </ChapterRevealItem>
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Our vision</p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {mission.vision.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </ChapterRevealItem>
        </ChapterReveal>
      </Section>

      <Section tone="surface">
        <ChapterReveal className="mb-12 max-w-2xl">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">What we hold to</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">Values, not slogans</h2>
          </ChapterRevealItem>
        </ChapterReveal>

        <ChapterReveal className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {values.map((value) => (
            <ChapterRevealItem key={value.name}>
              <h3 className="font-semibold text-foreground text-lg">{value.name}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{value.description}</p>
            </ChapterRevealItem>
          ))}
        </ChapterReveal>
      </Section>

      <Section>
        <ChapterReveal className="mb-12 max-w-2xl">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">So far</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">A short, honest timeline</h2>
          </ChapterRevealItem>
        </ChapterReveal>

        <ChapterReveal className="max-w-2xl space-y-6 border-l-2 border-border pl-6">
          {timeline.map((entry) => (
            <ChapterRevealItem key={entry.year}>
              <p className="text-sm font-semibold text-primary">{entry.year}</p>
              <p className="mt-1 text-foreground leading-relaxed">{entry.label}</p>
            </ChapterRevealItem>
          ))}
        </ChapterReveal>

        <Link
          href="/about/team"
          className="group inline-flex items-center gap-2 mt-16 text-sm font-medium text-primary hover:underline"
        >
          Meet the team behind this
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Section>
    </>
  );
}
