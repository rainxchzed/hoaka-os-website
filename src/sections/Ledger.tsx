import { Fragment } from 'react'
import { useI18n } from '../i18n'
import { Button } from '../components/Button'
import styles from './Ledger.module.css'

type FigureKey = 'abroad' | 'after' | 'exam' | 'ours'

export function Ledger({ withLink = true }: { withLink?: boolean }) {
  const { t, href } = useI18n()
  const parts = t.ledger.sentence.split(/\{(\w+)\}/)

  return (
    <section className="section">
      <div className="shell">
        <h2 className={styles.title}>{t.ledger.title}</h2>

        <p className={styles.sentence}>
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className={`tabular ${styles.figure}`} data-ours={part === 'ours' ? '' : undefined}>
                {t.ledger.figures[part as FigureKey]}
              </strong>
            ) : (
              <Fragment key={i}>{part}</Fragment>
            ),
          )}
        </p>

        <table className={styles.table}>
          <tbody>
            {t.ledger.rows.map((row) => (
              <tr key={row.job}>
                <th scope="row">{row.job}</th>
                <td className={styles.prod}>{row.prod}</td>
                <td className={`tabular ${styles.amt}`}>{row.amt}</td>
                <td className={styles.per}>{row.per}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.foot}>
          <p className={styles.source}>{t.ledger.source}</p>
          {withLink ? (
            <Button to={href('pricing')} tone="link">
              {t.ledger.cta}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
