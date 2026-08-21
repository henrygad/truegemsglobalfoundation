import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import VolunteerForm from "@/components/volunteer-form";

export const metadata: Metadata = buildMetadata({
  title: "Volunteer",
  description: `Volunteer with ${siteConfig.name} in Maryland, Nigeria, or Africa.`,
  path: "/volunteer",
});

export default function VolunteerPage() {
  return (
    <Section containerClassName="max-w-2xl">
      <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Volunteer</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">Offer your time</h1>
      <p className="text-muted-foreground mb-10 leading-relaxed">
        We&apos;re a small team — a real person reads every application. Tell us what you can offer and when.
      </p>

      <VolunteerForm />
    </Section>
  );
}
