import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import type { PageKey } from '../i18n/locales'
import { Logo } from './Logo'
import { Languages } from './Languages'
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
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links: { key: PageKey; label: string }[] = [
    { key: 'home', label: t.nav.home },
    { key: 'pricing', label: t.nav.pricing },
    { key: 'pilot', label: t.nav.pilot },
  ]

  return (
    <header
      className={styles.header}
      data-lifted={lifted || open ? '' : undefined}
      /* Every page opens on deep sky, so the bar borrows those tokens until it lifts. */
      data-deep={lifted || open ? undefined : ''}
    >
      <div className={styles.inner}>
        <Link to={href('home')} className={styles.brand} aria-label="Hoaka OS">
          <Logo size={24} />
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
          <Languages page={page} />
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
          <nav className={styles.sheetLinks} aria-label={t.nav.menu}>
            {links.map((link) => (
              <NavLink
                key={link.key}
                to={href(link.key)}
                end={link.key === 'home'}
                className={({ isActive }) => [styles.sheetLink, isActive ? styles.active : ''].join(' ')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Button to={href('pilot')}>{t.nav.cta}</Button>
        </div>
      ) : null}
    </header>
  )
}
