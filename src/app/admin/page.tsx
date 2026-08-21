"use client";

import Link from "next/link";
import { useDonor } from "@/context/donor-context";
import { useMessage } from "@/context/message-context";
import { useNewsletter } from "@/context/newsletter-context";
import { useVisitor } from "@/context/visitor-context";
import { useVolunteer } from "@/context/volunteer-context";

const stats = [
  { key: "donors", label: "Donations", href: "/admin/donors" },
  { key: "messages", label: "Messages", href: "/admin/messages" },
  { key: "volunteers", label: "Volunteer applications", href: "/admin/volunteers" },
  { key: "newsletters", label: "Newsletter subscribers", href: "/admin/newsletter" },
  { key: "visitors", label: "Visitors (30d)", href: "/admin/visitors" },
] as const;

export default function AdminOverviewPage() {
  const { donors, loading: donorsLoading } = useDonor();
  const { messages, loading: messagesLoading } = useMessage();
  const { volunteers, loading: volunteersLoading } = useVolunteer();
  const { newsletters, loading: newslettersLoading } = useNewsletter();
  const { visitors, loading: visitorsLoading } = useVisitor();

  const counts = {
    donors: donors.length,
    messages: messages.length,
    volunteers: volunteers.length,
    newsletters: newsletters.length,
    visitors: visitors.length,
  };

  const loadingByKey: Record<string, boolean> = {
    donors: donorsLoading,
    messages: messagesLoading,
    volunteers: volunteersLoading,
    newsletters: newslettersLoading,
    visitors: visitorsLoading,
  };

  const totalRaised = donors.reduce((sum, d) => sum + (d.paymentStatus === "Completed" ? d.donationAmount : 0), 0);

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground mb-8">Overview</h1>

      <div className="mb-8 p-6 rounded-md border border-border bg-card">
        <p className="text-sm text-muted-foreground">Total raised (completed donations)</p>
        <p className="text-3xl font-semibold text-foreground mt-1">
          ${totalRaised.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.key}
            href={stat.href}
            className="p-6 rounded-md border border-border bg-card hover:border-primary transition-colors"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-semibold text-foreground mt-1">
              {loadingByKey[stat.key] ? "…" : counts[stat.key as keyof typeof counts]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
