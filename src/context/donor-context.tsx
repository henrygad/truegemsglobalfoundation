"use client";

import Controller from "@/lib/firebase/controller";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type DonorType = {
  id: string;
  fullName: string;
  email: string | null;
  donationType: "One-Time" | "Monthly";
  donationAmount: number;
  stripeCustomerId?: string;
  stripeSessionId?: string;
  paymentStatus?: "Pending" | "Completed" | "Failed";
  createdAt: Date | null;
};

interface DonorTypeContext {
  donors: DonorType[];
  getDonor: (id: string) => DonorType | undefined;
  deleteDonor: (id: string) => Promise<void>;
  loading: boolean;
  error: string;
}

const DonorContext = createContext<DonorTypeContext | null>(null);

/**
 * Real Firestore data, no seed (AGENTS brief §10.3) — the legacy version
 * seeded two fake donors (John Doe, Mark Phile) via local useState and
 * discarded the real fetch through a commented-out setter, so the UI never
 * showed anything real.
 *
 * Nothing currently writes to "donors" — there's no Stripe webhook anymore
 * (client request: Stripe's own receipt email covers the donor-facing side,
 * and TrueGems follows up manually rather than through an automated pipeline
 * into this app). This context and /admin/donors are left in place — a real
 * empty state, not a fake one — in case a manual "log a donation" flow or a
 * Stripe-API pull gets added here later.
 */
export default function DonorProvider({ children }: { children: ReactNode }) {
  const [donors, setDonors] = useState<DonorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await Controller.getAllData<DonorType>("donors");
        setDonors(data);
      } catch {
        setError("An error occurred while fetching donors.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getDonor = (id: string) => donors.find((d) => d.id === id);

  const deleteDonor = async (id: string) => {
    await Controller.deleteData("donors", id);
    setDonors((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DonorContext.Provider value={{ donors, loading, error, getDonor, deleteDonor }}>
      {children}
    </DonorContext.Provider>
  );
}

export function useDonor() {
  const context = useContext(DonorContext);
  if (!context) {
    throw new Error("useDonor must be used inside DonorProvider");
  }
  return context;
}
