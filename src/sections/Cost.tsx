import { useI18n } from '../i18n'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import styles from './Cost.module.css'

export function Cost() {
  const { t, href } = useI18n()

  return (
    <section className="section">
      <div className="shell">
        <SectionHead eyebrow={t.cost.eyebrow} title={t.cost.title} lede={t.cost.lede} />

        <Reveal className={styles.ledger}>
          <div className={`${styles.side} ${styles.them}`}>
            <h3 className={styles.sideLabel}>{t.cost.them.label}</h3>
            <p className={`num ${styles.big}`}>{t.cost.them.big}</p>
            <p className={styles.bigSub}>{t.cost.them.bigSub}</p>

            <ul className={styles.extras}>
              {t.cost.them.extras.map((extra) => (
                <li key={extra.label}>
                  <span className="num">{extra.amount}</span>
                  <span>{extra.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.side} ${styles.us}`}>
            <h3 className={styles.sideLabel}>{t.cost.us.label}</h3>
            <p className={`num ${styles.big}`}>{t.cost.us.big}</p>
            <p className={styles.bigSub}>{t.cost.us.bigSub}</p>
            <p className={styles.usNote}>{t.cost.us.note}</p>
          </div>
        </Reveal>

        <Reveal delay={100} className={styles.breakdown}>
          <h3 className={styles.breakdownTitle}>{t.cost.breakdownTitle}</h3>
          <table className={styles.table}>
            <tbody>
              {t.cost.rows.map((row) => (
                <tr key={row.job}>
                  <td className={styles.job}>{row.job}</td>
                  <td className={styles.prod}>{row.prod}</td>
                  <td className={`num ${styles.amt}`}>{row.amt}</td>
                  <td className={styles.per}>{row.per}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button to={href('pricing')} tone="ghost" className={styles.cta}>
            {t.cost.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
