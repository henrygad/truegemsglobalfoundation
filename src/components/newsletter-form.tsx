"use client";

import { useState } from "react";
import { useVerifiedSubmit } from "@/hooks/use-verified-submit";
import type { NewsletterType } from "@/context/newsletter-context";
import { Turnstile } from "@/components/turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/form-error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const { submit, status, error } = useVerifiedSubmit<Omit<NewsletterType, "id">>({
    collection: "newsletter",
    notifyEndpoint: "/api/email/newsletter",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await submit({ email, consent: true }, token);
    if (ok) {
      setEmail("");
      setToken(null);
    }
  }

  if (status === "success") {
    return <p className="text-foreground">You&apos;re subscribed — check your inbox for confirmation.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="newsletter-email" className="mb-2 block">
          Email
        </Label>
        <Input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <Turnstile onVerify={setToken} />

      <FormError message={status === "error" ? error : null} />

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
