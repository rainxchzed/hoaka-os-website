import { useI18n } from '../i18n'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import styles from './Decay.module.css'

export function Decay() {
  const { t } = useI18n()

  return (
    <section className="section">
      <div className="shell">
        <SectionHead eyebrow={t.decay.eyebrow} title={t.decay.title} lede={t.decay.lede} />

        <ul className={styles.grid}>
          {t.decay.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90} className={styles.card}>
              <span className={`num ${styles.index}`}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
