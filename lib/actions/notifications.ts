"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getUnreadNotifications() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.notification.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
}

export async function markAllRead() {
  const session = await auth();
  if (!session?.user?.id) return { success: false };

  await prisma.notification.updateMany({
    where: {
      userId: session.user.id,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  return { success: true };
}
