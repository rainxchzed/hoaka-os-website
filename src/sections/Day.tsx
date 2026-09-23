import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { LabStage } from '../lab/LabStage'
import type { MomentId } from '../lab/moments'
import styles from './Day.module.css'

export function Day() {
  const { t } = useI18n()
  const [active, setActive] = useState<MomentId>('boot')
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.moment as MomentId)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.day} data-deep aria-labelledby="day-heading">
      <div className={styles.stage}>
        <LabStage moment={active} />
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={`shell ${styles.track}`}>
        <h2 id="day-heading" className={styles.heading}>
          {t.day.heading}
        </h2>
        <ol className={styles.steps}>
          {t.day.steps.map((step, i) => (
            <li
              key={step.id}
              ref={(el) => {
                stepRefs.current[i] = el
              }}
              data-moment={step.id}
              data-active={active === step.id ? '' : undefined}
              className={styles.step}
            >
              <time className={`tabular ${styles.time}`} dateTime={step.time}>
                {step.time}
              </time>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
              {step.id === 'exam' ? <p className={styles.honest}>{t.day.honest}</p> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
