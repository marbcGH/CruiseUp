import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bigFour, dimensions, getLine } from "@/lib/lines";
import { getAllArticles, formatDate } from "@/lib/content";
import { getVideos } from "@/lib/youtube";
import type { Video } from "@/lib/videos";
import { Cover } from "@/components/Cover";
import { ArticleRow } from "@/components/ArticleCard";
import { VideoCard } from "@/components/VideoCard";

export function generateStaticParams() {
  return bigFour.map((l) => ({ slug: l.slug }));
}

export const ensureStatic = "navigation";

export async function generateMetadata({ params }: PageProps<"/lines/[slug]">): Promise<Metadata> {
  const l = getLine((await params).slug);
  if (!l) return {};
  return { title: `${l.name} guide`, description: l.summary };
}

export default async function LinePage({ params }: PageProps<"/lines/[slug]">) {
  const l = getLine((await params).slug);
  if (!l) notFound();
  const articles = getAllArticles().filter((a) => a.lines.includes(l.slug));
  const videos = await getVideos(l.slug as Video["line"]);

  return (
    <article>
      <header className="relative isolate overflow-hidden">
        <Cover seed={`line-${l.slug}`} color={l.color} className="absolute inset-0 -z-10 h-full w-full" label={`Illustration for ${l.name}`} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#06121f]/85 via-[#06121f]/35 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-40 text-white sm:px-6 sm:pt-56">
          <p className="font-medium text-white/80"><Link href="/lines" className="hover:underline">Cruise lines</Link> / {l.short}</p>
          <h1 className="display mt-3 text-5xl sm:text-8xl">{l.name}</h1>
          <p className="mt-3 font-serif text-2xl italic text-white/90">{l.tagline}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <p className="max-w-[60ch] font-serif text-2xl leading-relaxed">{l.summary}</p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-rule bg-paper p-5">
              <h2 className="font-semibold">Great for</h2>
              <ul className="mt-3 space-y-2">
                {l.bestFor.map((b) => <li key={b} className="flex gap-2"><span className="text-sea" aria-hidden>+</span>{b}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-rule bg-paper p-5">
              <h2 className="font-semibold">Think twice if</h2>
              <ul className="mt-3 space-y-2">
                {l.notFor.map((b) => <li key={b} className="flex gap-2"><span className="text-ink-soft" aria-hidden>–</span>{b}</li>)}
              </ul>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="display text-4xl">The fleet</h2>
            <div className="mt-6 divide-y divide-rule border-y border-rule">
              {l.classes.map((c) => (
                <div key={c.name} className="grid gap-2 py-5 sm:grid-cols-[200px_1fr]">
                  <h3 className="font-bold">{c.name}</h3>
                  <div>
                    <p>{c.ships.join(", ")}</p>
                    {c.note && <p className="mt-1 text-sm text-ink-soft">{c.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="display text-4xl">Private islands & beach clubs</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {l.privateDestinations.map((p) => (
                <div key={p.name} className="rounded-2xl border border-rule bg-paper p-5">
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="mt-1.5 text-ink-soft">{p.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="display text-4xl">Insider tips</h2>
            <ol className="mt-6 space-y-5">
              {l.insiderTips.map((t, i) => (
                <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-signal font-bold text-signal-ink">{i + 1}</span>
                  <p className="pt-1 font-serif text-lg leading-relaxed">{t}</p>
                </li>
              ))}
            </ol>
          </section>

          {videos.length > 0 && (
            <section className="mt-16">
              <h2 className="display text-4xl">Watch</h2>
              <div className="mt-6 grid gap-10 sm:grid-cols-2">
                {videos.map((v) => <VideoCard key={v.id} v={v} />)}
              </div>
            </section>
          )}

          {articles.length > 0 && (
            <section className="mt-16">
              <h2 className="display text-4xl">{l.short} articles</h2>
              <div className="mt-4 border-b border-rule">
                {articles.map((a) => <ArticleRow key={a.slug} a={a} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-rule bg-paper p-6">
            <h2 className="font-bold">Quick facts</h2>
            <dl className="mt-4 space-y-3">
              {l.quickFacts.map((f) => (
                <div key={f.label}>
                  <dt className="text-sm text-ink-soft">{f.label}</dt>
                  <dd className="font-medium">{f.value}</dd>
                </div>
              ))}
              <div>
                <dt className="text-sm text-ink-soft">{l.loyalty.name}</dt>
                <dd className="text-[0.95rem]">{l.loyalty.note}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-3xl border border-rule bg-paper p-6">
            <h2 className="font-bold">Our ratings</h2>
            <ul className="mt-4 space-y-3">
              {dimensions.map((d) => (
                <li key={d.id}>
                  <div className="flex justify-between text-sm"><span>{d.label}</span><span className="font-semibold tabular-nums">{l.scores[d.id]}/5</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-chart">
                    <div className="h-full rounded-full" style={{ width: `${l.scores[d.id] * 20}%`, background: l.color }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-rule bg-paper p-6">
            <h2 className="font-bold">Fleet watch</h2>
            <ul className="mt-4 space-y-4">
              {l.newsWatch.map((n) => (
                <li key={n.what}>
                  <p className="text-sm font-semibold text-sea">{n.when}</p>
                  <p className="text-[0.95rem] leading-snug">{n.what}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="px-2 text-sm text-ink-soft">
            Last reviewed {formatDate(l.lastReviewed)}. Confirm details on the <a href={l.officialSite} target="_blank" rel="noopener" className="text-sea underline">official {l.short} site</a> before booking.
          </p>
        </aside>
      </div>
    </article>
  );
}
