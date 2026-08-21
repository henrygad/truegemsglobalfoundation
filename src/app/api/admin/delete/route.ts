import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest, logAuditEntry } from "@/lib/firebase/admin-api";
import { adminDb } from "@/lib/firebase/admin";

/**
 * The one route every admin "delete" button goes through, rather than a
 * direct client-SDK delete — so every destructive action produces an audit
 * log entry (AGENTS brief §10.4) with no way to accidentally skip it.
 */
const DELETABLE_COLLECTIONS = [
  "messages",
  "volunteers",
  "newsletter",
  "testimonials",
  "gallery",
  "donors",
] as const;

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection, id } = await req.json();

  if (!DELETABLE_COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 400 });
  }
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Missing document id" }, { status: 400 });
  }

  await adminDb().collection(collection).doc(id).delete();

  await logAuditEntry({
    actor: { uid: session.uid, email: session.email },
    action: "delete",
    collection,
    docId: id,
  });

  return NextResponse.json({ success: true });
}
