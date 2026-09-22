import { Route, Routes } from 'react-router-dom'
import { LOCALES, PAGES, pathFor } from './i18n/locales'
import { PageShell } from './components/PageShell'
import { ScrollReset } from './components/ScrollReset'
import { LocaleRedirect } from './components/LocaleRedirect'
import { Home } from './pages/Home'
import { Pricing } from './pages/Pricing'
import { Pilot } from './pages/Pilot'
import { NotFound } from './pages/NotFound'
import type { PageKey } from './i18n/locales'

const VIEWS: Record<PageKey, () => React.JSX.Element> = {
  home: Home,
  pricing: Pricing,
  pilot: Pilot,
}

export function App() {
  return (
    <>
      <ScrollReset />
      <Routes>
        <Route path="/" element={<LocaleRedirect />} />
        {LOCALES.flatMap((locale) =>
          PAGES.map((page) => {
            const View = VIEWS[page]
            return (
              <Route
                key={`${locale}-${page}`}
                path={pathFor(locale, page)}
                element={
                  <PageShell locale={locale} page={page}>
                    <View />
                  </PageShell>
                }
              />
            )
          }),
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
