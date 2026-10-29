"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";

export function Header() {
  const pathname = usePathname();
  // Menu is tied to the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "/" && !(e.target as HTMLElement).closest("input,textarea")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-chart/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Cruise Up home" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 md:flex">
          {site.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className="rounded-full px-3.5 py-1.5 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink aria-[current=page]:bg-ink aria-[current=page]:text-chart"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full border border-rule bg-paper px-3.5 text-sm text-ink-soft hover:border-ink-soft"
          >
            <Search className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-rule px-1.5 text-xs lg:inline">⌘K</kbd>
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-paper hover:text-ink"
          >
            <Sun className="hidden h-5 w-5 dark:block" aria-hidden />
            <Moon className="h-5 w-5 dark:hidden" aria-hidden />
          </button>
          <button
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-rule px-4 pb-5 pt-2 md:hidden">
          {site.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className="block border-b border-rule py-3.5 text-lg font-semibold aria-[current=page]:text-sea"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
