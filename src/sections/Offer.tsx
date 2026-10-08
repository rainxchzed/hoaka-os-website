import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useI18n } from '../i18n'
import { Button } from '../components/Button'
import styles from './Offer.module.css'

const DAYS = 13
const PHASES = ['install', 'use', 'decide'] as const

function phaseOf(day: number) {
  if (day === 0) return 'install'
  return day === DAYS - 1 ? 'decide' : 'use'
}

export function Offer() {
  const { t, href } = useI18n()
  const o = t.offer
  const strip = useRef<HTMLOListElement | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = strip.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setSeen(true)
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="offer" className={`section ${styles.offer}`}>
      <div className={`shell ${styles.grid}`}>
        <div>
          <p className={styles.eyebrow}>{o.eyebrow}</p>
          <h2 className="h-xl">{o.title}</h2>
          <p className={`lede ${styles.body}`}>{o.body}</p>
          <div className={styles.actions}>
            <Button to={href('pilot')}>{o.cta}</Button>
          </div>
        </div>

        <div>
          {/* The trial as thirteen weeks: the install, the weeks in use, the decision. */}
          <ol ref={strip} className={styles.days} data-seen={seen ? '' : undefined} aria-hidden="true">
            {Array.from({ length: DAYS }, (_, day) => (
              <li key={day} className={styles.day} data-phase={phaseOf(day)} style={{ '--i': day } as CSSProperties} />
            ))}
          </ol>
          <div className={`tabular ${styles.scale}`} aria-hidden="true">
            <span>{o.days.start}</span>
            <span>{o.days.end}</span>
          </div>
          <ol className={styles.points}>
            {o.points.map((point, i) => (
              <li key={point.k} className={styles.point} data-phase={PHASES[i]}>
                <h3 className={styles.k}>{point.k}</h3>
                <p className={styles.v}>{point.v}</p>
              </li>
            ))}
          </ol>
          <p className={styles.price}>
            {o.price}{' '}
            <Button to={href('pricing')} tone="link">
              {o.priceLink}
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}
