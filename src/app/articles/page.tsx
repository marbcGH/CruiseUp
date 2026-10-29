import type { Metadata } from "next";
import { getAllArticles, categoryLabels, type Category } from "@/lib/content";
import { bigFour } from "@/lib/lines";
import { ArticleBrowser } from "@/components/ArticleBrowser";

export const metadata: Metadata = {
  title: "Articles",
  description: "Cruise line guides, what's new, comparisons and practical tips from Cruise Up.",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="display text-5xl sm:text-7xl">Articles</h1>
      <p className="mt-5 max-w-2xl font-serif text-xl text-ink-soft">Guides, news that actually affects your trip, and the tips we wish we&apos;d known sooner.</p>
      <ArticleBrowser
        articles={getAllArticles()}
        lines={bigFour.map((l) => ({ slug: l.slug, short: l.short }))}
        categories={(Object.keys(categoryLabels) as Category[]).map((id) => ({ id, label: categoryLabels[id] }))}
      />
    </div>
  );
}
