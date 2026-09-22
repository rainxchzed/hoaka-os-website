import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'
import { LOCALES, LOCALE_LABEL, LOCALE_SHORT, pathFor } from '../i18n/locales'
import type { PageKey } from '../i18n/locales'
import styles from './LocaleSwitcher.module.css'

export const LOCALE_STORAGE_KEY = 'hoaka.locale'

export function LocaleSwitcher({ page }: { page: PageKey }) {
  const { locale, t } = useI18n()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const choose = (next: (typeof LOCALES)[number]) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      // Private browsing: the choice just does not outlive this visit.
    }
    setOpen(false)
    navigate(pathFor(next, page))
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.nav.language}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3 12h18M12 3c2.6 2.8 2.6 15.2 0 18M12 3c-2.6 2.8-2.6 15.2 0 18"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
        <span className={styles.short}>{LOCALE_SHORT[locale]}</span>
      </button>

      {open ? (
        <ul className={styles.menu} role="listbox" aria-label={t.nav.language}>
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                lang={code}
                className={styles.option}
                onClick={() => choose(code)}
              >
                <span>{LOCALE_LABEL[code]}</span>
                <span className={styles.tag}>{LOCALE_SHORT[code]}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
