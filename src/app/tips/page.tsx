import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Cruise tips & best practices",
  description: "Practical cruise tips: booking, cabins, drink packages, embarkation day and saving money on board.",
};

const quick = [
  { t: "Fly in the day before", d: "Ships don't wait for delayed flights. A hotel night costs less than a missed cruise." },
  { t: "Pack a carry-on for day one", d: "Checked bags can take until dinner to reach your cabin. Keep swimwear, meds and documents with you." },
  { t: "Bring a magnetic hook or two", d: "Cabin walls are steel. Hooks add instant storage for hats, lanyards and bags." },
  { t: "Turn off cellular at sea", d: "Ships run maritime cell networks that can bill at roaming rates. Use airplane mode plus ship Wi-Fi." },
  { t: "Check gratuities before you tip twice", d: "Daily service charges are usually added automatically, and drink packages often add their own." },
  { t: "Watch the price after you book", d: "If the fare drops before final payment, many lines will reprice or give credit. Ask." },
];

export default function TipsPage() {
  const tips = getAllArticles().filter((a) => a.category === "tips" || a.category === "comparison");
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="display text-5xl sm:text-7xl">Tips & best practices</h1>
      <p className="mt-5 max-w-2xl font-serif text-xl text-ink-soft">The small decisions that make the biggest difference to your trip and your bill.</p>

      <section className="mt-12 rounded-3xl bg-ink p-6 text-chart sm:p-10">
        <h2 className="text-2xl font-bold">Six rules we never break</h2>
        <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {quick.map((q) => (
            <li key={q.t} className="border-t border-chart/20 pt-4">
              <p className="font-semibold text-signal">{q.t}</p>
              <p className="mt-1 text-chart/80">{q.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="display text-4xl">Deep dives</h2>
        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((a) => <ArticleCard key={a.slug} a={a} />)}
        </div>
      </section>

      <p className="mt-16 text-ink-soft">
        Looking for line-specific advice? Every <Link href="/lines" className="text-sea underline">cruise line guide</Link> has its own insider tips.
      </p>
    </div>
  );
}
