import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useSmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null
    let frame = 0
    let cancelled = false

    void import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      const instance = new Lenis({ lerp: 0.14, wheelMultiplier: 1.15, touchMultiplier: 1.5 })
      lenis = instance

      const tick = (time: number) => {
        instance.raf(time)
        frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      lenis?.destroy()
    }
  }, [reduced])
}
