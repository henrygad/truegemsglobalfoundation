"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { useDonor } from "@/context/donor-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { downloadCsv } from "@/lib/csv";
import { formatDate } from "@/lib/utils";

/**
 * Was a dead shell rendering hardcoded John Smith / Sarah Johnson rows
 * (BRAND_EXTRACT.md §4) — now real Firestore data from confirmed Stripe
 * payments only (donor-context.tsx), with the date filtering and CSV export
 * the brief asks for specifically for the treasurer.
 */
export default function AdminDonorsPage() {
  const { donors, loading } = useDonor();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(() => {
    return donors.filter((d) => {
      if (!d.createdAt) return true;
      if (from && d.createdAt < new Date(from)) return false;
      if (to && d.createdAt > new Date(`${to}T23:59:59`)) return false;
      return true;
    });
  }, [donors, from, to]);

  const total = filtered.reduce((sum, d) => sum + (d.paymentStatus === "Completed" ? d.donationAmount : 0), 0);

  function handleExport() {
    downloadCsv(
      `donors-${new Date().toISOString().slice(0, 10)}.csv`,
      filtered.map((d) => ({
        name: d.fullName,
        email: d.email ?? "",
        type: d.donationType,
        amount: d.donationAmount,
        status: d.paymentStatus ?? "",
        date: d.createdAt ? formatDate(d.createdAt) : "",
      }))
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h1 className="font-heading text-3xl text-foreground">Donors</h1>
        <Button
          variant="outline"
          disabled={filtered.length === 0}
          render={
            <button type="button" onClick={handleExport}>
              <Download className="size-4" />
              Export CSV
            </button>
          }
        />
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <Label htmlFor="from" className="mb-2 block text-xs">
            From
          </Label>
          <Input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="to" className="mb-2 block text-xs">
            To
          </Label>
          <Input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <p className="text-sm text-muted-foreground pb-2">
          {filtered.length} donation{filtered.length === 1 ? "" : "s"} · $
          {total.toLocaleString(undefined, { minimumFractionDigits: 2 })} completed
        </p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No donations on record for this range.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((donor) => (
                <tr key={donor.id}>
                  <td className="px-4 py-3">{donor.fullName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{donor.email ?? "—"}</td>
                  <td className="px-4 py-3">{donor.donationType}</td>
                  <td className="px-4 py-3">${donor.donationAmount.toFixed(2)}</td>
                  <td className="px-4 py-3">{donor.paymentStatus ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {donor.createdAt ? formatDate(donor.createdAt) : "—"}
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
