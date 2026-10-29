import { getAllArticles } from "@/lib/content";
import { site } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getAllArticles()
    .map(
      (a) => `<item><title>${esc(a.title)}</title><link>${site.url}/articles/${a.slug}</link><guid>${site.url}/articles/${a.slug}</guid><pubDate>${new Date(`${a.date}T12:00:00Z`).toUTCString()}</pubDate><description>${esc(a.description)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${site.name}</title><link>${site.url}</link><description>${esc(site.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
