# Cruise Up

Independent cruise guides, tips and curated ship-tour videos. Next.js 16 (App Router, Cache Components) + Tailwind CSS 4 + MDX.

## Review locally

One-time setup (Node 22+):

```bash
git clone https://github.com/marbcGH/CruiseUp.git
cd CruiseUp
npm install
git checkout dev
npm run dev        # http://localhost:3000 — hot-reloads as files change
```

Each iteration:

```bash
git pull           # grab the latest changes; the dev server reloads automatically
npm install        # only if package.json changed
```

## Branches

- `dev` — work in progress. Every push gets a protected Vercel preview URL.
- `main` — production. Merge `dev` → `main` when an iteration is approved.

## Where things live

| What | Where |
| --- | --- |
| Articles (MDX + frontmatter) | `content/articles/*.mdx` |
| Big 4 + niche line data, editorial scores | `src/lib/lines.ts` |
| Curated YouTube videos | `src/lib/videos.ts` |
| Site name / nav / URL | `src/lib/site.ts` |
| Design tokens (colors, type) | `src/app/globals.css` |

### Writing an article

Create `content/articles/my-slug.mdx`:

```mdx
---
title: "Headline"
description: "One-sentence summary used on cards and in search results."
date: 2026-10-29
category: tips        # guide | news | tips | comparison
lines: [carnival]     # royal-caribbean | carnival | norwegian | msc
featured: false
---

Body in Markdown. Components available:

<Callout type="tip|warn|money" title="Optional">Text</Callout>
<Video id="YOUTUBE_ID" title="Video title" credit="Channel" creditUrl="https://youtube.com/@channel" />
<Verdict>Bottom line.</Verdict>
```

### Video policy

Videos only play through YouTube's official privacy-enhanced embed, load on click, credit the creator, and carry our own commentary. Titles and creator names are pulled from YouTube oEmbed at build time; removed or embed-disabled videos drop off automatically.

## Deploy

1. Push to GitHub.
2. Import the repo in Vercel (framework auto-detected, no config needed).
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (used for sitemap, RSS, canonical URLs).
