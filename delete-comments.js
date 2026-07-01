const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  console.log("Fetching comments that are on roadmaps, guides, or best practices...")

  // Find all comments that are NOT showcase comments
  const commentsToDelete = await prisma.comment.findMany({
    where: {
      OR: [
        { nodeTarget: { not: null } },
        {
          AND: [
            { guideTarget: { not: null } },
            { NOT: { guideTarget: { startsWith: "showcase-" } } }
          ]
        }
      ]
    },
    select: { id: true, body: true, nodeTarget: true, guideTarget: true }
  })

  console.log(`Found ${commentsToDelete.length} comments to delete.`)

  const commentIds = commentsToDelete.map(c => c.id)

  if (commentIds.length > 0) {
    // Delete reports associated with these comments
    const reportsResult = await prisma.commentReport.deleteMany({
      where: { commentId: { in: commentIds } }
    })
    console.log(`Deleted ${reportsResult.count} associated comment reports.`)

    // Delete votes associated with these comments
    const votesResult = await prisma.commentVote.deleteMany({
      where: { commentId: { in: commentIds } }
    })
    console.log(`Deleted ${votesResult.count} associated comment votes.`)

    // Delete the comments themselves
    const deleteResult = await prisma.comment.deleteMany({
      where: { id: { in: commentIds } }
    })
    console.log(`Successfully deleted ${deleteResult.count} comments from database.`)
  } else {
    console.log("No matching comments found to delete.")
  }

  console.log("Database cleanup complete.")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
