import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import type { PageKey } from '../i18n/locales'
import { Logo } from './Logo'
import { LocaleSwitcher } from './LocaleSwitcher'
import { Button } from './Button'
import styles from './Nav.module.css'

export function Nav({ page }: { page: PageKey }) {
  const { t, href } = useI18n()
  const { pathname } = useLocation()
  const [lifted, setLifted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const links: { key: PageKey; label: string }[] = [
    { key: 'home', label: t.nav.home },
    { key: 'pricing', label: t.nav.pricing },
    { key: 'pilot', label: t.nav.pilot },
  ]

  return (
    <header
      className={styles.header}
      data-lifted={lifted ? '' : undefined}
      /* Every page opens on a deep-space section, so the bar borrows those tokens
         until it lifts off it and picks the page scheme up instead. */
      data-deep={lifted ? undefined : ''}
    >
      <div className={styles.inner}>
        <Link to={href('home')} className={styles.brand} aria-label="Hoaka OS">
          <Logo size={26} />
        </Link>

        <nav className={styles.links} aria-label={t.nav.menu}>
          {links.map((link) => (
            <NavLink
              key={link.key}
              to={href(link.key)}
              end={link.key === 'home'}
              className={({ isActive }) => [styles.link, isActive ? styles.active : ''].join(' ')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.tail}>
          <LocaleSwitcher page={page} />
          <Button to={href('pilot')} className={styles.cta}>
            {t.nav.cta}
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open ? '' : undefined} />
            <span data-open={open ? '' : undefined} />
          </button>
        </div>
      </div>

      {open ? (
        <div className={styles.sheet}>
          <nav className={styles.sheetNav} aria-label={t.nav.menu}>
            {links.map((link, i) => (
              <NavLink
                key={link.key}
                to={href(link.key)}
                end={link.key === 'home'}
                style={{ animationDelay: `${60 + i * 55}ms` }}
                className={({ isActive }) =>
                  [styles.sheetLink, isActive ? styles.active : ''].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Button to={href('pilot')} size="lg" className={styles.sheetCta}>
            {t.nav.cta}
          </Button>
        </div>
      ) : null}
    </header>
  )
}
