"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Every admin delete goes through /api/admin/delete so it's audit-logged (AGENTS brief §10.4). */
export function AdminDeleteButton({
  collection,
  id,
  onDeleted,
  label = "Delete",
}: {
  collection: string;
  id: string;
  onDeleted: () => void;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this record? This can't be undone.")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      onDeleted();
    } catch {
      alert("Failed to delete. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={loading}
      render={
        <button type="button" onClick={handleDelete} aria-label={label}>
          <Trash2 className="size-4 text-destructive" />
        </button>
      }
    />
  );
}
