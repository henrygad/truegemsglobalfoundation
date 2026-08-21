"use client";

import Controller from "@/lib/firebase/controller";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type GalleryType = {
  id: string;
  publicId: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  category: string;
  tags: string[];
  uploadedAt: string;
  description?: string;
};

interface GalleryTypeContext {
  gallery: GalleryType[];
  getGallery: (id: string) => GalleryType | undefined;
  addToGallery: (p: GalleryType) => void;
  deleteFromGallery: (id: string) => void;
  updateGallery: (p: GalleryType) => void;
  loading: boolean;
  error: string;
}

const GalleryContext = createContext<GalleryTypeContext | null>(null);

export default function GalleryProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<GalleryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const Gallery = await Controller.getAllData<GalleryType>("gallery");
        if (Gallery.length) setGallery(Gallery);
      } catch {
        setError("An error occurred while fetching Gallery");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addToGallery = (g: GalleryType) => {
    setGallery((pre) => [g, ...pre]);
  };
  const getGallery = (id: string) => {
    return gallery.find((p) => p.id === id);
  };
  const updateGallery = (uP: GalleryType) => {
    setGallery((pre) => pre.map((p) => (p.id === uP.id ? { ...p, ...uP } : p)));
  };
  const deleteFromGallery = (id: string) => {
    setGallery((pre) => pre.filter((p) => p.id !== id));
  };

  return (
    <GalleryContext.Provider
      value={{ gallery, loading, error, addToGallery, getGallery, updateGallery, deleteFromGallery }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);

  if (!context) {
    throw new Error("useGallery must be used inside GalleryProvider");
  }

  return context;
}
