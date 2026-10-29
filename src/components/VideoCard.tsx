import type { ResolvedVideo } from "@/lib/youtube";
import { bigFour } from "@/lib/lines";
import { YouTube } from "./YouTube";

export function VideoCard({ v }: { v: ResolvedVideo }) {
  const line = bigFour.find((l) => l.slug === v.line);
  return (
    <figure>
      <YouTube id={v.id} title={v.title} />
      <figcaption className="mt-3">
        <p className="text-sm text-ink-soft">
          {line ? <span style={{ color: line.color }} className="font-semibold dark:brightness-150">{line.short}</span> : null}
          {line ? <span aria-hidden> / </span> : null}
          {v.topic}
        </p>
        <p className="mt-1 font-semibold leading-snug">{v.title}</p>
        <p className="mt-1.5 font-serif text-[1.02rem] leading-relaxed text-ink-soft">{v.why}</p>
        <p className="mt-2 text-sm text-ink-soft">
          Video by{" "}
          {v.authorUrl ? (
            <a href={v.authorUrl} target="_blank" rel="noopener" className="font-medium text-sea underline underline-offset-2">
              {v.author}
            </a>
          ) : (
            <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener" className="font-medium text-sea underline underline-offset-2">
              its creator on YouTube
            </a>
          )}
        </p>
      </figcaption>
    </figure>
  );
}
