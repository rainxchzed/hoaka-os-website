import { useI18n } from '../i18n'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import styles from './Requirements.module.css'

export function Requirements() {
  const { t } = useI18n()
  const columns = [t.requirements.provide, t.requirements.stack]

  return (
    <section className="section">
      <div className="shell">
        <SectionHead eyebrow={t.requirements.eyebrow} title={t.requirements.title} />

        <div className={styles.cols}>
          {columns.map((column, ci) => (
            <Reveal key={column.title} delay={ci * 110} className={styles.col}>
              <h3 className={styles.colTitle}>{column.title}</h3>
              <dl className={styles.list}>
                {column.items.map((item) => (
                  <div key={item.k} className={styles.row}>
                    <dt>{item.k}</dt>
                    <dd>{item.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
