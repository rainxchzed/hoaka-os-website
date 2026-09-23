import { useState } from 'react'
import type { FormEvent } from 'react'
import { useI18n } from '../i18n'
import { CONTACT } from '../lib/contact'
import { Seam } from '../components/Seam'
import styles from './Pilot.module.css'

type FieldName = 'name' | 'role' | 'org' | 'email' | 'phone' | 'machines'

const FIELDS: { name: FieldName; type: string; required: boolean; autoComplete: string; wide?: boolean }[] = [
  { name: 'name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'role', type: 'text', required: false, autoComplete: 'organization-title' },
  { name: 'org', type: 'text', required: true, autoComplete: 'organization', wide: true },
  { name: 'email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', type: 'tel', required: false, autoComplete: 'tel' },
  { name: 'machines', type: 'number', required: false, autoComplete: 'off' },
]

export function Pilot() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    // No backend yet: the message goes out through the visitor's own mail client.
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = [...FIELDS.map((f) => f.name), 'message' as const]
      .map((key) => {
        const value = String(data.get(key) ?? '').trim()
        return value ? `${t.pilot.fields[key]}: ${value}` : null
      })
      .filter(Boolean)
      .join('\n')
    const subject = `${t.pilot.eyebrow} — ${String(data.get('org') ?? '').trim()}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <header className={styles.top} data-deep>
        <div className="shell">
          <h1 className="h-2xl">{t.pilot.title}</h1>
          <p className={`lede ${styles.lede}`}>{t.pilot.lede}</p>
          <ol className={styles.steps}>
            {t.pilot.steps.map((step) => (
              <li key={step.n} className={styles.step}>
                <span className={styles.span} aria-hidden="true" />
                <span className={`tabular ${styles.n}`}>{step.n}</span>
                <h2 className={styles.k}>{step.k}</h2>
                <p className={styles.v}>{step.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </header>
      <Seam kind="dawn" />

      <section className="section">
        <div className={`shell ${styles.split}`}>
          <div>
            <h2 className="h-xl">{t.pilot.formTitle}</h2>
            <p className={`lede ${styles.lede}`}>{t.pilot.formBody}</p>
            <div className={styles.direct}>
              <span>{t.pilot.orEmail}</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
            </div>
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            {FIELDS.map((field) => (
              <label key={field.name} className={styles.field} data-wide={field.wide ? '' : undefined}>
                <span className={styles.label}>
                  {t.pilot.fields[field.name]}
                  {field.required ? <span className={styles.req}> · {t.pilot.required}</span> : null}
                </span>
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  min={field.type === 'number' ? 1 : undefined}
                />
              </label>
            ))}
            <label className={styles.field} data-wide>
              <span className={styles.label}>{t.pilot.fields.message}</span>
              <textarea name="message" rows={4} placeholder={t.pilot.fields.messagePlaceholder} />
            </label>
            <button type="submit" className={styles.submit}>
              {t.pilot.submit}
            </button>
            {sent ? (
              <p className={styles.sent} role="status">
                <strong>{t.pilot.sent.title}.</strong> {t.pilot.sent.body}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  )
}
