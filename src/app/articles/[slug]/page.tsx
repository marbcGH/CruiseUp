import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllArticles, getArticle, categoryLabels, formatDate } from "@/lib/content";
import { bigFour } from "@/lib/lines";
import { site } from "@/lib/site";
import { Cover } from "@/components/Cover";
import { ArticleCard } from "@/components/ArticleCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { mdxComponents } from "@/components/mdx";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export const ensureStatic = "navigation";

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    openGraph: { type: "article", title: a.title, description: a.description, publishedTime: a.date, modifiedTime: a.updated },
    alternates: { canonical: `/articles/${a.slug}` },
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const a = getArticle((await params).slug);
  if (!a) notFound();

  const { content } = await compileMDX({
    source: a.body,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const lines = bigFour.filter((l) => a.lines.includes(l.slug));
  const color = lines[0]?.color ?? "#1A6F6B";
  const related = getAllArticles()
    .filter((x) => x.slug !== a.slug && (x.category === a.category || x.lines.some((s) => a.lines.includes(s))))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/articles/${a.slug}`,
  };

  return (
    <article>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <p className="text-sm text-ink-soft">
          <Link href="/articles" className="font-semibold text-sea hover:underline">{categoryLabels[a.category]}</Link>
          {lines.map((l) => (
            <Link key={l.slug} href={`/lines/${l.slug}`} className="ml-3 inline-flex items-center gap-1.5 hover:text-ink">
              <span className="h-2 w-2 rounded-full" style={{ background: l.color }} aria-hidden />
              {l.short}
            </Link>
          ))}
        </p>
        <h1 className="display mt-4 max-w-5xl text-[clamp(2.4rem,6vw,4.75rem)]">{a.title}</h1>
        <p className="mt-5 max-w-3xl font-serif text-xl leading-relaxed text-ink-soft sm:text-2xl">{a.description}</p>
        <p className="mt-6 text-sm text-ink-soft">
          {a.updated ? <>Updated {formatDate(a.updated)}</> : <>Published {formatDate(a.date)}</>}
          <span className="mx-2 inline-block h-1 w-1 rounded-full bg-rule align-middle" aria-hidden />
          {a.readingMinutes} min read
        </p>
        <div className="mt-10 aspect-[21/9] overflow-hidden rounded-3xl">
          <Cover seed={a.slug} color={color} className="h-full w-full" />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-[220px_1fr]">
        {a.headings.length > 2 ? (
          <nav aria-label="On this page" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <p className="text-sm font-semibold">On this page</p>
            <ol className="mt-3 space-y-2 border-l border-rule text-sm">
              {a.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-ink-soft hover:border-ink hover:text-ink">{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        ) : <div className="hidden lg:block" />}
        <div className="prose-cruise mx-auto w-full lg:mx-0">{content}</div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-7xl border-t border-rule px-4 pt-14 sm:px-6">
          <h2 className="display text-4xl">Keep reading</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {related.map((r) => <ArticleCard key={r.slug} a={r} />)}
          </div>
        </section>
      )}
    </article>
  );
}
