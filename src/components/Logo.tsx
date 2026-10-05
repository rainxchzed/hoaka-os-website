type Props = { size?: number; withWordmark?: boolean; className?: string }

const MARK_WIDTH = 25
const MARK_HEIGHT = 31
const MARK_PATH = 'M0 0h11v31H0zM13 0h12v31h-4V13h-8zm4 4v5h4V4z'

export function Logo({ size = 28, withWordmark = true, className }: Props) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55em' }}
    >
      <svg
        width={(size * MARK_WIDTH) / MARK_HEIGHT}
        height={size}
        viewBox={`0 0 ${MARK_WIDTH} ${MARK_HEIGHT}`}
        aria-hidden="true"
        style={{ flex: 'none' }}
      >
        <path d={MARK_PATH} fill="currentColor" fillRule="evenodd" />
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
          Hoaka<span style={{ opacity: 0.55, fontWeight: 600 }}>&nbsp;OS</span>
        </span>
      ) : null}
    </span>
  )
}
