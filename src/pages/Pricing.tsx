import { ClipboardCheck, HardDriveDownload, LayoutDashboard, ListChecks, PackageCheck, RotateCcw, X } from 'lucide-react'
import { useI18n } from '../i18n'
import { Button } from '../components/Button'
import { PriceCalculator } from '../components/PriceCalculator'
import { Ledger } from '../sections/Ledger'
import { Seam } from '../components/Seam'
import styles from './Pricing.module.css'

// In the dictionaries' order: reset, reimaging, updates, lists, exam day, console.
const COVERS = [RotateCcw, HardDriveDownload, PackageCheck, ListChecks, ClipboardCheck, LayoutDashboard]

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
      <Seam kind="dawn" />

      <section className="section">
        <div className={`shell ${styles.split}`}>
          <h2 className="h-xl">{p.includedTitle}</h2>
          <div>
            <dl className={styles.covers}>
              {p.included.map((item, i) => {
                const Icon = COVERS[i % COVERS.length]
                return (
                  <div key={item.k} className={styles.cover}>
                    <dt>
                      <span className={styles.coverIcon} aria-hidden="true">
                        <Icon size={20} strokeWidth={1.6} />
                      </span>
                      {item.k}
                    </dt>
                    <dd>{item.v}</dd>
                  </div>
                )
              })}
            </dl>
            <div className={styles.excluded}>
              <h3 className={styles.colTitle}>{p.excludedTitle}</h3>
              <ul className={styles.chips}>
                {p.excluded.map((item) => (
                  <li key={item} className={styles.chip}>
                    <X size={13} strokeWidth={2} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Ledger withLink={false} />

      <section className="section">
        <div className={`shell ${styles.split}`}>
          <h2 className="h-xl">{req.title}</h2>
          <div className={styles.columns}>
            <div>
              <h3 className={styles.colTitle}>{req.provide.title}</h3>
              <ul className={styles.checklist}>
                {req.provide.items.map((item) => (
                  <li key={item.k} className={styles.check}>
                    <span className={styles.box} aria-hidden="true" />
                    <span className={styles.checkText}>
                      <strong>{item.k}</strong>
                      <span>{item.v}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.colTitle}>{req.stack.title}</h3>
              <dl className={styles.spec}>
                {req.stack.items.map((item) => (
                  <div key={item.k} className={styles.specRow}>
                    <dt>{item.k}</dt>
                    <dd>{item.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
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
                <li key={item} className={styles.blank}>
                  <span>{item}</span>
                  <span className={styles.field} aria-hidden="true" />
                </li>
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
