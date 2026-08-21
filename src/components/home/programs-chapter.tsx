import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/content/programs";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

/** A typed list of program rows, not identical photo cards (AGENTS brief §5.4, §6.7). */
export function ProgramsChapter() {
  return (
    <section id="programs" className="py-16 md:py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="mb-12 max-w-2xl">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">The programs</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
              Eight ways the same method shows up
            </h2>
          </ChapterRevealItem>
        </ChapterReveal>

        <ChapterReveal className="border-t border-border">
          {programs.map((program) => (
            <ChapterRevealItem key={program.slug}>
              <Link
                href={`/programs#${program.slug}`}
                className="group flex items-center justify-between gap-6 py-6 sm:py-8 border-b border-border overflow-hidden"
              >
                <div className="transition-transform duration-300 ease-out group-hover:translate-x-2">
                  <h3 className="font-heading text-xl sm:text-2xl text-foreground transition-colors duration-300 group-hover:text-primary">
                    {program.name}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-lg">
                    {program.description}
                  </p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </ChapterRevealItem>
          ))}
        </ChapterReveal>
      </div>
    </section>
  );
}
