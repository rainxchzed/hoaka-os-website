import { useState } from 'react'
import type { FormEvent } from 'react'
import { useI18n } from '../i18n'
import { CONTACT } from '../lib/contact'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import styles from './Pilot.module.css'

type FieldName = 'name' | 'role' | 'org' | 'email' | 'phone' | 'machines'

const FIELDS: { name: FieldName; type: string; required: boolean; autoComplete: string }[] = [
  { name: 'name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'role', type: 'text', required: false, autoComplete: 'organization-title' },
  { name: 'org', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', type: 'tel', required: false, autoComplete: 'tel' },
  { name: 'machines', type: 'number', required: false, autoComplete: 'off' },
]

export function Pilot() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  /**
   * There is no server behind this site yet, so the form composes a message and
   * hands it to the visitor's own mail client. Swapping in an endpoint later is a
   * change to this one function.
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const lines = [...FIELDS.map((f) => f.name), 'message' as const]
      .map((key) => {
        const label = t.pilot.fields[key]
        const value = String(data.get(key) ?? '').trim()
        return value ? `${label}: ${value}` : null
      })
      .filter(Boolean)
      .join('\n')

    const subject = `${t.pilot.eyebrow} — ${String(data.get('org') ?? '').trim()}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`
    setSent(true)
  }

  return (
    <>
      <section className={`section ${styles.top}`} data-deep>
        <div className="shell">
          <SectionHead eyebrow={t.pilot.eyebrow} title={t.pilot.title} lede={t.pilot.lede} level={1} />

          <ol className={styles.steps}>
            {t.pilot.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 80} className={styles.step}>
                <span className={`num ${styles.stepN}`}>{step.n}</span>
                <h3 className={styles.stepK}>{step.k}</h3>
                <p className={styles.stepV}>{step.v}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className={`shell ${styles.wrap}`}>
          <div>
            <SectionHead title={t.pilot.formTitle} lede={t.pilot.formBody} />

            <Reveal delay={100} className={styles.direct}>
              <span className={styles.directLabel}>{t.pilot.orEmail}</span>
              <a href={`mailto:${CONTACT.email}`} className={styles.directLink}>
                {CONTACT.email}
              </a>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className={styles.directLink}>
                {CONTACT.phone}
              </a>
            </Reveal>
          </div>

          <Reveal variant="fade" className={styles.formCard}>
            <form className={styles.form} onSubmit={onSubmit}>
              {FIELDS.map((field) => (
                <label key={field.name} className={styles.field} data-wide={field.name === 'org' ? '' : undefined}>
                  <span className={styles.label}>
                    {t.pilot.fields[field.name]}
                    {field.required ? (
                      <span className={styles.req}> · {t.pilot.required}</span>
                    ) : null}
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
          </Reveal>
        </div>
      </section>
    </>
  )
}
