import { Suspense } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { DonateForm } from "@/components/donate-form";

export const metadata: Metadata = buildMetadata({
  title: "Donate",
  description: `Give to ${siteConfig.name} — one-time or monthly, processed securely by Stripe.`,
  path: "/donate",
});

export default function DonatePage() {
  return (
    <Section containerClassName="max-w-2xl">
      <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Donate</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">Give directly</h1>
      <p className="text-muted-foreground mb-2 leading-relaxed">
        {siteConfig.name} is a {siteConfig.legalStatus}. Donations are generally tax-deductible to the
        extent allowed by law, and you&apos;ll receive an emailed receipt.
      </p>
      <p className="text-muted-foreground mb-10 leading-relaxed">
        No goods or services are provided in exchange for a donation.
      </p>

      <Suspense fallback={null}>
        <DonateForm />
      </Suspense>
    </Section>
  );
}
