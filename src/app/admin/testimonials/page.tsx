"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Controller from "@/lib/firebase/controller";
import type { TestimonialType } from "@/context/testimonial-context";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Was a static "No testimonials yet" shell (BRAND_EXTRACT.md §4) despite the
 * dashboard overview already reading real testimonial data one page over.
 * Fetches every status directly — unlike the public site's
 * testimonial-context, which (per firestore.rules) only ever sees "approved".
 */
export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    Controller.getAllData<TestimonialType>("testimonials")
      .then(setTestimonials)
      .finally(() => setLoading(false));
  }, []);

  async function setStatus(id: string, status: "approved" | "rejected") {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/testimonials/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    } catch {
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  const pending = testimonials.filter((t) => (t.status ?? "pending") === "pending");
  const reviewed = testimonials.filter((t) => (t.status ?? "pending") !== "pending");

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground mb-8">Testimonials</h1>

      {testimonials.length === 0 ? (
        <p className="text-muted-foreground">No testimonials yet.</p>
      ) : (
        <div className="space-y-10">
          {pending.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                Pending review ({pending.length})
              </h2>
              <div className="space-y-4">
                {pending.map((t) => (
                  <TestimonialCard
                    key={t.id}
                    testimonial={t}
                    updating={updatingId === t.id}
                    onApprove={() => setStatus(t.id, "approved")}
                    onReject={() => setStatus(t.id, "rejected")}
                    onDeleted={() => setTestimonials((prev) => prev.filter((x) => x.id !== t.id))}
                  />
                ))}
              </div>
            </section>
          )}

          {reviewed.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                Reviewed ({reviewed.length})
              </h2>
              <div className="space-y-4">
                {reviewed.map((t) => (
                  <TestimonialCard
                    key={t.id}
                    testimonial={t}
                    updating={updatingId === t.id}
                    onApprove={() => setStatus(t.id, "approved")}
                    onReject={() => setStatus(t.id, "rejected")}
                    onDeleted={() => setTestimonials((prev) => prev.filter((x) => x.id !== t.id))}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  updating,
  onApprove,
  onReject,
  onDeleted,
}: {
  testimonial: TestimonialType;
  updating: boolean;
  onApprove: () => void;
  onReject: () => void;
  onDeleted: () => void;
}) {
  const status = testimonial.status ?? "pending";

  return (
    <div className="p-5 rounded-md border border-border bg-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-foreground">{testimonial.name}</p>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                status === "approved" && "bg-primary/10 text-primary",
                status === "rejected" && "bg-destructive/10 text-destructive",
                status === "pending" && "bg-accent/10 text-accent-dark"
              )}
            >
              {status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {testimonial.profession} · {testimonial.country}
          </p>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("size-3.5", i < testimonial.rating ? "fill-accent-dark text-accent-dark" : "text-muted-foreground")}
              />
            ))}
          </div>
        </div>
        <AdminDeleteButton collection="testimonials" id={testimonial.id} onDeleted={onDeleted} />
      </div>

      <p className="mt-3 text-sm text-foreground leading-relaxed">{testimonial.message}</p>

      {status === "pending" && (
        <div className="flex gap-2 mt-4">
          <Button size="sm" disabled={updating} onClick={onApprove}>
            Approve
          </Button>
          <Button size="sm" variant="outline" disabled={updating} onClick={onReject}>
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
