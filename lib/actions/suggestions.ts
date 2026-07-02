"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSuggestions() {
  const session = await auth();
  const userId = session?.user?.id;

  const suggestions = await prisma.contentRequest.findMany({
    orderBy: { upvotes: "desc" },
    where: { status: { not: "declined" } },
    include: {
      votes: {
        where: userId ? { userId } : { id: "none" },
      },
    },
    take: 50,
  });

  return suggestions.map((s) => ({
    ...s,
    hasVoted: s.votes.length > 0,
  }));
}

export async function createSuggestion(formData: FormData) {
  const session = await auth();
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const rawType = (formData.get("type") as string) ?? "guide";
  const VALID_TYPES = ["roadmap", "guide", "exercise", "feature"];
  const type = VALID_TYPES.includes(rawType) ? rawType : "guide";

  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters long." };
  }

  try {
    await prisma.contentRequest.create({
      data: {
        userId: session?.user?.id ?? null,
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
      // Toggle off (unvote)
      await prisma.$transaction([
        prisma.contentRequestVote.delete({ where: { id: existing.id } }),
        prisma.contentRequest.update({
          where: { id: requestId },
          data: { upvotes: { decrement: 1 } },
        }),
      ]);
    } else {
      // Toggle on (vote)
      await prisma.$transaction([
        prisma.contentRequestVote.create({ data: { userId, requestId } }),
        prisma.contentRequest.update({
          where: { id: requestId },
          data: { upvotes: { increment: 1 } },
        }),
      ]);
    }
    revalidatePath("/suggest");
    return { success: true };
  } catch (error) {
    console.error("Failed to vote content request:", error);
    return { error: "Failed to cast vote." };
  }
}
