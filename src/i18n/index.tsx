import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { uz } from './dict/uz'
import { ru } from './dict/ru'
import { en } from './dict/en'
import type { Dict } from './dict/uz'
import { DEFAULT_LOCALE, pathFor } from './locales'
import type { Locale, PageKey } from './locales'

const DICTS: Record<Locale, Dict> = { uz, ru, en }

type I18nValue = {
  locale: Locale
  t: Dict
  href: (page: PageKey) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: DICTS[locale] ?? DICTS[DEFAULT_LOCALE],
      href: (page) => pathFor(locale, page),
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>')
  return value
}

export function dictFor(locale: Locale): Dict {
  return DICTS[locale] ?? DICTS[DEFAULT_LOCALE]
}
