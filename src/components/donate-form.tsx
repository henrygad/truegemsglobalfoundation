"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { givingTiers } from "@/content/giving-tiers";
import { programs } from "@/content/programs";
import { cn } from "@/lib/utils";

export function DonateForm() {
  const searchParams = useSearchParams();
  const presetAmount = searchParams.get("amount");
  const presetType = searchParams.get("type") === "monthly" ? "monthly" : "one-time";

  const [donationType, setDonationType] = useState<"one-time" | "monthly">(presetType);
  const [amount, setAmount] = useState<string>(presetAmount ?? String(givingTiers[1].amount));
  const [customAmount, setCustomAmount] = useState(false);
  const [focusArea, setFocusArea] = useState("All Programs");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Enter an amount greater than $0.");
      return;
    }
    if (!name.trim()) {
      setError("Enter your name.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donationType, amount: numericAmount, focusArea, name, email: email || undefined }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="mb-2 block">Frequency</Label>
        <div className="flex gap-2">
          {(["one-time", "monthly"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setDonationType(type)}
              className={cn(
                "flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                donationType === type
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted"
              )}
              aria-pressed={donationType === type}
            >
              {type === "one-time" ? "One-time" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Amount</Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {givingTiers.map((tier) => (
            <button
              key={tier.amount}
              type="button"
              onClick={() => {
                setAmount(String(tier.amount));
                setCustomAmount(false);
              }}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                !customAmount && amount === String(tier.amount)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted"
              )}
              aria-pressed={!customAmount && amount === String(tier.amount)}
            >
              ${tier.amount}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCustomAmount(true)}
            className={cn(
              "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
              customAmount
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground hover:bg-muted"
            )}
            aria-pressed={customAmount}
          >
            Other
          </button>
        </div>
        {customAmount && (
          <Input
            type="number"
            min="1"
            step="1"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label="Custom donation amount"
          />
        )}
      </div>

      <div>
        <Label htmlFor="focusArea" className="mb-2 block">
          Direct my gift toward
        </Label>
        <Select value={focusArea} onValueChange={(value) => setFocusArea(value ?? "All Programs")}>
          <SelectTrigger id="focusArea" className="w-full rounded-md border border-border bg-transparent px-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Programs">Wherever it&apos;s needed most</SelectItem>
            {programs.map((program) => (
              <SelectItem key={program.slug} value={program.name}>
                {program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Name
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email (for your receipt)
          </Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Redirecting to checkout…" : `Give $${amount || "0"}${donationType === "monthly" ? "/month" : ""}`}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Payment processed securely by Stripe. You&apos;ll be redirected to complete your donation.
      </p>
    </form>
  );
}
