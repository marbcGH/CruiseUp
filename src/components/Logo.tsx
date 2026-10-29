export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="var(--ink)" />
      <path d="M8 18a8 8 0 0 1 16 0z" fill="var(--signal)" />
      <path d="M6 21.5c2.5-1.6 4.5-1.6 7 0s4.5 1.6 7 0 4.5-1.6 6 0" stroke="var(--chart)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M6 25.5c2.5-1.6 4.5-1.6 7 0s4.5 1.6 7 0 4.5-1.6 6 0" stroke="var(--chart)" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="display text-[1.45rem] leading-none">Cruise Up</span>
    </span>
  );
}
