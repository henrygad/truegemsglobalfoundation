"use client";

import { useVisitor } from "@/context/visitor-context";
import { formatDate } from "@/lib/utils";

/** Was a static "Analytics tracking enabled" shell with no data at all (BRAND_EXTRACT.md §4) — now real. */
export default function AdminVisitorsPage() {
  const { visitors, loading } = useVisitor();

  const byCountry = visitors.reduce<Record<string, number>>((acc, v) => {
    acc[v.country] = (acc[v.country] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground mb-8">Visitors</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : visitors.length === 0 ? (
        <p className="text-muted-foreground">No visitor data recorded yet.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-3 mb-8">
            {Object.entries(byCountry)
              .sort((a, b) => b[1] - a[1])
              .map(([country, count]) => (
                <div key={country} className="px-4 py-2 rounded-md border border-border bg-card text-sm">
                  {country} <span className="text-muted-foreground">· {count}</span>
                </div>
              ))}
          </div>

          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Page</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Browser</th>
                  <th className="px-4 py-3 font-medium">Device</th>
                  <th className="px-4 py-3 font-medium">Visited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visitors.slice(0, 100).map((v) => (
                  <tr key={v.id}>
                    <td className="px-4 py-3">{v.page}</td>
                    <td className="px-4 py-3">{v.country}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.browser}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.device}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {v.visitedAt ? formatDate(v.visitedAt) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
