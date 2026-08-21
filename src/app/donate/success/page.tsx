import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { stripe } from "@/lib/stripe";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Thank You",
  description: "Your donation was received.",
  path: "/donate/success",
  noindex: true,
});

/**
 * Retrieves the real session from Stripe server-side rather than trusting
 * client-supplied query params (the legacy version read name/amount/focus
 * straight off the URL, which anyone could edit to show any confirmation
 * they wanted).
 */
export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  const session = session_id ? await stripe.checkout.sessions.retrieve(session_id).catch(() => null) : null;

  const amount = session?.amount_total ? (session.amount_total / 100).toFixed(2) : null;
  const name = session?.metadata?.name;

  return (
    <Section containerClassName="max-w-xl text-center">
      <CheckCircle2 className="size-12 text-primary mx-auto mb-6" />
      <h1 className="font-heading text-4xl text-foreground mb-4">
        {name ? `Thank you, ${name}.` : "Thank you."}
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-2">
        {amount ? `Your gift of $${amount} was received.` : "Your gift was received."} A receipt is on its
        way to your inbox.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-10">
        As a 501(c)(3), your donation is generally tax-deductible to the extent allowed by law.
      </p>
      <Button nativeButton={false} render={<Link href="/">Back to home</Link>} />
    </Section>
  );
}
