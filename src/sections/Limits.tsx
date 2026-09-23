import { useI18n } from '../i18n'
import styles from './Limits.module.css'

export function Limits() {
  const { t } = useI18n()

  return (
    <section className={`section ${styles.limits}`}>
      <div className={`shell ${styles.grid}`}>
        <h2 className="h-xl">{t.limits.title}</h2>
        <ul className={styles.list}>
          {t.limits.items.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
