import { useId, useState } from 'react'
import type { CSSProperties } from 'react'
import { useI18n } from '../i18n'
import { amount, dollars, share } from '../lib/money'
import styles from './PriceCalculator.module.css'

const MIN = 5
const MAX = 150
const START = 25

export function PriceCalculator() {
  const { t, locale } = useI18n()
  const id = useId()
  const [machines, setMachines] = useState(START)
  const p = t.pricing

  const presets = p.tiers.map((tier) => ({ ...tier, machines: amount(tier.count) }))
  const freeUpTo = presets[0]?.machines ?? 0
  const free = machines <= freeUpTo
  const ours = free ? 0 : machines * amount(t.ledger.figures.ours)
  const exam = amount(t.ledger.figures.exam)
  const firstYear = machines * amount(t.ledger.figures.abroad) + exam
  const later = machines * amount(t.ledger.figures.after) + exam
  const fill = { '--fill': `${((machines - MIN) / (MAX - MIN)) * 100}%` } as CSSProperties

  const rows = [
    { key: 'ours', label: p.calc.ours, value: free ? p.tiers[0].price : dollars(ours, locale), note: free ? p.tiers[0].note : p.tiers[1].note, bar: ours },
    { key: 'first', label: p.calc.abroadFirst, value: dollars(firstYear, locale), note: '', bar: firstYear },
    { key: 'later', label: p.calc.abroadAfter, value: dollars(later, locale), note: '', bar: later },
  ]

  return (
    <div className={styles.calc}>
      <div className={styles.control}>
        <div className={styles.readout}>
          <label htmlFor={id} className={styles.label}>
            {p.calc.label}
          </label>
          <output htmlFor={id} className={`tabular ${styles.count}`}>
            {machines}
          </output>
        </div>
        <input
          id={id}
          className={styles.range}
          type="range"
          min={MIN}
          max={MAX}
          step={1}
          value={machines}
          style={fill}
          onChange={(event) => setMachines(Number(event.target.value))}
        />
        <div className={styles.presets} role="group" aria-label={p.tiersTitle}>
          {presets.map((preset) => (
            <button
              key={preset.count}
              type="button"
              className={styles.preset}
              aria-pressed={preset.machines === machines}
              onClick={() => setMachines(preset.machines)}
            >
              <span>{preset.count}</span>
              <b className="tabular">{preset.price}</b>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.results}>
        <dl className={styles.rows}>
          {rows.map((row) => (
            <div key={row.key} className={styles.result} data-ours={row.key === 'ours' ? '' : undefined} data-free={row.key === 'ours' && free ? '' : undefined}>
              <dt>{row.label}</dt>
              <dd className={`tabular ${styles.value}`}>
                {row.value}
                {row.note ? <span className={styles.note}>{row.note}</span> : null}
              </dd>
              <dd className={styles.track} aria-hidden="true">
                <span className={styles.fill} style={share(row.bar, firstYear)} />
              </dd>
            </div>
          ))}
        </dl>
        <p className={styles.fine}>{p.calc.note}</p>
      </div>
    </div>
  )
}
