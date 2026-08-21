import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Timestamp } from "firebase/firestore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Firebase Timestamp -> JS Date
export function formatTimestamp(timestamp: Timestamp | null | undefined) {
  if (!timestamp) return null;
  try {
    return timestamp.toDate();
  } catch {
    return null;
  }
}

// human-readable date, e.g. "17 August, 2026"
export function formatDate(date: Date | string | undefined) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ISO country code -> flag emoji
export function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
