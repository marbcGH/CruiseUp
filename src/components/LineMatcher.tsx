"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { dimensions, type Dimension } from "@/lib/lines";

type LineLite = {
  slug: string;
  name: string;
  color: string;
  tagline: string;
  scores: Record<Dimension, number>;
};

export function LineMatcher({ lines }: { lines: LineLite[] }) {
  const [picked, setPicked] = useState<Dimension[]>(["value", "families"]);

  const ranked = useMemo(() => {
    return lines
      .map((l) => {
        const fit = picked.length
          ? picked.reduce((s, d) => s + l.scores[d], 0) / (picked.length * 5)
          : null;
        return { ...l, fit };
      })
      .sort((a, b) => (b.fit ?? 0) - (a.fit ?? 0));
  }, [lines, picked]);

  const toggle = (d: Dimension) =>
    setPicked((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));

  return (
    <div className="rounded-3xl border border-rule bg-paper p-5 shadow-[0_1px_0_var(--rule),0_24px_60px_-30px_rgba(14,42,71,0.35)] sm:p-7">
      <h2 className="text-xl font-bold tracking-tight">Find your line</h2>
      <p className="mt-1 text-sm text-ink-soft">Pick what matters on this trip. The Big 4 re-rank as you go.</p>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Trip priorities">
        {dimensions.map((d) => {
          const on = picked.includes(d.id);
          return (
            <button
              key={d.id}
              type="button"
              aria-pressed={on}
              title={d.hint}
              onClick={() => toggle(d.id)}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                on
                  ? "border-signal bg-signal text-signal-ink"
                  : "border-rule text-ink-soft hover:border-ink-soft hover:text-ink"
              }`}
            >
              {on && <Check className="h-3.5 w-3.5" aria-hidden />}
              {d.label}
            </button>
          );
        })}
      </div>

      <ol className="mt-6 space-y-2.5" aria-live="polite">
        {ranked.map((l, i) => (
          <li key={l.slug}>
            <Link
              href={`/lines/${l.slug}`}
              className="group grid grid-cols-[1.5rem_1fr_auto] items-center gap-x-3 rounded-2xl px-3 py-3 hover:bg-chart"
            >
              <span className="text-sm font-semibold text-ink-soft tabular-nums">{i + 1}</span>
              <span className="min-w-0">
                <span className="block font-semibold leading-tight group-hover:underline">{l.name}</span>
                <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-chart group-hover:bg-paper">
                  <span
                    className="block h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{ width: `${Math.round((l.fit ?? 0) * 100)}%`, background: l.color }}
                  />
                </span>
              </span>
              <span className="w-16 text-right text-sm font-semibold tabular-nums">
                {l.fit === null ? "—" : `${Math.round(l.fit * 100)}% fit`}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-ink-soft">
        Fit scores are our editors&apos; ratings, not paid placements.{" "}
        <Link href="/about#scores" className="underline underline-offset-2">How we score</Link>
      </p>
    </div>
  );
}
