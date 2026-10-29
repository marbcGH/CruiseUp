"use client";

import { useState } from "react";
import type { ArticleMeta } from "@/lib/content";
import type { Category } from "@/lib/format";
import { ArticleCard } from "./ArticleCard";

type Filter = { id: string; label: string; test: (a: ArticleMeta) => boolean };

export function ArticleBrowser({
  articles,
  lines,
  categories,
}: {
  articles: ArticleMeta[];
  lines: { slug: string; short: string }[];
  categories: { id: Category; label: string }[];
}) {
  const filters: Filter[] = [
    { id: "all", label: "Everything", test: () => true },
    ...categories.map((c) => ({ id: c.id, label: c.label, test: (a: ArticleMeta) => a.category === c.id })),
    ...lines.map((l) => ({ id: l.slug, label: l.short, test: (a: ArticleMeta) => a.lines.includes(l.slug) })),
  ];
  const [active, setActive] = useState("all");
  const f = filters.find((x) => x.id === active)!;
  const list = articles.filter(f.test);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter articles">
        {filters.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={x.id === active}
            onClick={() => setActive(x.id)}
            className="rounded-full border border-rule px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-chart"
          >
            {x.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink-soft" aria-live="polite">{list.length} {list.length === 1 ? "article" : "articles"}</p>
      <div className="mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => <ArticleCard key={a.slug} a={a} />)}
      </div>
    </>
  );
}
