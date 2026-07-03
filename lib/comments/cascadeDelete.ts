import { prisma } from "@/lib/prisma";

export async function deleteCommentCascade(commentId: string): Promise<void> {
  const allIds = new Set<string>([commentId]);
  
  async function collectChildren(parentId: string) {
    const children = await prisma.comment.findMany({
      where: { parentId },
      select: { id: true },
    });
    for (const child of children) {
      if (!allIds.has(child.id)) {
        allIds.add(child.id);
        await collectChildren(child.id);
      }
    }
  }

  await collectChildren(commentId);
  const commentIds = Array.from(allIds);

  await prisma.$transaction([
    prisma.commentVote.deleteMany({
      where: { commentId: { in: commentIds } },
    }),
    prisma.commentReport.deleteMany({
      where: { commentId: { in: commentIds } },
    }),
    prisma.comment.deleteMany({
      where: { id: { in: commentIds.filter(id => id !== commentId) } },
    }),
    prisma.comment.delete({
      where: { id: commentId },
    }),
  ]);
}
