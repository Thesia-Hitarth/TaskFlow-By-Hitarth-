import { z } from "zod";

export const guideFrontmatterSchema = z.object({
  title: z.string().min(5).max(80),
  description: z.string().min(20).max(160),
  tags: z.array(z.string()).min(1).max(6),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  readTime: z.number().positive().max(60),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  relatedRoadmaps: z.array(z.string()).min(1),
  relatedNodes: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  series: z.string().optional(),
  seriesOrder: z.number().optional(),
  author: z.string().optional(),
  coverImage: z.string().optional(),
});

export type ValidatedGuideFrontmatter = z.infer<typeof guideFrontmatterSchema>;
