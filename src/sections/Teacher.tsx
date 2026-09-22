import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { useInView } from '../lib/useInView'
import { useReducedMotion } from '../lib/useReducedMotion'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import styles from './Teacher.module.css'

const SCREENS = 24

export function Teacher() {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.35 })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const id = window.setInterval(() => setActive((v) => (v + 1) % t.teacher.actions.length), 2600)
    return () => clearInterval(id)
  }, [inView, reduced, t.teacher.actions.length])

  return (
    <section className="section">
      <div className={`shell ${styles.wrap}`}>
        <div>
          <SectionHead eyebrow={t.teacher.eyebrow} title={t.teacher.title} lede={t.teacher.body} />

          <ul className={styles.actions}>
            {t.teacher.actions.map((action, i) => (
              <Reveal
                as="li"
                key={action.k}
                delay={i * 80}
                className={styles.action}
                data-active={i === active ? '' : undefined}
              >
                <button type="button" onClick={() => setActive(i)}>
                  <span className={styles.actionK}>{action.k}</span>
                  <span className={styles.actionV}>{action.v}</span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className={styles.roomCol} variant="fade">
          <div className={styles.room} ref={ref} data-mode={active} aria-hidden="true">
            {Array.from({ length: SCREENS }, (_, i) => (
              <span
                key={i}
                className={styles.screen}
                style={{ transitionDelay: `${(i % 6) * 40 + Math.floor(i / 6) * 70}ms` }}
              >
                <span className={styles.bar} />
                <span className={styles.content} />
              </span>
            ))}
          </div>
          <p className={styles.roomCaption}>
            <span className={`num ${styles.roomCount}`}>{SCREENS}</span> {t.teacher.screens}
            <span className={styles.sent}>{t.teacher.sent}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
