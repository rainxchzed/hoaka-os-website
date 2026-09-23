import { useI18n } from '../i18n'
import { Button } from '../components/Button'
import { PriceCalculator } from '../components/PriceCalculator'
import { Ledger } from '../sections/Ledger'
import styles from './Pricing.module.css'

export function Pricing() {
  const { t, href } = useI18n()
  const p = t.pricing
  const req = p.requirements

  return (
    <>
      <header className={styles.top} data-deep>
        <div className="shell">
          <h1 className="h-2xl">{p.title}</h1>
          <p className={`lede ${styles.lede}`}>{p.lede}</p>
          <PriceCalculator />
        </div>
      </header>

      <section className="section">
        <div className={`shell ${styles.split}`}>
          <h2 className="h-xl">{p.includedTitle}</h2>
          <div>
            <dl className={styles.pairs}>
              {p.included.map((item) => (
                <div key={item.k} className={styles.pair}>
                  <dt>{item.k}</dt>
                  <dd>{item.v}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.excluded}>
              <span>{p.excludedTitle}:</span> {p.excluded.join(' · ')}
            </p>
          </div>
        </div>
      </section>

      <Ledger withLink={false} />

      <section className="section">
        <div className={`shell ${styles.split}`}>
          <h2 className="h-xl">{req.title}</h2>
          <div className={styles.columns}>
            {[req.provide, req.stack].map((column) => (
              <div key={column.title}>
                <h3 className={styles.colTitle}>{column.title}</h3>
                <dl className={styles.pairs}>
                  {column.items.map((item) => (
                    <div key={item.k} className={styles.pair}>
                      <dt>{item.k}</dt>
                      <dd>{item.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`shell ${styles.split}`}>
          <div>
            <h2 className="h-xl">{p.openTitle}</h2>
            <p className={`lede ${styles.lede}`}>{p.openBody}</p>
            <div className={styles.cta}>
              <Button to={href('pilot')}>{t.cta.primary}</Button>
            </div>
          </div>
          <div>
            <ul className={styles.open}>
              {p.open.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className={styles.colTitle}>{p.sourcesTitle}</h3>
            <p className={styles.source}>{p.sources}</p>
            <ol className={styles.notes}>
              {p.footnotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
