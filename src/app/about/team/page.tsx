import Image from "next/image";
import type { Metadata } from "next";
import { team } from "@/content/team";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { ChapterReveal, ChapterRevealItem } from "@/components/home/chapter-reveal";

export const metadata: Metadata = buildMetadata({
  title: "Our Team",
  description: "The people leading TrueGems Global Helping Hands Foundation's work in Maryland, Nigeria, and Africa.",
  path: "/about/team",
});

export default function TeamPage() {
  return (
    <Section>
      <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Our team</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl mb-16">
        Seven people, real names
      </h1>

      <ChapterReveal className="space-y-20" stagger={false}>
        {team.map((member, i) => (
          <ChapterRevealItem key={member.slug}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div
                className={`relative aspect-4/5 rounded-md overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
              >
                <Image
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className={`md:col-span-2 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <h2 className="font-heading text-2xl text-foreground">{member.name}</h2>
                <p className="text-sm font-medium text-accent-dark mt-1 mb-4">{member.role}</p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {member.bio.map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </ChapterRevealItem>
        ))}
      </ChapterReveal>
    </Section>
  );
}
