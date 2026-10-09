import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useI18n } from '../i18n'
import { Shot } from '../components/Shot'
import type { ShotName } from '../components/Shot'
import styles from './Screens.module.css'

export function Screens() {
  const { t, locale } = useI18n()
  const tabs = t.screens.tabs
  const [at, setAt] = useState(0)
  const tab = tabs[at]

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (at + step + tabs.length) % tabs.length
    setAt(next)
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <section className="section" aria-labelledby="screens-heading">
      <div className="shell">
        <h2 id="screens-heading" className="h-xl">
          {t.screens.title}
        </h2>
        <p className={`lede ${styles.lede}`}>{t.screens.lede}</p>

        <div className={styles.tabs} role="tablist" aria-labelledby="screens-heading" onKeyDown={onKey}>
          {tabs.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`screens-tab-${item.id}`}
              aria-selected={i === at}
              aria-controls="screens-panel"
              tabIndex={i === at ? 0 : -1}
              className={styles.tab}
              onClick={() => setAt(i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div id="screens-panel" role="tabpanel" aria-labelledby={`screens-tab-${tab.id}`} className={styles.panel}>
          <p className={styles.caption}>{tab.caption}</p>
          <div key={tab.id} className={styles.frame}>
            <Shot locale={locale} name={tab.id as ShotName} alt={`${tab.label}: ${tab.caption}`} />
          </div>
        </div>
      </div>
    </section>
  )
}
