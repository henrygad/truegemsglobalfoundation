"use client";

import Controller from "@/lib/firebase/controller";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type NewsletterType = {
  id: string;
  email: string;
  consent: boolean;
};

interface NewsletterTypeContext {
  newsletters: NewsletterType[];
  getNewsletter: (id: string) => NewsletterType | undefined;
  addNewsletter: (p: NewsletterType) => void;
  deleteNewsletter: (id: string) => void;
  updateNewsletter: (p: NewsletterType) => void;
  loading: boolean;
  error: string;
}

const NewsletterContext = createContext<NewsletterTypeContext | null>(null);

export default function NewsletterProvider({ children }: { children: ReactNode }) {
  const [newsletters, setNewsletters] = useState<NewsletterType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const Newsletters = await Controller.getAllData<NewsletterType>("newsletter");
        if (Newsletters.length) setNewsletters(Newsletters);
      } catch {
        setError("An error occurred while fetching Newsletters");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addNewsletter = (p: NewsletterType) => {
    setNewsletters((pre) => [p, ...pre]);
  };
  const getNewsletter = (id: string) => {
    return newsletters.find((p) => p.id === id);
  };
  const updateNewsletter = (uP: NewsletterType) => {
    setNewsletters((pre) => pre.map((p) => (p.id === uP.id ? { ...p, ...uP } : p)));
  };
  const deleteNewsletter = (id: string) => {
    setNewsletters((pre) => pre.filter((p) => p.id !== id));
  };

  return (
    <NewsletterContext.Provider
      value={{ newsletters, loading, error, addNewsletter, getNewsletter, updateNewsletter, deleteNewsletter }}
    >
      {children}
    </NewsletterContext.Provider>
  );
}

export function useNewsletter() {
  const context = useContext(NewsletterContext);

  if (!context) {
    throw new Error("useNewsletter must be used inside NewsletterProvider");
  }

  return context;
}
