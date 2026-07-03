import { auth } from "@/auth";

interface AdminSession {
  user?: {
    id?: string | null;
    email?: string | null;
    role?: string | null;
  } | null;
}

/**
 * Checks if the given session belongs to an admin.
 * Primary check: User.role === "admin" (INFO-002 — role-based).
 * Fallback: ADMIN_EMAIL env var comparison (backward-compat / bootstrap).
 * Fails closed.
 */
export function isAdmin(session: AdminSession | null | undefined): boolean {
  if (!session?.user) return false;
  if (session.user.role === "admin") return true;

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && session.user.email) {
    return session.user.email.toLowerCase() === adminEmail.trim().toLowerCase();
  }
  return false;
}

export async function isAdminUser(): Promise<boolean> {
  const session = await auth();
  return isAdmin(session);
}
