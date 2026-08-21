import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Firebase Admin SDK — server-only, used to verify admin sessions (proxy.ts,
 * /api/auth/session) and for trusted writes that must bypass Firestore
 * security rules (the Stripe webhook's donor record — see firestore.rules,
 * which denies all client writes to `donors`).
 *
 * Requires a service account key from Firebase Console → Project Settings →
 * Service Accounts → Generate new private key. Set FIREBASE_ADMIN_PROJECT_ID,
 * FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY (the multi-line
 * key, with \n escaped) in .env.local. Without these, admin auth and the
 * donor-record write in the Stripe webhook will throw at runtime — there is
 * no fallback, on purpose, since a silently-disabled auth check is worse
 * than a loud failure.
 */
function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin credentials are not configured. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY in .env.local — see src/lib/firebase/admin.ts."
    );
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

export const adminAuth = () => getAuth(getAdminApp());
export const adminDb = () => getFirestore(getAdminApp());
