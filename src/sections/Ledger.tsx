import { useI18n } from '../i18n'
import { amount, share } from '../lib/money'
import styles from './Ledger.module.css'

export function Ledger() {
  const { t } = useI18n()
  const l = t.ledger
  const costs = l.rows.map((row) => amount(row.amt))
  const dearest = Math.max(...costs)

  return (
    <section className="section">
      <div className="shell">
        <h2 className="h-xl">{l.title}</h2>

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

        <p className={styles.source}>{l.source}</p>
      </div>
    </section>
  )
}
