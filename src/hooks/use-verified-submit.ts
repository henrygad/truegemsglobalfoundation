"use client";

import { useState } from "react";
import Controller, { type DOC_NAME } from "@/lib/firebase/controller";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

/**
 * The one shared form-submission hook (AGENTS brief §4) — wraps Turnstile
 * verification and the Firestore write. Legacy copy-pasted this logic across
 * four forms; every form on this site goes through this instead.
 */
export function useVerifiedSubmit<T extends Record<string, unknown>>({
  collection,
  /** Optional API route to POST the same data to for a confirmation email. Fire-and-forget — an email failure doesn't undo a successful submission. */
  notifyEndpoint,
}: {
  collection: DOC_NAME;
  notifyEndpoint?: string;
}) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  async function submit(data: T, turnstileToken: string | null): Promise<boolean> {
    setError("");

    if (!turnstileToken) {
      setError("Please complete the verification challenge.");
      setStatus("error");
      return false;
    }

    setStatus("loading");

    try {
      const verifyRes = await fetch("/api/verify/cloudflare-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        throw new Error("Verification failed. Please try again.");
      }

      await Controller.createData(collection, data);

      if (notifyEndpoint) {
        fetch(notifyEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).catch((err) => console.error("Confirmation email failed to send:", err));
      }

      setStatus("success");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
      return false;
    }
  }

  return { submit, status, error, reset: () => setStatus("idle") };
}
