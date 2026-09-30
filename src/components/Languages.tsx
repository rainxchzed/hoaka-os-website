import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { useI18n } from '../i18n'
import { LOCALES, LOCALE_LABEL, LOCALE_SHORT, pathFor } from '../i18n/locales'
import type { Locale, PageKey } from '../i18n/locales'
import styles from './Languages.module.css'

export const LOCALE_STORAGE_KEY = 'hoaka.locale'

function remember(code: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, code)
  } catch {
    // Private browsing: the choice just does not outlive this visit.
  }
}

export function Languages({ page }: { page: PageKey }) {
  const { locale, t } = useI18n()
  const current = { '--current': LOCALES.indexOf(locale) } as CSSProperties

  return (
    <nav className={styles.list} aria-label={t.nav.language}>
      <span className={styles.track} style={current}>
        <span className={styles.thumb} aria-hidden="true" />
        {LOCALES.map((code) => (
          <Link
            key={code}
            to={pathFor(code, page)}
            lang={code}
            hrefLang={code}
            aria-current={code === locale ? 'true' : undefined}
            aria-label={LOCALE_LABEL[code]}
            className={styles.item}
            onClick={() => remember(code)}
          >
            {LOCALE_LABEL[code]}
            <span className={styles.code}>{LOCALE_SHORT[code]}</span>
          </Link>
        ))}
      </span>
    </nav>
  )
}
