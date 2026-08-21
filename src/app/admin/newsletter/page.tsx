"use client";

import { Download } from "lucide-react";
import { useNewsletter } from "@/context/newsletter-context";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { Button } from "@/components/ui/button";
import { downloadCsv } from "@/lib/csv";

/** Was a static "No subscribers yet" shell (BRAND_EXTRACT.md §4) — now real. */
export default function AdminNewsletterPage() {
  const { newsletters, loading, deleteNewsletter } = useNewsletter();

  function handleExport() {
    downloadCsv(
      `newsletter-${new Date().toISOString().slice(0, 10)}.csv`,
      newsletters.map((n) => ({ email: n.email }))
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h1 className="font-heading text-3xl text-foreground">Newsletter subscribers</h1>
        <Button
          variant="outline"
          disabled={newsletters.length === 0}
          render={
            <button type="button" onClick={handleExport}>
              <Download className="size-4" />
              Export CSV
            </button>
          }
        />
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : newsletters.length === 0 ? (
        <p className="text-muted-foreground">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {newsletters.map((n) => (
                <tr key={n.id}>
                  <td className="px-4 py-3">{n.email}</td>
                  <td className="px-4 py-3">
                    <AdminDeleteButton
                      collection="newsletter"
                      id={n.id}
                      onDeleted={() => deleteNewsletter(n.id)}
                      label={`Remove ${n.email}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
