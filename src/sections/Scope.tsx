import { useI18n } from '../i18n'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import styles from './Scope.module.css'

export function Scope() {
  const { t } = useI18n()

  return (
    <section className="section">
      <div className={`shell ${styles.wrap}`}>
        <SectionHead eyebrow={t.scope.eyebrow} title={t.scope.title} lede={t.scope.body} />

        <ul className={styles.list}>
          {t.scope.items.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 70} className={styles.item}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="m8.4 8.4 7.2 7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {item}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
