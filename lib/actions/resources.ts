"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getRoadmap } from "@/lib/roadmaps";
import { getResourcesForNode } from "@/lib/resources";

export async function voteResource(roadmapId: string, nodeId: string, resourceId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Sign in to vote." };
  }
  const userId = session.user.id;

  // Validate that the roadmap, node, and resource are all valid
  const roadmap = getRoadmap(roadmapId);
  if (!roadmap) {
    return { error: "Invalid roadmap." };
  }
  const node = roadmap.nodes.find((n) => n.id === nodeId);
  if (!node) {
    return { error: "Invalid node." };
  }
  const resources = await getResourcesForNode(roadmapId, nodeId);
  const links = node.links || [];
  const combined = [
    ...resources,
    ...links.map((l) => ({ id: l.url, url: l.url })),
  ];
  const resourceExists = combined.some((r) => (r.id || r.url) === resourceId);
  if (!resourceExists) {
    return { error: "Resource not found." };
  }

  try {
    const existing = await prisma.resourceVote.findUnique({
      where: {
        userId_roadmapId_nodeId_resourceId: {
          userId,
          roadmapId,
          nodeId,
          resourceId,
        },
      },
    });

    let voted = false;
    if (existing) {
      await prisma.resourceVote.delete({ where: { id: existing.id } });
      voted = false;
    } else {
      await prisma.resourceVote.create({
        data: {
          userId,
          roadmapId,
          nodeId,
          resourceId,
        },
      });
      voted = true;
    }

    return { success: true, voted };
  } catch (error) {
    console.error("Failed to vote for resource:", error);
    return { error: "Failed to cast vote." };
  }
}

export async function getResourceVoteCounts(roadmapId: string, nodeId: string) {
  try {
    const votes = await prisma.resourceVote.groupBy({
      by: ["resourceId"],
      where: { roadmapId, nodeId },
      _count: { userId: true },
    });
    return Object.fromEntries(votes.map((v) => [v.resourceId, v._count.userId]));
  } catch (error) {
    console.error("Failed to fetch resource vote counts:", error);
    return {};
  }
}

export async function getMyResourceVotes(roadmapId: string, nodeId: string) {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    const votes = await prisma.resourceVote.findMany({
      where: {
        userId: session.user.id,
        roadmapId,
        nodeId,
      },
      select: {
        resourceId: true,
      },
    });
    return votes.map((v) => v.resourceId);
  } catch (error) {
    console.error("Failed to fetch user resource votes:", error);
    return [];
  }
}
