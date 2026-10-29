import { cacheLife } from "next/cache";
import { videos, type Video } from "./videos";

export type ResolvedVideo = Video & {
  title: string;
  author: string | null;
  authorUrl: string | null;
};

async function oembed(id: string) {
  "use cache";
  cacheLife("days");
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
      { signal: AbortSignal.timeout(4000) },
    );
    if (res.status === 401 || res.status === 403 || res.status === 404) {
      return { removed: true as const };
    }
    if (!res.ok) return null;
    const d = (await res.json()) as { title: string; author_name: string; author_url: string };
    return { removed: false as const, title: d.title, author: d.author_name, authorUrl: d.author_url };
  } catch {
    return null; // offline build: fall back to curated data
  }
}

export async function getVideos(filter?: Video["line"]): Promise<ResolvedVideo[]> {
  const list = filter ? videos.filter((v) => v.line === filter) : videos;
  const resolved = await Promise.all(
    list.map(async (v) => {
      const meta = await oembed(v.id);
      if (meta?.removed) return null; // deleted or embedding disabled
      return {
        ...v,
        title: meta?.title ?? v.fallbackTitle,
        author: meta?.author ?? null,
        authorUrl: meta?.authorUrl ?? null,
      };
    }),
  );
  return resolved.filter((v): v is ResolvedVideo => v !== null);
}
