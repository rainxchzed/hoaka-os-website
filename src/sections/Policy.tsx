import { useI18n } from '../i18n'
import { useInView } from '../lib/useInView'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { CountUp } from '../components/CountUp'
import styles from './Policy.module.css'

export function Policy() {
  const { t } = useI18n()
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.45 })

  const nodes = [t.policy.tree.site, t.policy.tree.room, t.policy.tree.device]

  return (
    <section className="section">
      <div className={`shell ${styles.wrap}`}>
        <div>
          <SectionHead eyebrow={t.policy.eyebrow} title={t.policy.title} lede={t.policy.body} />
          <Reveal as="p" delay={120} className={styles.note}>
            {t.policy.note}
          </Reveal>
        </div>

        <Reveal className={styles.side} variant="fade">
          <div className={styles.tree} ref={ref} data-live={inView ? '' : undefined}>
            {nodes.map((node, i) => (
              <div key={node} className={styles.node} style={{ '--i': i } as React.CSSProperties}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.nodeLabel}>{node}</span>
                {i < nodes.length - 1 ? <span className={styles.wire} aria-hidden="true" /> : null}
              </div>
            ))}
          </div>

          <div className={styles.counter}>
            <CountUp value={t.hero.stats[1].value} className={`num ${styles.counterValue}`} />
            <span className={styles.counterLabel}>{t.policy.counter.label}</span>
            <span className={styles.counterSub}>{t.policy.counter.sub}</span>
          </div>
        </Reveal>
      </div>

      <div className={`shell ${styles.modes}`}>
        {t.policy.modes.map((mode, i) => (
          <Reveal key={mode.name} delay={i * 100} className={styles.mode} data-mode={i}>
            <span className={styles.bar} aria-hidden="true" />
            <h3 className={styles.modeName}>{mode.name}</h3>
            <p className={styles.modeBody}>{mode.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
