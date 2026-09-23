import { useI18n } from '../i18n'
import { Logo } from '../components/Logo'
import { ExamSheet, InventorySheet, UsageSheet } from './ReportSheets'
import styles from './Reports.module.css'

// In the dictionaries' order: utilization, exam, inventory.
const SHEETS = [UsageSheet, ExamSheet, InventorySheet]

export function Reports() {
  const { t } = useI18n()

  return (
    <section className="section">
      <div className={`shell ${styles.grid}`}>
        <div>
          <h2 className="h-xl">{t.reports.title}</h2>
          <p className={`lede ${styles.body}`}>{t.reports.body}</p>
        </div>
        <ol className={styles.sheets}>
          {t.reports.items.map((item, i) => {
            const Content = SHEETS[i % SHEETS.length]
            return (
              <li key={item.name} className={styles.sheet}>
                <div className={styles.paper} aria-hidden="true">
                  <span className={styles.head}>
                    <Logo size={11} />
                    <span className="tabular">01.10–31.10.2026</span>
                  </span>
                  <span className={styles.docTitle}>{item.name}</span>
                  <span className={styles.org} />
                  <Content />
                  <span className={styles.sign}>
                    <span className={styles.line} style={{ width: '38%' }} />
                    <span className={styles.stamp} />
                  </span>
                </div>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.v}>{item.v}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
