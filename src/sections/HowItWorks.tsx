import { useI18n } from '../i18n'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { useInView } from '../lib/useInView'
import styles from './HowItWorks.module.css'

export function HowItWorks() {
  const { t } = useI18n()
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.3 })

  return (
    <section className="section" data-deep>
      <div className="shell">
        <SectionHead eyebrow={t.how.eyebrow} title={t.how.title} align="center" />

        <div className={styles.track} ref={ref} data-live={inView ? '' : undefined}>
          <svg className={styles.orbit} viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
            <path
              className={styles.orbitPath}
              d="M 40 26 C 250 118, 750 118, 960 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <ol className={styles.steps}>
            {t.how.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 130} className={styles.step}>
                <span className={`num ${styles.marker}`}>{step.n}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
