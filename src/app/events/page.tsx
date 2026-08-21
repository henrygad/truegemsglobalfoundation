import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = buildMetadata({
  title: "Events",
  description: "Upcoming events from TrueGems Global Helping Hands Foundation.",
  path: "/events",
});

/** No real events documented anywhere yet — see CONTENT_TODO.md. Honest empty state, not a fabricated calendar. */
export default function EventsPage() {
  return (
    <Section>
      <p className="text-sm font-medium tracking-wide uppercase text-accent-dark mb-4">Events</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-foreground max-w-2xl mb-6">
        Nothing scheduled to publish yet
      </h1>
      <p className="text-muted-foreground max-w-[34rem] leading-relaxed">
        As TrueGems plans in-person events and outreach dates, they&apos;ll be listed here with real dates and
        locations — not placeholders.
      </p>
    </Section>
  );
}
