import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "./admin";

/**
 * The one place that actually verifies an admin session cryptographically.
 * proxy.ts checks the cookie exists before any admin code runs; this
 * verifies it's genuine and unexpired. Call at the top of the admin layout
 * (a Server Component) — every /admin page renders through it, so there's
 * no route that can accidentally skip the check.
 */
export async function requireAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;

  if (!sessionCookie) {
    redirect("/login/admin");
  }

  try {
    const decoded = await adminAuth().verifySessionCookie(sessionCookie, true);
    return decoded;
  } catch {
    redirect("/login/admin");
  }
}
