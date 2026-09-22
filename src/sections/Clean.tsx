import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { useInView } from '../lib/useInView'
import { useReducedMotion } from '../lib/useReducedMotion'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import styles from './Clean.module.css'

/** Where each piece of junk lands on the mock desktop, as percentages. */
const JUNK_SPOTS = [
  { x: 8, y: 16 },
  { x: 30, y: 52 },
  { x: 62, y: 22 },
  { x: 14, y: 70 },
  { x: 74, y: 62 },
  { x: 44, y: 34 },
] as const

type Phase = 'clean' | 'rotting' | 'wiping'

export function Clean() {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.4 })

  const [phase, setPhase] = useState<Phase>('clean')
  const [junk, setJunk] = useState(0)
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const run = useCallback(() => {
    clearTimers()
    setPhase('rotting')
    setJunk(0)

    JUNK_SPOTS.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setJunk(i + 1), 340 + i * 330),
      )
    })

    timers.current.push(
      window.setTimeout(() => setPhase('wiping'), 340 + JUNK_SPOTS.length * 330 + 900),
    )
    timers.current.push(
      window.setTimeout(() => {
        setJunk(0)
        setPhase('clean')
      }, 340 + JUNK_SPOTS.length * 330 + 1500),
    )
  }, [clearTimers])

  useEffect(() => {
    if (!inView || reduced) return
    run()
    return clearTimers
  }, [inView, reduced, run, clearTimers])

  useEffect(() => clearTimers, [clearTimers])

  const label = phase === 'clean' ? t.clean.demo.after : t.clean.demo.before

  return (
    <section className="section" data-deep>
      <div className={`shell ${styles.wrap}`}>
        <div className={styles.copy}>
          <SectionHead eyebrow={t.clean.eyebrow} title={t.clean.title} lede={t.clean.body} />

          <dl className={styles.points}>
            {t.clean.points.map((point, i) => (
              <Reveal key={point.k} delay={i * 80} className={styles.point}>
                <dt>{point.k}</dt>
                <dd>{point.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className={styles.demoCol} variant="fade">
          <figure className={styles.screen} ref={ref} data-phase={phase}>
            <div className={styles.bezel} aria-hidden="true">
              <picture className={styles.wallpaper}>
                <source srcSet="/media/wall-1-800.avif" type="image/avif" />
                <source srcSet="/media/wall-1-800.webp" type="image/webp" />
                <img src="/media/wall-1-800.webp" alt="" loading="lazy" decoding="async" />
              </picture>

              {JUNK_SPOTS.map((spot, i) => (
                <span
                  key={t.clean.demo.junk[i]}
                  className={styles.junk}
                  data-on={i < junk ? '' : undefined}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  <span className={styles.junkIcon} aria-hidden="true" />
                  {t.clean.demo.junk[i]}
                </span>
              ))}

              <div className={styles.flash} aria-hidden="true" />

              <div className={styles.dock}>
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <figcaption className={styles.caption}>
              <span className={styles.state} data-phase={phase}>
                {label}
              </span>
              <button type="button" className={styles.replay} onClick={run}>
                {t.clean.demo.reboot}
              </button>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
