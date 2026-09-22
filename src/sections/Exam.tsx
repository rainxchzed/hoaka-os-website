import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { useInView } from '../lib/useInView'
import { useReducedMotion } from '../lib/useReducedMotion'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import type { Tone } from '../i18n/dict/uz'
import styles from './Exam.module.css'

const ROWS = ['A', 'B', 'C'] as const
const COLS = 8

/** The two seats the illustration singles out, matching the log beneath it. */
const INTERRUPTED = 'B3'
const NO_CONTACT = 'C6'

type Seat = { id: string; index: number }

export function Exam() {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.35 })
  const [step, setStep] = useState(0)

  const seats = useMemo<Seat[]>(
    () =>
      ROWS.flatMap((row, r) =>
        Array.from({ length: COLS }, (_, c) => ({
          id: `${row}${c + 1}`,
          index: r * COLS + c,
        })),
      ),
    [],
  )

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setStep(3)
      return
    }

    // 1: seats take the exam, 2: one seat drops, 3: the log is written.
    const timers = [
      window.setTimeout(() => setStep(1), 260),
      window.setTimeout(() => setStep(2), 2200),
      window.setTimeout(() => setStep(3), 3100),
    ]
    return () => timers.forEach(clearTimeout)
  }, [inView, reduced])

  const toneOf = (id: string): Tone => {
    if (step === 0) return 'idle'
    if (id === NO_CONTACT) return 'idle'
    if (id === INTERRUPTED) return step >= 2 ? 'alarm' : 'live'
    return 'live'
  }

  return (
    <section className="section" data-deep>
      <div className={`shell ${styles.wrap}`}>
        <div className={styles.copy}>
          <SectionHead eyebrow={t.exam.eyebrow} title={t.exam.title} lede={t.exam.body} />

          <Reveal delay={120} className={styles.honest}>
            <h3 className={styles.honestTitle}>{t.exam.honest.title}</h3>
            <p className={styles.honestBody}>{t.exam.honest.body}</p>
          </Reveal>
        </div>

        <Reveal className={styles.console} variant="fade">
          <div className={styles.examBar} data-live={step >= 1 ? '' : undefined}>
            <span className={styles.examDot} aria-hidden="true" />
            {t.exam.eyebrow}
          </div>

          <div className={styles.map} ref={ref} role="img" aria-label={t.exam.summary}>
            {seats.map((seat) => (
              <span
                key={seat.id}
                className={styles.seat}
                data-tone={toneOf(seat.id)}
                style={{ transitionDelay: step === 1 ? `${seat.index * 26}ms` : '0ms' }}
              >
                <span className={styles.seatId}>{seat.id}</span>
              </span>
            ))}
          </div>

          <ul className={styles.legend}>
            {(['live', 'idle', 'alarm'] as const).map((tone) => (
              <li key={tone} data-tone={tone}>
                <span aria-hidden="true" />
                {t.exam.legend[tone]}
              </li>
            ))}
          </ul>

          <div className={styles.log}>
            <h3 className={styles.logTitle}>{t.exam.logTitle}</h3>
            <ul>
              {t.exam.logRows.map((row, i) => (
                <li
                  key={row.seat}
                  data-tone={row.tone}
                  data-on={step >= 3 ? '' : undefined}
                  style={{ transitionDelay: `${i * 140}ms` }}
                >
                  <span className={`num ${styles.logSeat}`}>{row.seat}</span>
                  <span className={styles.logText}>{row.text}</span>
                </li>
              ))}
            </ul>
            <p className={styles.summary} data-on={step >= 3 ? '' : undefined}>
              {t.exam.summary}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
