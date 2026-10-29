import type { Metadata } from "next";
import { nicheLines } from "@/lib/lines";
import { Cover } from "@/components/Cover";

export const metadata: Metadata = {
  title: "Niche & specialty cruise lines",
  description: "Adults-only, luxury, expedition and small-ship cruise lines worth knowing beyond the Big 4.",
};

export default function NichePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="display text-5xl sm:text-7xl">Beyond the Big 4</h1>
      <p className="mt-5 max-w-2xl font-serif text-xl text-ink-soft">
        Smaller ships, bigger price tags, sharper personalities. A first look at the specialty lines. Full guides are on the way.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {nicheLines.map((n) => (
          <article key={n.slug} className="flex flex-col overflow-hidden rounded-3xl border border-rule bg-paper">
            <Cover seed={`niche-${n.slug}`} color={n.color} ship={false} className="aspect-[16/10] w-full" />
            <div className="flex flex-1 flex-col p-5">
              <p className="text-sm font-medium text-ink-soft">{n.vibe}</p>
              <h2 className="mt-1 text-xl font-bold tracking-tight">{n.name}</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed">{n.summary}</p>
              <p className="mt-auto pt-4 text-sm"><span className="font-semibold">Best for:</span> <span className="text-ink-soft">{n.bestFor}</span></p>
              <p className="mt-3 inline-flex w-fit rounded-full bg-chart px-3 py-1 text-xs font-medium text-ink-soft">Full guide coming</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
