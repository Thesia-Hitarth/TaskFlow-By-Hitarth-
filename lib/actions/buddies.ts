"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function sendBuddyRequest(targetUserId: string, roadmapId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }
  if (session.user.id === targetUserId) return { error: "You cannot buddy with yourself." }

  try {
    // Check if a connection already exists (any status)
    const existing = await prisma.studyBuddyConnection.findFirst({
      where: {
        OR: [
          { userId1: session.user.id, userId2: targetUserId, roadmapId },
          { userId1: targetUserId, userId2: session.user.id, roadmapId },
        ],
      },
    })

    if (existing) {
      if (existing.status === "pending" || existing.status === "active") {
        return { error: "A buddy request or connection already exists between you." }
      }
      
      // Reuse the ended connection, resetting status to pending and ordering requester as userId1
      await prisma.studyBuddyConnection.update({
        where: { id: existing.id },
        data: {
          userId1: session.user.id,
          userId2: targetUserId,
          status: "pending",
          createdAt: new Date(),
        },
      })
    } else {
      await prisma.studyBuddyConnection.create({
        data: {
          userId1: session.user.id,
          userId2: targetUserId,
          roadmapId,
          status: "pending",
        },
      })
    }

    revalidatePath(`/${roadmapId}/buddies`)
    return { success: true }
  } catch (error) {
    console.error("Failed to send buddy request:", error)
    return { error: "Database error. Failed to send request." }
  }
}

export async function acceptBuddyRequest(connectionId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  try {
    const conn = await prisma.studyBuddyConnection.findFirst({
      where: {
        id: connectionId,
        userId2: session.user.id,
        status: "pending",
      },
    })

    if (!conn) return { error: "Buddy request not found or not addressed to you." }

    await prisma.studyBuddyConnection.update({
      where: { id: connectionId },
      data: { status: "active" },
    })

    revalidatePath(`/dashboard`)
    revalidatePath(`/${conn.roadmapId}/buddies`)
    return { success: true }
  } catch (error) {
    console.error("Failed to accept buddy request:", error)
    return { error: "Database error." }
  }
}

export async function rejectBuddyRequest(connectionId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  try {
    const conn = await prisma.studyBuddyConnection.findFirst({
      where: {
        id: connectionId,
        userId2: session.user.id,
        status: "pending",
      },
    })

    if (!conn) return { error: "Pending buddy request not found or not addressed to you." }

    await prisma.studyBuddyConnection.delete({
      where: { id: connectionId },
    })

    revalidatePath(`/dashboard`)
    revalidatePath(`/${conn.roadmapId}/buddies`)
    return { success: true }
  } catch (error) {
    console.error("Failed to reject buddy request:", error)
    return { error: "Database error." }
  }
}

export async function endBuddyConnection(connectionId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  try {
    const conn = await prisma.studyBuddyConnection.findFirst({
      where: {
        id: connectionId,
        status: "active",
        OR: [
          { userId1: session.user.id },
          { userId2: session.user.id },
        ],
      },
    })

    if (!conn) return { error: "Active buddy connection not found." }

    await prisma.studyBuddyConnection.update({
      where: { id: connectionId },
      data: { status: "ended" },
    })

    // Notify the other partner that the connection has ended
    const otherUserId = conn.userId1 === session.user.id ? conn.userId2 : conn.userId1;
    await prisma.notification.create({
      data: {
        userId: otherUserId,
        type: "buddy_ended",
        title: "Study Buddy Connection Ended",
        message: `${session.user.name || "A user"} has ended your study buddy connection.`,
        isRead: false,
      },
    });

    revalidatePath(`/dashboard`)
    revalidatePath(`/${conn.roadmapId}/buddies`)
    return { success: true }
  } catch (error) {
    console.error("Failed to end buddy connection:", error)
    return { error: "Database error." }
  }
}

export async function withdrawBuddyRequest(connectionId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  try {
    const conn = await prisma.studyBuddyConnection.findFirst({
      where: {
        id: connectionId,
        userId1: session.user.id,
        status: "pending",
      },
    })

    if (!conn) {
      return { error: "Pending request not found or not sent by you." }
    }

    await prisma.studyBuddyConnection.delete({
      where: { id: connectionId },
    })

    revalidatePath(`/dashboard`)
    revalidatePath(`/${conn.roadmapId}/buddies`)
    return { success: true }
  } catch (error) {
    console.error("Failed to withdraw buddy request:", error)
    return { error: "Database error." }
  }
}

