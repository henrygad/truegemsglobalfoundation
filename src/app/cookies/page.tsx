import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description: `Which cookies ${siteConfig.name} uses and why.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="August 2026">
      <p>
        This page lists the cookies this site actually sets. There&apos;s no hidden tracking beyond what&apos;s
        described here.
      </p>

      <h2>Cookies we set</h2>
      <ul>
        <li>
          <strong>session_id</strong> — httpOnly, functional. Identifies your browser session for 24 hours
          so the site works correctly across page loads.
        </li>
        <li>
          <strong>visitor_id</strong> — httpOnly, set for 30 days once you accept cookies. Backs basic,
          aggregate analytics (country, browser, page visited) — see our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </li>
      </ul>

      <h2>Third-party cookies</h2>
      <ul>
        <li>
          <strong>Stripe</strong> sets its own cookies on its checkout domain when you donate, for fraud
          prevention and to process your payment.
        </li>
        <li>
          <strong>Cloudflare Turnstile</strong> sets a short-lived cookie to verify form submissions aren&apos;t
          automated.
        </li>
        <li>
          <strong>Vercel Analytics</strong> collects aggregate, privacy-preserving usage data without
          setting a tracking cookie.
        </li>
      </ul>

      <h2>Your choices</h2>
      <p>
        The cookie banner on first visit lets you accept or decline non-essential cookies. Declining still
        lets you browse, donate, and use the site — you just won&apos;t be counted in our basic visitor
        analytics. You can also block cookies entirely through your browser settings, though this may
        affect how well the site works.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
      </p>
    </LegalPage>
  );
}
