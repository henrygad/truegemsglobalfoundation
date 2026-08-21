import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { verifyAdminRequest, logAuditEntry } from "@/lib/firebase/admin-api";
import { adminDb } from "@/lib/firebase/admin";

/** Approve/reject a testimonial submission — audit-logged, same reasoning as /api/admin/delete. */
export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();

  if (!id || (status !== "approved" && status !== "rejected")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await adminDb()
    .collection("testimonials")
    .doc(id)
    .update({ status, updatedAt: FieldValue.serverTimestamp() });

  await logAuditEntry({
    actor: { uid: session.uid, email: session.email },
    action: "update",
    collection: "testimonials",
    docId: id,
    details: { status },
  });

  return NextResponse.json({ success: true });
}
