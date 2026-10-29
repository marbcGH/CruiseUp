import Link from "next/link";
import { categoryLabels, formatDate } from "@/lib/format";
import type { ArticleMeta } from "@/lib/content";
import { bigFour } from "@/lib/lines";
import { Cover } from "./Cover";

const colorFor = (a: ArticleMeta) => bigFour.find((l) => a.lines.includes(l.slug))?.color ?? "#1A6F6B";

export function ArticleCard({ a, size = "md" }: { a: ArticleMeta; size?: "lg" | "md" }) {
  return (
    <article className="group relative">
      <div className={`overflow-hidden rounded-2xl ${size === "lg" ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
        <Cover seed={a.slug} color={colorFor(a)} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <p className="mt-4 text-sm text-ink-soft">
        <span className="font-semibold text-sea">{categoryLabels[a.category]}</span>
        <span className="mx-2 inline-block h-1 w-1 rounded-full bg-rule align-middle" aria-hidden />
        {a.readingMinutes} min read
      </p>
      <h3 className={`mt-1.5 font-bold tracking-tight ${size === "lg" ? "text-3xl leading-[1.08] sm:text-4xl" : "text-xl leading-snug"}`}>
        <Link href={`/articles/${a.slug}`} className="after:absolute after:inset-0 group-hover:underline decoration-2 underline-offset-4">
          {a.title}
        </Link>
      </h3>
      <p className={`mt-2 font-serif text-ink-soft ${size === "lg" ? "text-lg" : "text-[1.02rem]"}`}>{a.description}</p>
      <p className="mt-3 text-sm text-ink-soft">{formatDate(a.updated ?? a.date)}</p>
    </article>
  );
}

export function ArticleRow({ a }: { a: ArticleMeta }) {
  return (
    <article className="group relative grid grid-cols-[96px_1fr] gap-4 border-t border-rule py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
      <div className="aspect-[4/3] overflow-hidden rounded-xl">
        <Cover seed={a.slug} color={colorFor(a)} ship={false} className="h-full w-full" />
      </div>
      <div>
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-sea">{categoryLabels[a.category]}</span>
          <span className="mx-2 inline-block h-1 w-1 rounded-full bg-rule align-middle" aria-hidden />
          {a.readingMinutes} min
        </p>
        <h3 className="mt-1 text-lg font-bold leading-snug tracking-tight sm:text-xl">
          <Link href={`/articles/${a.slug}`} className="after:absolute after:inset-0 group-hover:underline underline-offset-4">
            {a.title}
          </Link>
        </h3>
        <p className="mt-1 hidden font-serif text-ink-soft sm:block">{a.description}</p>
      </div>
    </article>
  );
}
