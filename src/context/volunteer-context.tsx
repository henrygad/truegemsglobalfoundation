"use client";

import Controller from "@/lib/firebase/controller";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type VolunteerType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phone: string;
  country: string;
  state: string;
  address: string;
  expertise: string;
  availability: string;
  message: string;
  status: "accepted" | "pending" | "disapproved";
  createAt: string;
};

interface VolunteerTypeContext {
  volunteers: VolunteerType[];
  getVolunteer: (id: string) => VolunteerType | undefined;
  addVolunteer: (p: VolunteerType) => void;
  deleteVolunteer: (id: string) => void;
  updateVolunteer: (p: VolunteerType) => void;
  loading: boolean;
  error: string;
}

const VolunteerContext = createContext<VolunteerTypeContext | null>(null);

export default function VolunteerProvider({ children }: { children: ReactNode }) {
  const [volunteers, setVolunteers] = useState<VolunteerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const Volunteers = await Controller.getAllData<VolunteerType>("volunteers");
        if (Volunteers.length) setVolunteers(Volunteers);
      } catch {
        setError("An error occurred while fetching Volunteers");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addVolunteer = (p: VolunteerType) => {
    setVolunteers((pre) => [p, ...pre]);
  };
  const getVolunteer = (id: string) => {
    return volunteers.find((p) => p.id === id);
  };
  const updateVolunteer = (uP: VolunteerType) => {
    setVolunteers((pre) => pre.map((p) => (p.id === uP.id ? { ...p, ...uP } : p)));
  };
  const deleteVolunteer = (id: string) => {
    setVolunteers((pre) => pre.filter((p) => p.id !== id));
  };

  return (
    <VolunteerContext.Provider
      value={{ volunteers, loading, error, addVolunteer, getVolunteer, updateVolunteer, deleteVolunteer }}
    >
      {children}
    </VolunteerContext.Provider>
  );
}

export function useVolunteer() {
  const context = useContext(VolunteerContext);

  if (!context) {
    throw new Error("useVolunteer must be used inside VolunteerProvider");
  }

  return context;
}
