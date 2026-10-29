import type { Metadata } from "next";
import Link from "next/link";
import { bigFour } from "@/lib/lines";
import { getVideos } from "@/lib/youtube";
import { VideoCard } from "@/components/VideoCard";

export const metadata: Metadata = {
  title: "Cruise ship videos",
  description: "Hand-picked ship tours and private island walkthroughs for the Big 4 cruise lines, credited to their creators.",
};

export default async function VideosPage() {
  const all = await getVideos();
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="display text-5xl sm:text-7xl">Watch before you book</h1>
      <p className="mt-5 max-w-2xl font-serif text-xl text-ink-soft">
        Ship tours and island walkthroughs from independent creators, each with our note on why it&apos;s worth watching.
        Videos play from YouTube and nothing loads until you press play.
      </p>
      {bigFour.map((l) => {
        const vs = all.filter((v) => v.line === l.slug);
        if (!vs.length) return null;
        return (
          <section key={l.slug} className="mt-16">
            <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
              <span className="h-3 w-3 rounded-full" style={{ background: l.color }} aria-hidden />
              {l.name}
            </h2>
            <div className="mt-6 grid gap-10 md:grid-cols-2">
              {vs.map((v) => <VideoCard key={v.id} v={v} />)}
            </div>
          </section>
        );
      })}
      <p className="mt-16 max-w-2xl text-sm text-ink-soft">
        Videos belong to their creators and are shown with YouTube&apos;s official embedded player. If you&apos;re a creator and
        want a video added or removed, see <Link href="/about#videos" className="text-sea underline">how we use videos</Link>.
      </p>
    </div>
  );
}
