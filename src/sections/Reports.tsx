import { useI18n } from '../i18n'
import styles from './Reports.module.css'

export function Reports() {
  const { t } = useI18n()

  return (
    <section className="section">
      <div className={`shell ${styles.grid}`}>
        <div>
          <h2 className="h-xl">{t.reports.title}</h2>
          <p className={`lede ${styles.body}`}>{t.reports.body}</p>
        </div>
        <ol className={styles.list}>
          {t.reports.items.map((item) => (
            <li key={item.name} className={styles.item}>
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.v}>{item.v}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
