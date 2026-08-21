"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGallery } from "@/context/gallery-context";
import Controller from "@/lib/firebase/controller";
import type { GalleryType } from "@/context/gallery-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminGalleryEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getGallery, updateGallery } = useGallery();
  const item = getGallery(id);

  const [category, setCategory] = useState(item?.category ?? "");
  const [tags, setTags] = useState(item?.tags.join(", ") ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [saving, setSaving] = useState(false);

  if (!item) {
    return <p className="text-muted-foreground">Item not found — it may have been deleted.</p>;
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        category: category || "Uncategorized",
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        description,
      };
      await Controller.updateData<GalleryType>("gallery", id, payload);
      updateGallery({ ...item!, ...payload });
      router.push("/admin/gallery");
    } catch {
      alert("Failed to save. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-3xl text-foreground mb-8">Edit gallery item</h1>

      <div className="space-y-5">
        <div className="relative aspect-video rounded-md overflow-hidden border border-border">
          <Image src={item.thumbnail || item.url} alt={item.description || ""} fill className="object-cover" />
        </div>

        <div>
          <Label htmlFor="category" className="mb-2 block">
            Category
          </Label>
          <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="tags" className="mb-2 block">
            Tags (comma-separated)
          </Label>
          <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="description" className="mb-2 block">
            Description / alt text
          </Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
