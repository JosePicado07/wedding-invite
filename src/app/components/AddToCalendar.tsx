export default function AddToCalendar() {
  return (
    <a
      href="/calendario.ics"
      className="flex items-center gap-3 text-left group"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--terracotta)] flex-none"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <path d="M12 14v4" />
        <path d="M10 16h4" />
      </svg>
      <span className="flex flex-col gap-0.5">
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--terracotta)] font-medium">
          Guarda la fecha
        </span>
        <span className="font-display italic text-[var(--muted-ink)] text-sm leading-none group-hover:text-[var(--accent)] transition-colors duration-200">
          Agregar a mi calendario
        </span>
      </span>
    </a>
  )
}
