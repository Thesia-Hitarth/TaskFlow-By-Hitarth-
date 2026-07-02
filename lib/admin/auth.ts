import { auth } from "@/auth";

interface AdminSession {
  user?: {
    email?: string | null;
  } | null;
}

export function isAdmin(session: AdminSession | null | undefined): boolean {
  if (!session?.user?.email) return false;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return false; // Fail closed if ADMIN_EMAIL is not configured
  return session.user.email.toLowerCase() === adminEmail.trim().toLowerCase();
}

export async function isAdminUser(): Promise<boolean> {
  const session = await auth();
  return isAdmin(session);
}
