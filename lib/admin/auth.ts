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
  return session.user.role === "admin";
}

export async function isAdminUser(): Promise<boolean> {
  const session = await auth();
  return isAdmin(session);
}
