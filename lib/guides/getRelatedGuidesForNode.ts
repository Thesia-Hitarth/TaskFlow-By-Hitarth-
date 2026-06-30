import { getAllGuides } from "./getAllGuides";

export function getRelatedGuidesForNode(roadmapId: string, nodeId: string) {
  const guides = getAllGuides();
  return guides
    .filter(
      (g) =>
        g.frontmatter.relatedRoadmaps.includes(roadmapId) &&
        g.frontmatter.relatedNodes?.includes(nodeId)
    )
    .map((g) => ({
      slug: g.slug,
      title: g.frontmatter.title,
      readTime: g.frontmatter.readTime,
    }));
}
