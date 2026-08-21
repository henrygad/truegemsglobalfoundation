"use client";

import Controller from "@/lib/firebase/controller";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type VisitorType = {
  id: string;
  sessionId: string;
  country: string;
  browser: string;
  device: string;
  page: string;
  visitedAt: Date;
};

interface VisitorTypeContext {
  visitors: VisitorType[];
  getVisitor: (id: string) => VisitorType | undefined;
  addVisitor: (p: VisitorType) => void;
  deleteVisitor: (id: string) => void;
  updateVisitor: (p: VisitorType) => void;
  loading: boolean;
  error: string;
}

const VisitorContext = createContext<VisitorTypeContext | null>(null);

export default function VisitorProvider({ children }: { children: ReactNode }) {
  const [visitors, setVisitors] = useState<VisitorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const Visitors = await Controller.getAllData<VisitorType>("visitors");
        if (Visitors.length) setVisitors(Visitors);
      } catch {
        setError("An error occurred while fetching Visitors");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addVisitor = (p: VisitorType) => {
    setVisitors((pre) => [p, ...pre]);
  };
  const getVisitor = (id: string) => {
    return visitors.find((p) => p.id === id);
  };
  const updateVisitor = (uP: VisitorType) => {
    setVisitors((pre) => pre.map((p) => (p.id === uP.id ? { ...p, ...uP } : p)));
  };
  const deleteVisitor = (id: string) => {
    setVisitors((pre) => pre.filter((p) => p.id !== id));
  };

  return (
    <VisitorContext.Provider
      value={{ visitors, loading, error, addVisitor, getVisitor, updateVisitor, deleteVisitor }}
    >
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const context = useContext(VisitorContext);

  if (!context) {
    throw new Error("useVisitor must be used inside VisitorProvider");
  }

  return context;
}
