"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSuggestions() {
  const session = await auth();
  const userId = session?.user?.id;

  // LOW-004: Order by live vote _count instead of the denormalized upvotes column.
  // This prevents the counter from ever drifting out of sync with actual vote records.
  const suggestions = await prisma.contentRequest.findMany({
    orderBy: { votes: { _count: "desc" } },
    where: { status: { not: "declined" } },
    include: {
      votes: {
        where: userId ? { userId } : { id: "none" },
      },
      _count: {
        select: { votes: true },
      },
    },
    take: 50,
  });

  return suggestions.map((s) => ({
    ...s,
    // Expose the accurate live count as upvotes for UI compatibility
    upvotes: s._count.votes,
    hasVoted: s.votes.length > 0,
  }));
}

export async function createSuggestion(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be signed in to submit a suggestion." };
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const rawType = (formData.get("type") as string) ?? "guide";
  const VALID_TYPES = ["roadmap", "guide", "exercise", "feature"];
  const type = VALID_TYPES.includes(rawType) ? rawType : "guide";

  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters long." };
  }
  if (title.length > 200) {
    return { error: "Title must be 200 characters or fewer." };
  }

  try {
    await prisma.contentRequest.create({
      data: {
        userId: session.user.id,
        title,
        description: description || null,
        type,
      },
    });
    revalidatePath("/suggest");
    return { success: true };
  } catch (error) {
    console.error("Failed to create content request:", error);
    return { error: "Failed to submit request." };
  }
}

export async function voteSuggestion(requestId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Sign in to vote." };
  }
  const userId = session.user.id;

  try {
    const existing = await prisma.contentRequestVote.findUnique({
      where: { userId_requestId: { userId, requestId } },
    });

    if (existing) {
      // Toggle off (unvote) — only manage the vote record, not the denormalized counter
      await prisma.contentRequestVote.delete({ where: { id: existing.id } });
    } else {
      // Toggle on (vote) — only create the vote record
      await prisma.contentRequestVote.create({ data: { userId, requestId } });
    }
    revalidatePath("/suggest");
    return { success: true };
  } catch (error) {
    console.error("Failed to vote content request:", error);
    return { error: "Failed to cast vote." };
  }
}
