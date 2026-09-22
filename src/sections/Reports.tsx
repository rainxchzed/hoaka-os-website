import { useI18n } from '../i18n'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import styles from './Reports.module.css'

export function Reports() {
  const { t } = useI18n()

  return (
    <section className="section">
      <div className={`shell ${styles.wrap}`}>
        <Reveal className={styles.sheets} variant="fade">
          {t.reports.items.map((item, i) => (
            <article key={item.name} className={styles.sheet} style={{ '--i': i } as React.CSSProperties}>
              <header>
                <span className={styles.sheetOrg}>Toshkent Davlat Universiteti</span>
                <h3 className={styles.sheetName}>{item.name}</h3>
                <span className={`num ${styles.sheetRange}`}>16.09.2026 &ndash; 20.09.2026</span>
              </header>
              <div className={styles.rules} aria-hidden="true">
                {Array.from({ length: 7 }, (_, r) => (
                  <span key={r} style={{ width: `${88 - ((r * 13) % 46)}%` }} />
                ))}
              </div>
              <footer className={styles.sheetFoot}>{item.v}</footer>
            </article>
          ))}
        </Reveal>

        <div>
          <SectionHead eyebrow={t.reports.eyebrow} title={t.reports.title} lede={t.reports.body} />
          <Reveal delay={120}>
            <span className={styles.print}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 9V4h10v5M7 19h10v-5H7v5ZM5 9h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.reports.print}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
