"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function sendBuddyRequest(targetUserId: string, roadmapId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }
  if (session.user.id === targetUserId) return { error: "You cannot buddy with yourself." }

  try {
    // Check if a connection already exists (ignoring ended connections)
    const existing = await prisma.studyBuddyConnection.findFirst({
      where: {
        OR: [
          { userId1: session.user.id, userId2: targetUserId, roadmapId, status: { in: ["pending", "active"] } },
          { userId1: targetUserId, userId2: session.user.id, roadmapId, status: { in: ["pending", "active"] } },
        ],
      },
    })

    if (existing) {
      return { error: "A buddy request or connection already exists between you." }
    }

    await prisma.studyBuddyConnection.create({
      data: {
        userId1: session.user.id,
        userId2: targetUserId,
        roadmapId,
        status: "pending",
      },
    })

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
        OR: [
          { userId1: session.user.id },
          { userId2: session.user.id },
        ],
      },
    })

    if (!conn) return { error: "Connection not found." }

    if (conn.status === "pending") {
      // Senders of pending requests cannot reject them; they must withdraw
      if (conn.userId2 !== session.user.id) {
        return { error: "Only the recipient can reject a pending buddy request." }
      }
      await prisma.studyBuddyConnection.delete({
        where: { id: connectionId },
      })
    } else if (conn.status === "active") {
      // Either party can end an active connection
      await prisma.studyBuddyConnection.update({
        where: { id: connectionId },
        data: { status: "ended" },
      })
    } else {
      return { error: "Connection is in a status that cannot be rejected or ended." }
    }

    revalidatePath(`/dashboard`)
    revalidatePath(`/${conn.roadmapId}/buddies`)
    return { success: true }
  } catch (error) {
    console.error("Failed to reject/end buddy connection:", error)
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

