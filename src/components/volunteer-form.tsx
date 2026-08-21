"use client";

import { useState } from "react";
import { useVerifiedSubmit } from "@/hooks/use-verified-submit";
import type { VolunteerType } from "@/context/volunteer-context";
import { Turnstile } from "@/components/turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SuccessMessage from "@/components/success-message";
import { FormError } from "@/components/form-error";

type FormState = Omit<VolunteerType, "id" | "status" | "createAt">;

const emptyState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneCode: "",
  phone: "",
  country: "",
  state: "",
  address: "",
  expertise: "",
  availability: "",
  message: "",
};

export default function VolunteerForm() {
  const [form, setForm] = useState<FormState>(emptyState);
  const [token, setToken] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { submit, status, error } = useVerifiedSubmit<FormState & { status: string }>({
    collection: "volunteers",
    notifyEndpoint: "/api/email/volunteer",
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await submit({ ...form, status: "pending" }, token);
    if (ok) {
      setShowSuccess(true);
      setForm(emptyState);
      setToken(null);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="firstName" className="mb-2 block">
              First name
            </Label>
            <Input id="firstName" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="lastName" className="mb-2 block">
              Last name
            </Label>
            <Input id="lastName" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email
            </Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="phone" className="mb-2 block">
              Phone
            </Label>
            <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="country" className="mb-2 block">
              Country
            </Label>
            <Input id="country" value={form.country} onChange={(e) => update("country", e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="state" className="mb-2 block">
              State / Region
            </Label>
            <Input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} />
          </div>
        </div>

        <div>
          <Label htmlFor="expertise" className="mb-2 block">
            What skills or experience can you offer?
          </Label>
          <Input id="expertise" value={form.expertise} onChange={(e) => update("expertise", e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="availability" className="mb-2 block">
            When are you available?
          </Label>
          <Input
            id="availability"
            placeholder="e.g. weekends, a few hours a week"
            value={form.availability}
            onChange={(e) => update("availability", e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="message" className="mb-2 block">
            Anything else you&apos;d like us to know
          </Label>
          <Textarea id="message" rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} />
        </div>

        <Turnstile onVerify={setToken} />

        <FormError message={status === "error" ? error : null} />

        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Submitting…" : "Submit application"}
        </Button>
      </form>

      <SuccessMessage
        open={showSuccess}
        close={setShowSuccess}
        title="Application received"
        description="Thank you for offering your time. We'll follow up with next steps."
      />
    </>
  );
}
