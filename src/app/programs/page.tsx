import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { programs } from "@/content/programs";
import { methodSteps } from "@/content/method";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ChapterReveal, ChapterRevealItem } from "@/components/home/chapter-reveal";

export const metadata: Metadata = buildMetadata({
  title: "Programs",
  description: "The eight programs TrueGems Global Helping Hands Foundation runs in Maryland, Nigeria, and Africa.",
  path: "/programs",
});

export default function ProgramsPage() {
  return (
    <>
      <Section className="pb-0">
        <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Programs</p>
        <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl mb-6">
          Eight ways the same method shows up
        </h1>
        <p className="text-lg text-muted-foreground max-w-[34rem] leading-relaxed">
          Every program follows the same sequence: a need identified directly, verified in person, met
          with a response sized to it, and followed up on.
        </p>
      </Section>

      {programs.map((program, i) => (
        <Section key={program.slug} id={program.slug} tone={i % 2 === 1 ? "surface" : "default"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              {program.image ? (
                <div className="relative aspect-4/5 rounded-md overflow-hidden">
                  <Image
                    src={program.image.src}
                    alt={program.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-4/5 rounded-md bg-muted flex items-center justify-center">
                  <p className="text-sm text-muted-foreground px-8 text-center">
                    Photo pending — see IMAGE_REPLACEMENT.md
                  </p>
                </div>
              )}
            </div>

            <ChapterReveal className={i % 2 === 1 ? "md:order-1" : ""}>
              <ChapterRevealItem>
                <h2 className="font-heading text-3xl text-foreground mb-3">{program.name}</h2>
                <p className="text-lg text-muted-foreground mb-4">{program.description}</p>
                <p className="text-muted-foreground leading-relaxed">{program.method}</p>
              </ChapterRevealItem>
            </ChapterReveal>
          </div>
        </Section>
      ))}

      <Section tone="primary">
        <ChapterReveal className="max-w-2xl mx-auto text-center">
          <ChapterRevealItem>
            <p className="text-sm font-medium tracking-wide uppercase text-primary-foreground mb-4">
              The method, again
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl mb-10">
              Every program above follows these four steps
            </h2>
          </ChapterRevealItem>

          <ChapterRevealItem>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mb-10">
              {methodSteps.map((step) => (
                <li key={step.step}>
                  <span className="font-heading text-3xl text-primary-foreground">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-primary-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </ChapterRevealItem>

          <ChapterRevealItem>
            <Button variant="secondary" size="lg" nativeButton={false} render={<Link href="/donate">Give today</Link>} />
          </ChapterRevealItem>
        </ChapterReveal>
      </Section>
    </>
  );
}
