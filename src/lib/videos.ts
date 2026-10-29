/**
 * Curated YouTube videos.
 *
 * How we stay on the right side of copyright:
 * - We only use YouTube's official embedded player (youtube-nocookie.com),
 *   which YouTube's Terms of Service allow when the uploader has embedding on.
 *   We never download, re-upload, clip or re-host anyone's video.
 * - Every card credits the creator and links to their channel.
 * - Every pick carries our own original commentary ("why watch").
 * - Title and creator come live from YouTube's oEmbed API at build time
 *   (see lib/youtube.ts). If a video is removed or embedding is disabled,
 *   it drops off the site automatically.
 *
 * `fallbackTitle` is only used if oEmbed is unreachable during a build.
 */

export type Video = {
  id: string;
  line: "royal-caribbean" | "carnival" | "norwegian" | "msc" | "general";
  topic: string;
  fallbackTitle: string;
  why: string;
};

export const videos: Video[] = [
  {
    id: "OVn2u764X4Y",
    line: "royal-caribbean",
    topic: "Ship tour",
    fallbackTitle: "Icon of the Seas Full Ship Tour 2026",
    why: "A recent deck-by-deck walk-through, so you can see the Icon-class neighborhoods before choosing a cabin location.",
  },
  {
    id: "oOTIDNuLdjA",
    line: "royal-caribbean",
    topic: "Ship tour",
    fallbackTitle: "Icon of the Seas Ship Tour: Every Deck, Venue & Neighborhood (2026)",
    why: "Useful as a reference: it maps every venue to its deck, which helps when you're planning where to be on day one.",
  },
  {
    id: "aH_BcbrTGAk",
    line: "carnival",
    topic: "Private destination",
    fallbackTitle: "Touring Celebration Key: Carnival's Newest Private Destination",
    why: "Shows the walking distances between the pier and each lagoon, which matters if you're traveling with little kids or limited mobility.",
  },
  {
    id: "_WZ13IVyPHs",
    line: "carnival",
    topic: "Private destination",
    fallbackTitle: "Carnival's Celebration Key – Full Walking Tour + Food Menus, Pearl Cove",
    why: "Covers menus and what Pearl Cove Beach Club adds, so you can judge whether the upcharge is worth it for you.",
  },
  {
    id: "iqtpi253CGo",
    line: "norwegian",
    topic: "Ship tour",
    fallbackTitle: "Norwegian Aqua Official Ship Tour",
    why: "The polished official overview. Watch it alongside an independent tour to see what's marketing and what's real.",
  },
  {
    id: "_cZFVLCMzIw",
    line: "norwegian",
    topic: "Ship tour",
    fallbackTitle: "Norwegian Aqua: Full Ship Tour & Walkthrough",
    why: "An independent walkthrough of NCL's Prima Plus design — the best preview of what sister ship Norwegian Luna feels like too.",
  },
  {
    id: "nWk_-w6NxMU",
    line: "msc",
    topic: "Ship tour",
    fallbackTitle: "MSC World America – Full Ship Tour",
    why: "MSC's first World-class ship built for US cruisers. Good for seeing the seven districts layout before you book.",
  },
  {
    id: "X2t-pEzXaWA",
    line: "msc",
    topic: "Ship tour",
    fallbackTitle: "MSC World America: Full Ship Tour in 4K",
    why: "High-resolution and calm-paced, the best way to look closely at cabins and the Yacht Club areas.",
  },
];
