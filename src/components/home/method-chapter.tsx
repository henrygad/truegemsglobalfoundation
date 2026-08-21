import { methodSteps } from "@/content/method";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

/** What's actually done, in sequence (AGENTS brief §5.3) — prepares the reader
 * to understand the programs before they're named as a list. */
export function MethodChapter() {
  return (
    <section id="method" className="py-16 md:py-24 lg:py-32 scroll-mt-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="mb-12 max-w-2xl">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">The method</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">How the work actually happens</h2>
          </ChapterRevealItem>
        </ChapterReveal>

        <ChapterReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {methodSteps.map((step) => (
            <ChapterRevealItem key={step.step}>
              <span className="font-heading text-4xl text-muted-foreground">{String(step.step).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </ChapterRevealItem>
          ))}
        </ChapterReveal>
      </div>
    </section>
  );
}
