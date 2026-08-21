import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";

/**
 * Backs the cookie consent banner (`pop-up-cookie.tsx`). Ported from the
 * legacy repo with one fix: the legacy GET handler returned
 * `cookie_consent: true` even when no `visitor_id` cookie existed, so the
 * banner could never actually appear for a first-time visitor — the whole
 * point of a consent banner. Here, consent is only true once a visitor_id
 * cookie is actually on record.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("visitor_id")?.value;

  if (sessionId) {
    return NextResponse.json(
      { message: "Visitor cookie already exists", cookie_consent: true, client: { sessionId } },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Visitor has not consented yet", cookie_consent: false },
    { status: 200 }
  );
}

function guessBrowser(userAgent: string) {
  if (/edg/i.test(userAgent)) return "Edge";
  if (/chrome/i.test(userAgent)) return "Chrome";
  if (/firefox/i.test(userAgent)) return "Firefox";
  if (/safari/i.test(userAgent)) return "Safari";
  return "Other";
}

/**
 * Writes through the Admin SDK, same reasoning as the Stripe webhook's donor
 * write (see that route's comment) — firestore.rules denies all client
 * writes to `visitors`, so aggregate analytics can't be spammed or forged by
 * anyone calling Firestore directly with the (non-secret) public API key.
 */
export async function POST(req: NextRequest) {
  const existingSessionId = req.cookies.get("visitor_id")?.value;

  if (existingSessionId) {
    return NextResponse.json(
      { message: "Visitor cookie already exists", client: { sessionId: existingSessionId } },
      { status: 200 }
    );
  }

  const body = await req.json();
  const sessionId = crypto.randomUUID();
  const userAgent = req.headers.get("user-agent") || "Unknown";

  const client = {
    sessionId,
    country: req.headers.get("x-vercel-ip-country") || "Unknown",
    browser: guessBrowser(userAgent),
    device: /mobile/i.test(userAgent) ? "Mobile" : "Desktop",
    page: body.page ?? "/",
  };

  try {
    await adminDb()
      .collection("visitors")
      .add({ ...client, visitedAt: FieldValue.serverTimestamp() });
  } catch (error) {
    console.error("Failed to record visitor:", error);
  }

  const response = NextResponse.json({ message: "Consent recorded", client }, { status: 200 });

  response.cookies.set("visitor_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
