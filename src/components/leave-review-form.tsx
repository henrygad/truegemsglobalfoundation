"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, X } from "lucide-react";
import { CldUploadWidget, type CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useVerifiedSubmit } from "@/hooks/use-verified-submit";
import { Turnstile } from "@/components/turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SuccessMessage from "@/components/success-message";
import { FormError } from "@/components/form-error";
import { cn } from "@/lib/utils";

type ReviewForm = {
  name: string;
  email: string;
  profession: string;
  country: string;
  message: string;
  rating: number;
  photo: string;
};

const emptyState: ReviewForm = { name: "", email: "", profession: "", country: "", message: "", rating: 5, photo: "" };

export default function LeaveReviewForm() {
  const [form, setForm] = useState(emptyState);
  const [token, setToken] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // No notifyEndpoint here — the Firestore payload for testimonials doesn't
  // include email (TestimonialType has no email field), so the confirmation
  // email is sent manually below, after a successful submit, with the email
  // this component collected but never persisted.
  const { submit, status: submitStatus, error } = useVerifiedSubmit<
    Omit<ReviewForm, "email"> & { status: "pending" }
  >({
    collection: "testimonials",
  });

  function update<K extends keyof ReviewForm>(key: K, value: ReviewForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { email, ...testimonialData } = form;
    // Every submission starts pending — firestore.rules enforces this server-side
    // too, so a submission can't self-approve by sending a different value here.
    const ok = await submit({ ...testimonialData, status: "pending" as const }, token);
    if (ok) {
      // notifyEndpoint needs the email even though it's not stored on the testimonial record
      fetch("/api/email/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email }),
      }).catch(() => {});
      setShowSuccess(true);
      setForm(emptyState);
      setToken(null);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label className="mb-2 block">Rating</Label>
          <div className="flex gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={form.rating === star}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                onClick={() => update("rating", star)}
                className="p-1"
              >
                <Star
                  className={cn("size-6", star <= form.rating ? "fill-accent-dark text-accent-dark" : "text-muted-foreground")}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="name" className="mb-2 block">
              Name
            </Label>
            <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email
            </Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="profession" className="mb-2 block">
              Profession
            </Label>
            <Input id="profession" value={form.profession} onChange={(e) => update("profession", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="country" className="mb-2 block">
              Country
            </Label>
            <Input id="country" value={form.country} onChange={(e) => update("country", e.target.value)} required />
          </div>
        </div>

        <div>
          <Label htmlFor="message" className="mb-2 block">
            Your experience
          </Label>
          <Textarea id="message" rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} required />
        </div>

        <div>
          <Label className="mb-2 block">Photo (optional)</Label>
          {form.photo ? (
            <div className="flex items-center gap-3">
              <div className="relative size-16 rounded-full overflow-hidden border border-border">
                <Image src={form.photo} alt="Your photo" fill className="object-cover" />
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => update("photo", "")}>
                <X className="size-4" /> Remove photo
              </Button>
            </div>
          ) : (
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              options={{ resourceType: "image", sources: ["local", "camera"], multiple: false, maxFiles: 1 }}
              onSuccess={(results) => {
                const info = results.info as CloudinaryUploadWidgetInfo | undefined;
                if (info?.secure_url) update("photo", info.secure_url);
              }}
            >
              {({ open }) => (
                <Button type="button" variant="outline" onClick={() => open()}>
                  Add a photo
                </Button>
              )}
            </CldUploadWidget>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Add a photo to put a face to your review — totally optional.
          </p>
        </div>

        <Turnstile onVerify={setToken} />

        <FormError message={submitStatus === "error" ? error : null} />

        <Button type="submit" className="w-full" disabled={submitStatus === "loading"}>
          {submitStatus === "loading" ? "Submitting…" : "Submit review"}
        </Button>
      </form>

      <SuccessMessage
        open={showSuccess}
        close={setShowSuccess}
        title="Thank you"
        description="We review every submission before it's published."
      />
    </>
  );
}
