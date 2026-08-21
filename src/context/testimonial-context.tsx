"use client";

import Controller from "@/lib/firebase/controller";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type TestimonialType = {
  id: string;
  name: string;
  profession: string;
  country: string;
  message: string;
  rating: number;
  photo: string;
  status?: "pending" | "approved" | "rejected";
};

interface TestimonialTypeContext {
  testimonials: TestimonialType[];
  getTestimonial: (id: string) => TestimonialType | undefined;
  addTestimonial: (p: TestimonialType) => void;
  deleteTestimonial: (id: string) => void;
  updateTestimonial: (p: TestimonialType) => void;
  loading: boolean;
  error: string;
}

const TestimonialContext = createContext<TestimonialTypeContext | null>(null);

/**
 * Public-facing provider — only ever fetches approved testimonials. This
 * mirrors firestore.rules exactly (public reads require status == "approved"),
 * so an unmoderated submission from leave-review never appears on the site
 * before someone on the team has actually reviewed it.
 */
export default function TestimonialProvider({ children }: { children: ReactNode }) {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const Testimonials = await Controller.getDataby<TestimonialType>("testimonials", [
          { field: "status", value: "approved" },
        ]);
        setTestimonials(Testimonials);
      } catch {
        setError("An error occurred while fetching Testimonials");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addTestimonial = (p: TestimonialType) => {
    setTestimonials((pre) => [p, ...pre]);
  };
  const getTestimonial = (id: string) => {
    return testimonials.find((p) => p.id === id);
  };
  const updateTestimonial = (uP: TestimonialType) => {
    setTestimonials((pre) => pre.map((p) => (p.id === uP.id ? { ...p, ...uP } : p)));
  };
  const deleteTestimonial = (id: string) => {
    setTestimonials((pre) => pre.filter((p) => p.id !== id));
  };

  return (
    <TestimonialContext.Provider
      value={{ testimonials, loading, error, addTestimonial, getTestimonial, updateTestimonial, deleteTestimonial }}
    >
      {children}
    </TestimonialContext.Provider>
  );
}

export function useTestimonial() {
  const context = useContext(TestimonialContext);

  if (!context) {
    throw new Error("useTestimonial must be used inside TestimonialProvider");
  }

  return context;
}
