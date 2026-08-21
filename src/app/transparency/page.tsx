import Link from "next/link";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { ChapterReveal, ChapterRevealItem } from "@/components/home/chapter-reveal";

export const metadata: Metadata = buildMetadata({
  title: "Transparency",
  description: "Filings, fund allocation, and legal status for TrueGems Global Helping Hands Foundation.",
  path: "/transparency",
});

const documents = [
  {
    name: "Certificate of Incorporation",
    status: `Incorporated ${siteConfig.foundingYear} in ${siteConfig.incorporationState}` as string | null,
  },
  { name: "IRS Determination Letter (501(c)(3))", status: null },
  { name: "Form 990", status: "Publishes once the first fiscal year closes" },
  { name: "Audited fund allocation", status: "Publishes once the first fiscal year closes" },
];

export default function TransparencyPage() {
  return (
    <>
      <Section className="pb-0">
        <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Transparency</p>
        <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl mb-6">
          What we can show you, plainly
        </h1>
        <p className="text-lg text-muted-foreground max-w-[34rem] leading-relaxed">
          {siteConfig.name} is a {siteConfig.legalStatus}, incorporated in {siteConfig.incorporationState}{" "}
          in {siteConfig.foundingYear}. We&apos;re a young organisation — some of the documents below aren&apos;t
          available yet, and we&apos;d rather say so than leave the page looking complete when it isn&apos;t.
        </p>
      </Section>

      <Section>
        <ChapterReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6" stagger={false}>
          {documents.map((doc) => (
            <ChapterRevealItem key={doc.name}>
              <div className="flex items-start gap-4 p-6 rounded-md border border-border h-full">
                <FileText className="size-5 shrink-0 text-muted-foreground mt-0.5" />
                <div>
                  <h2 className="font-medium text-foreground">{doc.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground italic">
                    {doc.status ?? "Not yet on file — check back as we complete our filings"}
                  </p>
                </div>
              </div>
            </ChapterRevealItem>
          ))}
        </ChapterReveal>
      </Section>

      <Section tone="surface">
        <ChapterReveal className="max-w-2xl">
          <ChapterRevealItem>
            <h2 className="font-heading text-2xl text-foreground mb-3">Leadership</h2>
            <p className="text-muted-foreground leading-relaxed">
              Real names, real bios — no stock photography standing in for people who don&apos;t work here.{" "}
              <Link href="/about/team" className="text-primary underline underline-offset-4">
                Meet the team
              </Link>
              .
            </p>
          </ChapterRevealItem>
        </ChapterReveal>
      </Section>
    </>
  );
}
