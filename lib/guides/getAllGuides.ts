import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { guideFrontmatterSchema } from "./schema";

const GUIDES_DIR = path.join(process.cwd(), "content/guides");

export function getAllGuides() {
  if (!fs.existsSync(GUIDES_DIR)) {
    return [];
  }
  const files = fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith(".mdx"));

  return files.map(filename => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(GUIDES_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    const result = guideFrontmatterSchema.safeParse(data);
    if (!result.success) {
      throw new Error(
        `Invalid frontmatter in guides/${filename}:\n${JSON.stringify(result.error.format(), null, 2)}`
      );
    }

    return { slug, frontmatter: result.data, content };
  });
}

export function getGuideBySlug(slug: string) {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const result = guideFrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in guides/${slug}.mdx:\n${JSON.stringify(result.error.format(), null, 2)}`
    );
  }

  return { slug, frontmatter: result.data, content };
}
