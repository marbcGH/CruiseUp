import type { Metadata } from "next";
import Link from "next/link";
import { bigFour, dimensions } from "@/lib/lines";
import { Cover } from "@/components/Cover";

export const metadata: Metadata = {
  title: "Cruise line guides",
  description: "Honest, side-by-side guides to Royal Caribbean, Carnival, Norwegian and MSC: who each line is for, the ships, private islands and loyalty programs.",
};

export default function LinesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="display text-5xl sm:text-7xl">Cruise line guides</h1>
      <p className="mt-5 max-w-2xl font-serif text-xl text-ink-soft">
        The four biggest lines carry most North American cruisers. Here&apos;s how they stack up, and who each one is really for.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {bigFour.map((l) => (
          <Link key={l.slug} href={`/lines/${l.slug}`} className="group grid overflow-hidden rounded-3xl border border-rule bg-paper hover:border-ink-soft sm:grid-cols-[0.9fr_1.1fr]">
            <Cover seed={`line-${l.slug}`} color={l.color} className="h-48 w-full sm:h-full" />
            <div className="p-6">
              <h2 className="text-2xl font-bold tracking-tight group-hover:underline underline-offset-4">{l.name}</h2>
              <p className="mt-1 font-serif text-lg italic text-ink-soft">{l.tagline}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed">{l.summary}</p>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="display text-4xl">At a glance</h2>
        <p className="mt-2 text-ink-soft">Our editors&apos; ratings out of 5.</p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-rule bg-paper">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b-2 border-ink">
                <th className="p-4 font-semibold">What you care about</th>
                {bigFour.map((l) => (
                  <th key={l.slug} className="p-4 font-semibold">
                    <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ background: l.color }} aria-hidden />
                    {l.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dimensions.map((d) => {
                const max = Math.max(...bigFour.map((l) => l.scores[d.id]));
                return (
                  <tr key={d.id} className="border-b border-rule last:border-0">
                    <th scope="row" className="p-4 font-medium">
                      {d.label}
                      <span className="block text-sm font-normal text-ink-soft">{d.hint}</span>
                    </th>
                    {bigFour.map((l) => {
                      const s = l.scores[d.id];
                      return (
                        <td key={l.slug} className="p-4">
                          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold tabular-nums ${s === max ? "bg-signal text-signal-ink" : "bg-chart"}`}>
                            {s}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
