import { getAllArticles, categoryLabels } from "@/lib/content";
import { bigFour, nicheLines } from "@/lib/lines";

export function GET() {
  const items = [
    ...bigFour.map((l) => ({
      title: `${l.name} guide`,
      description: `${l.tagline} ${l.summary} ${l.classes.flatMap((c) => c.ships).join(" ")} ${l.privateDestinations.map((p) => p.name).join(" ")}`,
      href: `/lines/${l.slug}`,
      kind: "Cruise line",
    })),
    ...getAllArticles().map((a) => ({
      title: a.title,
      description: a.description,
      href: `/articles/${a.slug}`,
      kind: categoryLabels[a.category],
    })),
    ...nicheLines.map((n) => ({ title: n.name, description: `${n.vibe}. ${n.summary}`, href: "/niche", kind: "Niche line" })),
    { title: "Videos", description: "Ship tours and private island walkthroughs", href: "/videos", kind: "Page" },
  ];
  return Response.json(items);
}
