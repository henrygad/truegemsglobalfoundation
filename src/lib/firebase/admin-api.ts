import "server-only";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "./admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Same verification as requireAdminSession(), but for API routes — returns
 * null instead of redirecting, since a route handler can't render a page.
 */
export async function verifyAdminRequest() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;
  if (!sessionCookie) return null;

  try {
    return await adminAuth().verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
}

/**
 * Audit trail (AGENTS brief §10.4): who changed what and when, on every
 * destructive admin action. Written via the Admin SDK from server routes
 * only — firestore.rules denies all client writes to `auditLog`, so an
 * admin can't act without leaving a record, even accidentally.
 */
export async function logAuditEntry({
  actor,
  action,
  collection,
  docId,
  details,
}: {
  actor: { uid: string; email?: string };
  action: "delete" | "update";
  collection: string;
  docId: string;
  details?: Record<string, unknown>;
}) {
  await adminDb()
    .collection("auditLog")
    .add({
      actorUid: actor.uid,
      actorEmail: actor.email ?? null,
      action,
      collection,
      docId,
      details: details ?? null,
      at: FieldValue.serverTimestamp(),
    });
}
