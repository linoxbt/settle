export default function SettleLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Icon mark — teal rounded square with bidirectional payment arrows */}
      <svg
        width="30" height="30"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <rect width="36" height="36" rx="7" fill="var(--accent)" />
        {/* Arrow → (outbound payment) */}
        <line x1="8" y1="13.5" x2="22" y2="13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <polyline points="19,9.5 23.5,13.5 19,17.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Arrow ← (settlement) */}
        <line x1="28" y1="22.5" x2="14" y2="22.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <polyline points="17,18.5 12.5,22.5 17,26.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      {/* Wordmark */}
      <span
        className="text-[var(--text-1)] font-semibold leading-none select-none"
        style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "18px", letterSpacing: "-0.03em" }}
      >
        settle
      </span>
    </div>
  )
}
