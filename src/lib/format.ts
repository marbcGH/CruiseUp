export type Category = "guide" | "news" | "tips" | "comparison";

export const categoryLabels: Record<Category, string> = {
  guide: "Guide",
  news: "What's new",
  tips: "Tips",
  comparison: "Comparison",
};

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

export const formatDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
