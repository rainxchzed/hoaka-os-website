import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import type { PageKey } from '../i18n/locales'
import { CONTACT } from '../lib/contact'
import { Logo } from './Logo'
import { Languages } from './Languages'
import { Seam } from './Seam'
import styles from './Footer.module.css'

export function Footer({ page }: { page: PageKey }) {
  const { t, href } = useI18n()

  return (
    // Every page ends at night: the home page through its dusk sky, the others through this seam.
    <footer className={styles.footer} data-deep>
      {page === 'home' ? null : <Seam kind="dusk" />}
      <div className={`shell ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo size={26} />
          <p className={styles.tagline}>{t.footer.tagline}</p>
          <p className={styles.status}>{t.footer.status}</p>
        </div>

        <nav className={styles.col} aria-label={t.footer.nav}>
          <h2 className={styles.title}>{t.footer.nav}</h2>
          <Link to={href('home')}>{t.nav.home}</Link>
          <Link to={href('pricing')}>{t.nav.pricing}</Link>
          <Link to={href('pilot')}>{t.nav.pilot}</Link>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.title}>{t.footer.contact}</h2>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
        </div>

        <div className={styles.col}>
          <h2 className={styles.title}>{t.footer.language}</h2>
          <Languages page={page} long />
        </div>
      </div>

      <div className={`shell ${styles.base}`}>
        <span>© {new Date().getFullYear()} Hoaka</span>
        <span>Debian 13 · LXQt</span>
      </div>
    </footer>
  )
}
