import Link from "next/link";
import type { Metadata } from "next";
import { XCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Donation Not Completed",
  description: "Your donation was not completed.",
  path: "/donate/failed",
  noindex: true,
});

export default function DonateFailedPage() {
  return (
    <Section containerClassName="max-w-xl text-center">
      <XCircle className="size-12 text-muted-foreground mx-auto mb-6" />
      <h1 className="font-heading text-4xl text-foreground mb-4">Your donation wasn&apos;t completed</h1>
      <p className="text-muted-foreground leading-relaxed mb-10">
        Nothing was charged. If this wasn&apos;t intentional, you&apos;re welcome to try again.
      </p>
      <div className="flex gap-3 justify-center">
        <Button nativeButton={false} render={<Link href="/donate">Try again</Link>} />
        <Button variant="outline" nativeButton={false} render={<Link href="/contact">Contact us</Link>} />
      </div>
    </Section>
  );
}
