import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { I18nProvider } from '../i18n'
import { LOCALE_HTML_LANG } from '../i18n/locales'
import type { Locale, PageKey } from '../i18n/locales'
import { useSmoothScroll } from '../lib/useSmoothScroll'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { dictFor } from '../i18n'

type Props = { locale: Locale; page: PageKey; children: ReactNode }

export function PageShell({ locale, page, children }: Props) {
  useSmoothScroll()

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_LANG[locale]
  }, [locale])

  const t = dictFor(locale)

  return (
    <I18nProvider locale={locale}>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <Nav page={page} />
      <main id="main">{children}</main>
      <Footer page={page} />
    </I18nProvider>
  )
}
