"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const USERNAME_REGEX = /^[a-z0-9-]{3,20}$/

// Reserved usernames — prevent confusion with routes
const RESERVED = [
  "admin", "dashboard", "login", "logout", "signup", "settings",
  "u", "api", "guides", "taskflows", "compare", "showcase", "setup",
  "profile", "frontend", "backend", "react", "javascript", "activity",
]

export async function setUsername(username: string, bio: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  const cleanUsername = username.trim().toLowerCase()
  if (!USERNAME_REGEX.test(cleanUsername)) {
    return { error: "Invalid username format. Use 3–20 lowercase letters, numbers, or hyphens." }
  }

  if (RESERVED.includes(cleanUsername)) {
    return { error: "That username is reserved. Please choose another." }
  }

  // Check uniqueness
  const existing = await prisma.user.findUnique({
    where: { username: cleanUsername },
  })
  if (existing) {
    if (existing.id === session.user.id) {
      // User is setting their own username to the same one, just update bio
    } else {
      return { error: "That username is already taken." }
    }
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        username: cleanUsername,
        bio: bio.trim().slice(0, 200) || null,
      },
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to set username:", error)
    return { error: "Database error. Failed to set username." }
  }
}

export async function updateBio(bio: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { bio: bio.trim().slice(0, 200) || null },
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to update bio:", error)
    return { error: "Database error. Failed to update bio." }
  }
}
