export function GoldenArc({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 24"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        className="arc-path"
        d="M6 6 C 60 26, 240 26, 294 6"
        stroke="#C69A5B"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BasketMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 11 C 6 18, 18 18, 20 11"
        stroke="#C69A5B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8 11 C 8 6, 16 6, 16 11"
        stroke="#C69A5B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
