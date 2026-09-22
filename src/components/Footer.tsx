import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { LOCALES, LOCALE_LABEL, pathFor } from '../i18n/locales'
import type { PageKey } from '../i18n/locales'
import { CONTACT } from '../lib/contact'
import { Logo } from './Logo'
import styles from './Footer.module.css'

export function Footer({ page }: { page: PageKey }) {
  const { t, href, locale } = useI18n()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Logo size={28} />
          <p className={styles.tagline}>{t.footer.tagline}</p>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {t.footer.status}
          </p>
        </div>

        <nav className={styles.col} aria-label={t.footer.nav}>
          <h2 className={styles.colTitle}>{t.footer.nav}</h2>
          <Link to={href('home')}>{t.nav.home}</Link>
          <Link to={href('pricing')}>{t.nav.pricing}</Link>
          <Link to={href('pilot')}>{t.nav.pilot}</Link>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{t.footer.contact}</h2>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
          <span className={styles.muted}>{t.footer.madeIn}</span>
        </div>

        <nav className={styles.col} aria-label={t.footer.language}>
          <h2 className={styles.colTitle}>{t.footer.language}</h2>
          {LOCALES.map((code) => (
            <Link
              key={code}
              to={pathFor(code, page)}
              lang={code}
              hrefLang={code}
              aria-current={code === locale ? 'true' : undefined}
              className={code === locale ? styles.current : undefined}
            >
              {LOCALE_LABEL[code]}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.base}>
        <span>
          © {new Date().getFullYear()} Hoaka. {t.footer.rights}
        </span>
        <span className={styles.mono}>Debian 13 · LXQt</span>
      </div>
    </footer>
  )
}
