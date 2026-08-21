import { faqs } from "@/content/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChapterReveal, ChapterRevealItem } from "./chapter-reveal";

/**
 * The four questions that actually block a donation, not a general FAQ
 * dump (AGENTS brief). Built on Base UI's Accordion primitive
 * (src/components/ui/accordion.tsx) — real content height animation and
 * correct ARIA (aria-expanded, aria-controls, keyboard toggling and
 * arrow-key navigation between triggers) come from the primitive itself,
 * not reimplemented here.
 */
export function FaqChapter() {
  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32 scroll-mt-20 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChapterReveal className="mb-12" stagger={false}>
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Questions</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">Before you give</h2>
          </ChapterRevealItem>
        </ChapterReveal>

        <ChapterReveal stagger={false}>
          <ChapterRevealItem>
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="font-heading text-lg font-normal text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ChapterRevealItem>
        </ChapterReveal>
      </div>
    </section>
  );
}
