"use client";

import { useState } from "react";
import { useVerifiedSubmit } from "@/hooks/use-verified-submit";
import { Turnstile } from "@/components/turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SuccessMessage from "@/components/success-message";
import { FormError } from "@/components/form-error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { submit, status, error } = useVerifiedSubmit<{ name: string; email: string; message: string }>({
    collection: "messages",
    notifyEndpoint: "/api/email/contact",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await submit({ name, email, message }, token);
    if (ok) {
      setShowSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setToken(null);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Name
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="message" className="mb-2 block">
            Message
          </Label>
          <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} />
        </div>

        <Turnstile onVerify={setToken} />

        <FormError message={status === "error" ? error : null} />

        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>
      </form>

      <SuccessMessage
        open={showSuccess}
        close={setShowSuccess}
        title="Message sent"
        description="We've received your message and will reply within 24 hours."
      />
    </>
  );
}
