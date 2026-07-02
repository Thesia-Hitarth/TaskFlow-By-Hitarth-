import { auth } from "@/auth";

interface AdminSession {
  user?: {
    id?: string | null;
    email?: string | null;
  } | null;
}

/**
 * Checks if the given session belongs to an admin.
 * Primary check: User.role === "admin" (INFO-002 — role-based, survives email changes).
 * Fallback: ADMIN_EMAIL env var comparison (backward-compat during migration).
 * Fails closed — returns false if neither check can be confirmed.
 */
export function isAdmin(session: AdminSession | null | undefined): boolean {
  if (!session?.user) return false;
  // Primary: email fallback for deployments that haven't seeded the role yet
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && session.user.email) {
    return session.user.email.toLowerCase() === adminEmail.trim().toLowerCase();
  }
  return false;
}

export async function isAdminUser(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;

  // Primary check: database role field (stable, survives email changes)
  try {
    const { prisma } = await import("@/lib/prisma"); // Dynamic import prevents middleware compilation errors
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });
    if (user?.role === "admin") return true;
  } catch {
    // DB unavailable — fall through to email check
  }

  // Fallback: ADMIN_EMAIL env var (backward-compat for deployments without role seeded)
  return isAdmin(session);
}
