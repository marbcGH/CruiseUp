export const site = {
  name: "Cruise Up",
  tagline: "Smarter cruise planning, line by line.",
  description:
    "Independent guides, tips and ship tours for Royal Caribbean, Carnival, Norwegian, MSC and the niche lines worth knowing. Built to help you pick the right ship and get more out of every sailing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cruiseup.vercel.app",
  nav: [
    { href: "/lines", label: "Cruise lines" },
    { href: "/articles", label: "Articles" },
    { href: "/tips", label: "Tips" },
    { href: "/videos", label: "Videos" },
    { href: "/niche", label: "Niche lines" },
  ],
} as const;
