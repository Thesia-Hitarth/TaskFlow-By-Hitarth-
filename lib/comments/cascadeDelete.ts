import { prisma } from "@/lib/prisma";

export async function deleteCommentCascade(commentId: string): Promise<void> {
  const replies = await prisma.comment.findMany({
    where: { parentId: commentId },
    select: { id: true },
  });
  const commentIds = [commentId, ...replies.map((r) => r.id)];

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
