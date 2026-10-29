"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

type Item = { title: string; description: string; href: string; kind: string };

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      if (!items.length) {
        fetch("/search.json")
          .then((r) => r.json())
          .then(setItems)
          .catch(() => {});
      }
    }
    if (!open && d.open) d.close();
  }, [open, items.length]);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items.slice(0, 8);
    return items
      .map((it) => {
        const hay = `${it.title} ${it.description} ${it.kind}`.toLowerCase();
        const score = terms.reduce(
          (s, t) => s + (it.title.toLowerCase().includes(t) ? 3 : 0) + (hay.includes(t) ? 1 : 0),
          0,
        );
        return { it, score, all: terms.every((t) => hay.includes(t)) };
      })
      .filter((r) => r.all)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.it);
  }, [q, items]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-0 mx-auto mt-[10vh] w-[min(640px,calc(100vw-2rem))] rounded-2xl border border-rule bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const r = results[active];
          if (r) {
            window.location.href = r.href;
          }
        }}
        className="flex items-center gap-3 border-b border-rule px-5"
      >
        <Search className="h-5 w-5 text-ink-soft" aria-hidden />
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            }
          }}
          placeholder="Search ships, lines, tips…"
          aria-label="Search Cruise Up"
          className="h-14 flex-1 bg-transparent text-lg outline-none placeholder:text-ink-soft"
        />
        <kbd className="rounded border border-rule px-1.5 text-xs text-ink-soft">esc</kbd>
      </form>
      <ul className="max-h-[60vh] overflow-y-auto p-2" role="listbox" aria-label="Results">
        {results.map((r, i) => (
          <li key={r.href} role="option" aria-selected={i === active}>
            <Link
              href={r.href}
              onClick={onClose}
              onMouseEnter={() => setActive(i)}
              className={`block rounded-xl px-4 py-3 ${i === active ? "bg-chart" : ""}`}
            >
              <span className="text-xs font-medium text-sea">{r.kind}</span>
              <span className="block font-semibold">{r.title}</span>
              <span className="line-clamp-1 text-sm text-ink-soft">{r.description}</span>
            </Link>
          </li>
        ))}
        {q && !results.length && (
          <li className="px-4 py-8 text-center text-ink-soft">
            No matches for “{q}”. Try a ship name, a line, or a topic like “drink package”.
          </li>
        )}
      </ul>
    </dialog>
  );
}
