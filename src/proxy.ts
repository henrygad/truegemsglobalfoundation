import { NextResponse } from "next/server";

/**
 * /admin access is gated client-side (src/app/admin/layout.tsx checks
 * Firebase Auth state directly, matching the legacy app), not by a
 * server-verified session cookie — there is no cookie to check here.
 */
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
