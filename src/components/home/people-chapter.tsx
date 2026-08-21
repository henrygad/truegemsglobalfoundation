import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { team } from "@/content/team";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

const MAX_ON_HOMEPAGE = 3;

/**
 * Real names, real photographs, real bios — src/content/team.ts, sourced
 * from the legacy repo's data/members.ts. Six active members, not seven: a
 * seventh (Nelly Chinonye Ohaeri) was commented out there with no way to
 * confirm current status, so she isn't included here either rather than
 * guessed back in. For an organisation this young, this is the strongest
 * trust asset available — full bios live on /about/team.
 *
 * The homepage only shows the first three (founder, co-founder, regional
 * coordinator — team.ts is already ordered leadership-first), a shorter
 * "meet the people behind it" beat rather than the full roster; "Full bios"
 * links to /about/team for the rest.
 */
export function PeopleChapter() {
  const featured = team.slice(0, MAX_ON_HOMEPAGE);

  return (
    <section id="people" className="py-16 md:py-24 lg:py-32 scroll-mt-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="mb-12">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Our team</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground max-w-xl">The people behind the work</h2>
          </ChapterRevealItem>
        </ChapterReveal>

        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <ChapterReveal className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl lg:shrink-0">
            {featured.map((member) => (
              <ChapterRevealItem key={member.slug}>
                <Link href="/about/team" className="group block">
                  <div className="relative aspect-4/5 rounded-md overflow-hidden mb-3">
                    <Image
                      src={member.photo}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="(min-width: 640px) 33vw, 90vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
                </Link>
              </ChapterRevealItem>
            ))}
          </ChapterReveal>

          <ChapterReveal className="flex-1 flex items-center justify-center" stagger={false}>
            <Link
              href="/about/team"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Full bios
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ChapterReveal>
        </div>
      </div>
    </section>
  );
}
