"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldUploadWidget, type CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useGallery } from "@/context/gallery-context";
import Controller from "@/lib/firebase/controller";
import type { GalleryType } from "@/context/gallery-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminGalleryUploadPage() {
  const router = useRouter();
  const { addToGallery } = useGallery();

  const [uploaded, setUploaded] = useState<CloudinaryUploadWidgetInfo | null>(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!uploaded) return;
    setSaving(true);

    try {
      const payload: Omit<GalleryType, "id" | "uploadedAt"> = {
        publicId: uploaded.public_id,
        type: uploaded.resource_type === "video" ? "video" : "image",
        url: uploaded.secure_url,
        category: category || "Uncategorized",
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        description,
      };

      const id = await Controller.createData<GalleryType>("gallery", payload);
      addToGallery({ ...payload, id, uploadedAt: new Date().toISOString() });
      router.push("/admin/gallery");
    } catch {
      alert("Failed to save. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-3xl text-foreground mb-8">Upload to gallery</h1>

      {!uploaded ? (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            resourceType: "auto",
            sources: ["local", "url", "camera"],
            multiple: false,
          }}
          onSuccess={(results) => {
            if (typeof results.info === "object" && results.info) setUploaded(results.info);
          }}
        >
          {({ open }) => (
            <div>
              <Button type="button" onClick={() => open()}>
                Choose photo or video
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                One upload flow for both — images and videos land in the same gallery grid.
              </p>
            </div>
          )}
        </CldUploadWidget>
      ) : (
        <div className="space-y-5">
          {uploaded.resource_type === "video" ? (
            <video
              src={uploaded.secure_url}
              controls
              className="w-full rounded-md border border-border aspect-video bg-black"
            />
          ) : (
            <div className="relative aspect-video rounded-md overflow-hidden border border-border">
              <Image src={uploaded.secure_url} alt="Uploaded preview" fill className="object-cover" />
            </div>
          )}

          <div>
            <Label htmlFor="category" className="mb-2 block">
              Category
            </Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Food Relief" />
          </div>

          <div>
            <Label htmlFor="tags" className="mb-2 block">
              Tags (comma-separated)
            </Label>
            <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. maryland, distribution" />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2 block">
              Description / alt text
            </Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save to gallery"}
            </Button>
            <Button variant="outline" onClick={() => setUploaded(null)} disabled={saving}>
              Choose a different file
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
