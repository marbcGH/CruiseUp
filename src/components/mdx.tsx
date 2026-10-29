import type { ReactNode } from "react";
import { Lightbulb, TriangleAlert, Wallet } from "lucide-react";
import { slugify } from "@/lib/format";
import { YouTube } from "./YouTube";

const callouts = {
  tip: { Icon: Lightbulb, label: "Pro tip", cls: "border-sea/40 bg-sea/8" },
  warn: { Icon: TriangleAlert, label: "Watch out", cls: "border-signal bg-signal/12" },
  money: { Icon: Wallet, label: "Money move", cls: "border-ink/25 bg-ink/5" },
};

function Callout({ type = "tip", title, children }: { type?: keyof typeof callouts; title?: string; children: ReactNode }) {
  const { Icon, label, cls } = callouts[type];
  return (
    <aside className={`not-prose my-8 rounded-2xl border-l-4 px-5 py-4 font-display text-base leading-relaxed ${cls}`}>
      <p className="flex items-center gap-2 font-semibold">
        <Icon className="h-4 w-4" aria-hidden />
        {title ?? label}
      </p>
      <div className="mt-1.5 text-ink [&_a]:text-sea [&_a]:underline [&>p+p]:mt-2">{children}</div>
    </aside>
  );
}

function Verdict({ children }: { children: ReactNode }) {
  return (
    <aside className="my-10 rounded-3xl bg-ink px-6 py-6 font-display text-chart sm:px-8">
      <p className="text-sm font-semibold text-signal">The bottom line</p>
      <div className="mt-2 text-lg leading-relaxed [&>p+p]:mt-3">{children}</div>
    </aside>
  );
}

function Video({ id, title, credit, creditUrl }: { id: string; title: string; credit?: string; creditUrl?: string }) {
  return (
    <figure className="my-10">
      <YouTube id={id} title={title} />
      <figcaption className="mt-2 font-display text-sm text-ink-soft">
        {title}
        {credit && (
          <>
            {" "}— video by{" "}
            {creditUrl ? <a href={creditUrl} target="_blank" rel="noopener">{credit}</a> : credit}
          </>
        )}
      </figcaption>
    </figure>
  );
}

function H2({ children }: { children?: ReactNode }) {
  const text = typeof children === "string" ? children : String(children);
  return <h2 id={slugify(text)}>{children}</h2>;
}

export const mdxComponents = { Callout, Verdict, Video, h2: H2 };
