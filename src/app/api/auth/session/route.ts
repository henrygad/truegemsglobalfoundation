import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 60 * 60 * 24 * 5 * 1000; // 5 days, matches Firebase's max session cookie lifetime

/**
 * Mints a real, server-verifiable admin session (AGENTS brief §10.1). The
 * client signs in with Firebase Auth, gets an ID token, and POSTs it here.
 * We verify it and exchange it for a Firebase session cookie — httpOnly, so
 * client-side JS (and an XSS payload) can't read or forge it. proxy.ts
 * verifies this cookie server-side before any /admin route renders.
 */
export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
    }

    // Reject stale tokens outright rather than minting a long-lived session from one.
    await adminAuth().verifyIdToken(idToken, true);

    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn: SESSION_DURATION_MS });

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_MS / 1000,
    });
    return response;
  } catch (error) {
    console.error("Failed to create admin session:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
