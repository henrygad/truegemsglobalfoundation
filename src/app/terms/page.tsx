import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms governing use of ${siteConfig.name}'s website and donation platform.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="August 2026">
      <p>
        These terms govern your use of {siteConfig.baseUrl.replace(/^https?:\/\//, "")}. By using this
        site, you agree to them.
      </p>

      <h2>Who we are</h2>
      <p>
        {siteConfig.name} is a {siteConfig.legalStatus}, incorporated in {siteConfig.incorporationState} in{" "}
        {siteConfig.foundingYear}.
      </p>

      <h2>Donations</h2>
      <p>
        Donations made through this site are processed by Stripe and are voluntary. Because a charitable
        donation isn&apos;t a purchase, donations are generally non-refundable, except where required by law or
        where we determine, at our discretion, that a refund is appropriate (for example, a duplicate or
        clearly mistaken charge — contact us and we&apos;ll look into it).
      </p>
      <p>
        As a {siteConfig.legalStatus}, donations are generally tax-deductible to the extent allowed by law.
        No goods or services are provided in exchange for a donation unless explicitly stated at the time of
        giving. You&apos;ll receive an email receipt for your records; consult a tax professional for advice
        specific to your situation.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don&apos;t use this site to submit false information, attempt to disrupt its operation, or misuse the
        contact, volunteer, or testimonial forms (for example, submitting spam or content you don&apos;t have
        the right to share).
      </p>

      <h2>Content and intellectual property</h2>
      <p>
        Text, photographs, and design on this site belong to {siteConfig.name} or are used under license
        (see individual photo credits where shown). Testimonials and stories are published with the
        contributor&apos;s consent and remain attributed to them.
      </p>

      <h2>No warranty</h2>
      <p>
        This site is provided as-is. We work to keep it accurate and available, but we don&apos;t guarantee it
        will be error-free or uninterrupted.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {siteConfig.name} isn&apos;t liable for indirect or consequential
        damages arising from your use of this site.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of {siteConfig.incorporationState}.</p>

      <h2>Changes</h2>
      <p>We may update these terms; the date at the top of this page reflects the latest revision.</p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
      </p>
    </LegalPage>
  );
}
