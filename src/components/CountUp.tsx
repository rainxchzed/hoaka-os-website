import { useEffect, useState } from 'react'
import { useInView } from '../lib/useInView'
import { useReducedMotion } from '../lib/useReducedMotion'

type Props = {
  /** The final figure, already formatted the way the locale wants it. */
  value: string
  duration?: number
  className?: string
}

const DIGITS = /\d/g

/**
 * Counts the numeric characters of `value` up to their final digits while leaving
 * separators and symbols in place, so a formatted figure animates without being
 * re-formatted here.
 */
export function CountUp({ value, duration = 1900, className }: Props) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLSpanElement>({ amount: 0.6 })
  const [shown, setShown] = useState(() => value.replace(DIGITS, '0'))

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setShown(value)
      return
    }

    const target = Number(value.replace(/\D/g, ''))
    if (!Number.isFinite(target) || target === 0) {
      setShown(value)
      return
    }

    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 4)
      const current = String(Math.round(target * eased)).padStart(
        String(target).length,
        '0',
      )

      let i = 0
      setShown(value.replace(DIGITS, () => current[i++] ?? '0'))

      if (p < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, value, duration])

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  )
}
