import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const DIR = path.join(process.cwd(), "content", "articles");

import { slugify, type Category } from "./format";

export { categoryLabels, formatDate, slugify, type Category } from "./format";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: Category;
  lines: string[];
  featured?: boolean;
  readingMinutes: number;
};

export type Article = ArticleMeta & { body: string; headings: { id: string; text: string }[] };


function read(file: string): Article {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const headings = [...content.matchAll(/^## (.+)$/gm)].map((m) => ({
    text: m[1].trim(),
    id: slugify(m[1]),
  }));
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    description: data.description,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    updated: data.updated
      ? data.updated instanceof Date
        ? data.updated.toISOString().slice(0, 10)
        : String(data.updated)
      : undefined,
    category: data.category,
    lines: data.lines ?? [],
    featured: data.featured ?? false,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    body: content,
    headings,
  };
}

export function getAllArticles(): ArticleMeta[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { body, headings, ...meta } = read(f);
      return meta;
    })
    .sort((a, b) => (b.updated ?? b.date).localeCompare(a.updated ?? a.date));
}

export function getArticle(slug: string): Article | null {
  const file = `${slug}.mdx`;
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(DIR, file))) return null;
  return read(file);
}

