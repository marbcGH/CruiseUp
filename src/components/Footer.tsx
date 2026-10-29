import Link from "next/link";
import { site } from "@/lib/site";
import { bigFour } from "@/lib/lines";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-ink-soft">{site.tagline} Independent, reader-first, and not affiliated with any cruise line.</p>
        </div>
        <div>
          <h2 className="font-semibold">The Big 4</h2>
          <ul className="mt-3 space-y-2 text-ink-soft">
            {bigFour.map((l) => (
              <li key={l.slug}>
                <Link className="hover:text-ink" href={`/lines/${l.slug}`}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Explore</h2>
          <ul className="mt-3 space-y-2 text-ink-soft">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link className="hover:text-ink" href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Cruise Up</h2>
          <ul className="mt-3 space-y-2 text-ink-soft">
            <li><Link className="hover:text-ink" href="/about">About & editorial policy</Link></li>
            <li><Link className="hover:text-ink" href="/about#videos">How we use videos</Link></li>
            <li><a className="hover:text-ink" href="/rss.xml">RSS feed</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <p className="mx-auto max-w-7xl px-4 py-5 text-sm text-ink-soft sm:px-6">
          © Cruise Up. Cruise line names and ship names are trademarks of their respective owners and are used for identification only. Prices and policies change often — always confirm with the cruise line before booking.
        </p>
      </div>
    </footer>
  );
}
