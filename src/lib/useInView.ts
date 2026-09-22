import { useEffect, useRef, useState } from 'react'

type Options = {
  /** Fraction of the element that must be visible before it counts. */
  amount?: number
  /** Keep the `true` once reached, which is what reveal animations want. */
  once?: boolean
  rootMargin?: string
}

export function useInView<T extends HTMLElement>({
  amount = 0.25,
  once = true,
  rootMargin = '0px 0px -8% 0px',
}: Options = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold: amount, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [amount, once, rootMargin])

  return { ref, inView }
}
