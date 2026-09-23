import type { CSSProperties } from 'react'

// Dictionary figures are display strings ("$1 500", "$241.66", "—"); a dash reads as zero.
export function amount(text: string) {
  const value = Number(text.replace(/[^\d.]/g, ''))
  return Number.isFinite(value) ? value : 0
}

export function share(value: number, max: number) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0
  return { '--share': `${(ratio * 100).toFixed(2)}%` } as CSSProperties
}
