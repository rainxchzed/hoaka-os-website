import { Fragment } from 'react'
import { useI18n } from '../i18n'
import { Button } from '../components/Button'
import { amount, share } from '../lib/money'
import styles from './Ledger.module.css'

type FigureKey = 'abroad' | 'after' | 'exam' | 'ours'

export function Ledger({ withLink = true }: { withLink?: boolean }) {
  const { t, href } = useI18n()
  const l = t.ledger
  const parts = l.sentence.split(/\{(\w+)\}/)
  const costs = l.rows.map((row) => amount(row.amt))
  const dearest = Math.max(...costs)
  const abroad = amount(l.figures.abroad)
  const pair = [
    { key: 'abroad', label: l.compare.abroad, figure: l.figures.abroad, ours: false },
    { key: 'ours', label: l.compare.ours, figure: l.figures.ours, ours: true },
  ]

  return (
    <section className="section">
      <div className="shell">
        <h2 className={styles.title}>{l.title}</h2>

        <div className={styles.top}>
          <p className={styles.sentence}>
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className={`tabular ${styles.figure}`} data-ours={part === 'ours' ? '' : undefined}>
                  {l.figures[part as FigureKey]}
                </strong>
              ) : (
                <Fragment key={i}>{part}</Fragment>
              ),
            )}
          </p>

          <div className={styles.compare}>
            {pair.map((row) => (
              <div key={row.key} className={styles.bar} data-ours={row.ours ? '' : undefined}>
                <span className={styles.barLabel}>{row.label}</span>
                <span className={`tabular ${styles.barValue}`}>{row.figure}</span>
                <span className={styles.barTrack} aria-hidden="true">
                  <span className={styles.barFill} style={share(amount(row.figure), abroad)} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <table className={styles.table}>
          <tbody>
            {l.rows.map((row, i) => (
              <tr key={row.job}>
                <th scope="row">{row.job}</th>
                <td className={styles.prod}>{row.prod}</td>
                <td className={styles.meter} aria-hidden="true">
                  <span className={styles.track} data-none={costs[i] === 0 ? '' : undefined}>
                    <span className={styles.fill} style={share(costs[i], dearest)} />
                  </span>
                </td>
                <td className={`tabular ${styles.amt}`}>{row.amt}</td>
                <td className={styles.per}>{row.per}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.foot}>
          <p className={styles.source}>{l.source}</p>
          {withLink ? (
            <Button to={href('pricing')} tone="link">
              {l.cta}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
