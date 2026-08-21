"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useGallery } from "@/context/gallery-context";
import { Button } from "@/components/ui/button";

export default function AdminGalleryPage() {
  const { gallery, loading, deleteFromGallery } = useGallery();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, publicId: string) {
    if (!confirm("Delete this gallery item? This can't be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/gallery/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, publicId }),
      });
      if (!res.ok) throw new Error();
      deleteFromGallery(id);
    } catch {
      alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-3xl text-foreground">Gallery</h1>
        <Button
          nativeButton={false}
          render={
            <Link href="/admin/gallery/upload">
              <Plus className="size-4" />
              Upload
            </Link>
          }
        />
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : gallery.length === 0 ? (
        <p className="text-muted-foreground">No gallery items yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-md overflow-hidden border border-border">
              <Image
                src={item.thumbnail || item.url}
                alt={item.description || "Gallery item"}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <Button
                  size="icon-sm"
                  variant="secondary"
                  nativeButton={false}
                  render={
                    <Link href={`/admin/gallery/edit/${item.id}`} aria-label="Edit">
                      <Pencil className="size-4" />
                    </Link>
                  }
                />
                <Button
                  size="icon-sm"
                  variant="secondary"
                  disabled={deletingId === item.id}
                  render={
                    <button type="button" onClick={() => handleDelete(item.id, item.publicId)} aria-label="Delete">
                      <Trash2 className="size-4 text-destructive" />
                    </button>
                  }
                />
              </div>
              <span className="absolute bottom-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-background/80 text-foreground">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
