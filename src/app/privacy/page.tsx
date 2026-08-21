import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="August 2026">
      <p>
        This policy describes what {siteConfig.name} (&quot;TrueGems,&quot; &quot;we,&quot; &quot;us&quot;) collects when you use{" "}
        {siteConfig.baseUrl.replace(/^https?:\/\//, "")}, and what we do with it. We collect the minimum we
        need to run the site and process donations — nothing is sold, and nothing is collected that isn&apos;t
        described here.
      </p>

      <h2>Information you give us directly</h2>
      <ul>
        <li>
          <strong>Contact and volunteer forms:</strong> name, email, and whatever you write in the message
          field.
        </li>
        <li>
          <strong>Newsletter signup:</strong> your email address.
        </li>
        <li>
          <strong>Donations:</strong> name, email, and donation amount. Card details are entered directly
          into Stripe&apos;s checkout page — they never pass through our servers, and we never see or store your
          full card number.
        </li>
        <li>
          <strong>Testimonials:</strong> whatever you submit for publication, including your name if you
          choose to include it.
        </li>
      </ul>

      <h2>Information collected automatically</h2>
      <p>
        When you accept cookies, we set a session cookie and a visitor cookie to keep basic, aggregate
        analytics: country (derived from IP, not stored as a raw address), browser/device information from
        your user agent, and which page you landed on. We use Vercel Analytics and Speed Insights for
        aggregate traffic and performance data.
      </p>

      <h2>Who we share information with</h2>
      <p>We use a small number of processors to run the site. Each only receives what it needs to do its job:</p>
      <ul>
        <li>
          <strong>Firebase (Google) / Firestore</strong> — stores form submissions, donor records, and
          testimonials.
        </li>
        <li>
          <strong>Stripe</strong> — processes donations. Stripe&apos;s own privacy policy governs your payment
          data.
        </li>
        <li>
          <strong>Resend</strong> — sends transactional emails (confirmations, receipts, replies).
        </li>
        <li>
          <strong>Cloudinary</strong> — hosts photos and videos in our gallery.
        </li>
        <li>
          <strong>Cloudflare Turnstile</strong> — verifies form submissions aren&apos;t automated, without
          tracking you for advertising purposes.
        </li>
      </ul>
      <p>We don&apos;t sell personal information, and we don&apos;t share it for third-party advertising.</p>

      <h2>Your rights</h2>
      <p>
        You can ask us what we hold about you, ask us to correct it, or ask us to delete it, by emailing{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>. If you&apos;re in the
        European Union or UK, this includes the rights to access, rectification, erasure, and data
        portability under GDPR. Because our processors (listed above) are US-based, data you give us may be
        transferred to and processed in the United States.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site isn&apos;t directed at children, and we don&apos;t knowingly collect personal information from
        anyone under 13. If you believe a child has given us information, contact us and we&apos;ll delete it.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep form submissions and donor records for as long as needed to respond to you, maintain
        accurate financial records, and meet our obligations as a 501(c)(3) organization — then we delete
        them, or you can request deletion sooner as above.
      </p>

      <h2>Changes to this policy</h2>
      <p>If this policy changes materially, we&apos;ll update the date at the top of this page.</p>

      <h2>Contact</h2>
      <p>
        {siteConfig.contact.email} · {siteConfig.contact.phone} ·{" "}
        {siteConfig.contact.address.streetAddress}, {siteConfig.contact.address.addressLocality},{" "}
        {siteConfig.contact.address.addressRegion} {siteConfig.contact.address.postalCode}
      </p>
    </LegalPage>
  );
}
