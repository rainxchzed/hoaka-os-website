import { useI18n } from '../i18n'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { Cost } from '../sections/Cost'
import styles from './Pricing.module.css'

export function Pricing() {
  const { t, href } = useI18n()

  return (
    <>
      <section className={`section ${styles.top}`} data-deep>
        <div className="shell">
          <SectionHead eyebrow={t.pricing.eyebrow} title={t.pricing.title} lede={t.pricing.lede} level={1} />

          <div className={styles.tiers}>
            {t.pricing.tiers.map((tier, i) => (
              <Reveal key={tier.count} delay={i * 80} className={styles.tier} data-free={i === 0 ? '' : undefined}>
                <span className={styles.tierCount}>{tier.count}</span>
                <span className={`num ${styles.tierPrice}`}>{tier.price}</span>
                <span className={styles.tierNote}>{tier.note}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead title={t.pricing.includedTitle} />

          <div className={styles.included}>
            {t.pricing.included.map((item, i) => (
              <Reveal key={item.k} delay={i * 70} className={styles.includedItem}>
                <h3>{item.k}</h3>
                <p>{item.v}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className={styles.excluded}>
            <h3 className={styles.excludedTitle}>{t.pricing.excludedTitle}</h3>
            <ul>
              {t.pricing.excluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Cost />

      <section className="section">
        <div className={`shell ${styles.tail}`}>
          <Reveal className={styles.open}>
            <h2 className={styles.openTitle}>{t.pricing.openTitle}</h2>
            <p className={styles.openBody}>{t.pricing.openBody}</p>
            <ul className={styles.openList}>
              {t.pricing.open.map((item) => (
                <li key={item}>
                  <span className={styles.blank} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Button to={href('pilot')} className={styles.openCta}>
              {t.cta.primary}
            </Button>
          </Reveal>

          <Reveal delay={90} className={styles.sources}>
            <h2 className={styles.sourcesTitle}>{t.pricing.sourcesTitle}</h2>
            <p>{t.pricing.sources}</p>
            <ol className={styles.footnotes}>
              {t.pricing.footnotes.map((note, i) => (
                <li key={note}>
                  <span className={`num ${styles.fnMark}`}>{i + 1}</span>
                  {note}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  )
}
