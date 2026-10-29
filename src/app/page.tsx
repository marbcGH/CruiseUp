import Link from "next/link";
import { bigFour, nicheLines } from "@/lib/lines";
import { getAllArticles } from "@/lib/content";
import { getVideos } from "@/lib/youtube";
import { LineMatcher } from "@/components/LineMatcher";
import { Cover } from "@/components/Cover";
import { ArticleCard, ArticleRow } from "@/components/ArticleCard";
import { VideoCard } from "@/components/VideoCard";

export default async function Home() {
  const articles = getAllArticles();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const latest = articles.filter((a) => a.slug !== featured.slug && a.category !== "tips").slice(0, 4);
  const tips = articles.filter((a) => a.category === "tips").slice(0, 4);
  const videos = (await getVideos()).filter((_, i) => i % 2 === 0).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="chart-grid border-b border-rule">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <h1 className="display text-[clamp(3rem,8.5vw,6.6rem)]">
              Pick the right ship. Then sail it better.
            </h1>
            <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-ink-soft">
              Straight answers on Royal Caribbean, Carnival, Norwegian and MSC — what each line does best, what it
              costs, and how to get more from every day on board.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/articles/big-4-compared" className="rounded-full bg-ink px-6 py-3 font-semibold text-chart hover:bg-sea-strong">
                Compare the Big 4
              </Link>
              <Link href="/articles/first-cruise-playbook" className="rounded-full border border-ink px-6 py-3 font-semibold hover:bg-paper">
                First cruise? Start here
              </Link>
            </div>
          </div>
          <LineMatcher
            lines={bigFour.map(({ slug, name, color, tagline, scores }) => ({ slug, name, color, tagline, scores }))}
          />
        </div>
      </section>

      {/* Big 4 */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display text-4xl sm:text-5xl">The Big 4</h2>
          <Link href="/lines" className="font-semibold text-sea underline-offset-4 hover:underline">All line guides</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bigFour.map((l) => (
            <Link
              key={l.slug}
              href={`/lines/${l.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-rule bg-paper hover:border-ink-soft"
            >
              <div className="relative aspect-[4/3]">
                <Cover seed={`line-${l.slug}`} color={l.color} className="absolute inset-0 h-full w-full" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-2xl font-bold tracking-tight">{l.name}</h3>
                <p className="mt-1 font-serif text-lg italic text-ink-soft">{l.tagline}</p>
                <ul className="mt-4 space-y-1.5 text-[0.95rem]">
                  {l.bestFor.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: l.color }} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-5 font-semibold text-sea group-hover:underline underline-offset-4">
                  Read the {l.short} guide
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <h2 className="display text-4xl sm:text-5xl">Latest</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <ArticleCard a={featured} size="lg" />
          <div className="border-b border-rule">
            {latest.map((a) => (
              <ArticleRow key={a.slug} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Fleet watch */}
      <section className="mt-24 bg-ink py-16 text-chart">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-4xl sm:text-5xl">Fleet watch</h2>
            <p className="max-w-md text-chart/70">New ships, new islands, new rules. What&apos;s changed and what&apos;s coming across the Big 4.</p>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-chart/15 sm:grid-cols-2 lg:grid-cols-4">
            {bigFour.map((l) => (
              <li key={l.slug} className="bg-ink p-5">
                <p className="flex items-center gap-2 font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color, boxShadow: "0 0 0 2px rgba(255,255,255,.25)" }} aria-hidden />
                  {l.name}
                </p>
                <ul className="mt-4 space-y-4">
                  {l.newsWatch.slice(0, 3).map((n) => (
                    <li key={n.what}>
                      <p className="text-sm font-semibold text-signal">{n.when}</p>
                      <p className="mt-0.5 text-[0.95rem] leading-snug text-chart/85">{n.what}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display text-4xl sm:text-5xl">Tips that pay for themselves</h2>
          <Link href="/tips" className="hidden font-semibold text-sea underline-offset-4 hover:underline sm:block">All tips</Link>
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      </section>

      {/* Videos */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display text-4xl sm:text-5xl">Watch before you book</h2>
          <Link href="/videos" className="hidden font-semibold text-sea underline-offset-4 hover:underline sm:block">All videos</Link>
        </div>
        <p className="mt-3 max-w-2xl font-serif text-lg text-ink-soft">
          Hand-picked ship tours from creators we trust, with a note on why each is worth your time.
        </p>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {videos.map((v) => (
            <VideoCard key={v.id} v={v} />
          ))}
        </div>
      </section>

      {/* Niche */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="grid gap-8 rounded-3xl border border-rule bg-paper p-6 sm:p-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="display text-4xl">Beyond the Big 4</h2>
            <p className="mt-4 font-serif text-lg text-ink-soft">
              Adults-only, expedition, river-and-ocean, small sailing ships. Full guides are rolling out next.
            </p>
            <Link href="/niche" className="mt-6 inline-block rounded-full border border-ink px-5 py-2.5 font-semibold hover:bg-chart">
              Explore niche lines
            </Link>
          </div>
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {nicheLines.map((n) => (
              <li key={n.slug} className="flex items-baseline gap-3 border-t border-rule py-3.5">
                <span className="h-2.5 w-2.5 shrink-0 translate-y-[-1px] rounded-full" style={{ background: n.color }} aria-hidden />
                <span>
                  <span className="font-semibold">{n.name}</span>
                  <span className="block text-sm text-ink-soft">{n.vibe}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
