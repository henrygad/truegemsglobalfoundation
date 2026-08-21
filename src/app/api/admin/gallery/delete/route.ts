import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest, logAuditEntry } from "@/lib/firebase/admin-api";
import { adminDb } from "@/lib/firebase/admin";
import { deleteFilesFromCloudinary } from "@/lib/cloudinary";

/**
 * Gallery delete needs one more step than the generic /api/admin/delete
 * route: removing the asset from Cloudinary, which requires the Cloudinary
 * API secret — server-only, never available to a "use client" admin page
 * (see src/lib/cloudinary.ts's `import "server-only"` guard).
 */
export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, publicId } = await req.json();
  if (!id || !publicId) {
    return NextResponse.json({ error: "Missing id or publicId" }, { status: 400 });
  }

  try {
    await deleteFilesFromCloudinary([publicId]);
  } catch (error) {
    console.error("Cloudinary delete failed, removing Firestore record anyway:", error);
  }

  await adminDb().collection("gallery").doc(id).delete();

  await logAuditEntry({
    actor: { uid: session.uid, email: session.email },
    action: "delete",
    collection: "gallery",
    docId: id,
    details: { publicId },
  });

  return NextResponse.json({ success: true });
}
