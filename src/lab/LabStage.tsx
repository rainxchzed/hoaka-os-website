import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import type { Lab } from './engine'
import type { MomentId } from './moments'
import styles from './LabStage.module.css'

type Nav = Navigator & { deviceMemory?: number }

function hasWebGL2() {
  try {
    return Boolean(document.createElement('canvas').getContext('webgl2'))
  } catch {
    return false
  }
}

export function LabStage({ moment }: { moment: MomentId }) {
  const { t } = useI18n()
  const hostRef = useRef<HTMLDivElement | null>(null)
  const labRef = useRef<Lab | null>(null)
  const momentRef = useRef(moment)
  const [state, setState] = useState<'idle' | 'live' | 'static'>('idle')

  useEffect(() => {
    momentRef.current = moment
    labRef.current?.setMoment(moment)
  }, [moment])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    if (!hasWebGL2()) {
      setState('static')
      return
    }

    let cancelled = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const lite =
          !window.matchMedia('(pointer: fine)').matches || ((navigator as Nav).deviceMemory ?? 8) < 8

        import('./engine')
          .then(({ createLab }) => createLab(host, { labels: t.day.labels, reduced, lite }))
          .then((lab) => {
            if (cancelled) {
              lab.dispose()
              return
            }
            labRef.current = lab
            lab.setMoment(momentRef.current)
            setState('live')
          })
          .catch((error: unknown) => {
            console.error('Hoaka lab: showing the still frame instead.', error)
            setState('static')
          })
      },
      { rootMargin: '100% 0px' },
    )
    observer.observe(host)

    return () => {
      cancelled = true
      observer.disconnect()
      labRef.current?.dispose()
      labRef.current = null
    }
  }, [t.day.labels])

  return <div ref={hostRef} className={styles.stage} data-state={state} aria-hidden="true" />
}
