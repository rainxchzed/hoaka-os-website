type Props = { size?: number; withWordmark?: boolean; className?: string }

export function Logo({ size = 28, withWordmark = true, className }: Props) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55em' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        style={{ flex: 'none', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="hoaka-limb" x1="6" y1="26" x2="26" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="0.55" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" />
          </linearGradient>
          <mask id="hoaka-shadow">
            <rect width="32" height="32" fill="#fff" />
            <circle cx="20.6" cy="11.4" r="10.2" fill="#000" />
          </mask>
        </defs>
        <circle cx="16" cy="16" r="11.4" fill="url(#hoaka-limb)" mask="url(#hoaka-shadow)" />
        <circle
          cx="16"
          cy="16"
          r="14.6"
          stroke="currentColor"
          strokeOpacity="0.32"
          strokeWidth="1"
          strokeDasharray="3.2 4.4"
        />
      </svg>
      {withWordmark ? (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: `${size * 0.62}px`,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Hoaka<span data-os style={{ opacity: 0.55, fontWeight: 600 }}>&nbsp;OS</span>
        </span>
      ) : null}
    </span>
  )
}
