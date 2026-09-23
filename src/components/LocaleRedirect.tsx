import { Navigate } from 'react-router-dom'
import { DEFAULT_LOCALE, isLocale, matchLocale, pathFor } from '../i18n/locales'
import type { Locale } from '../i18n/locales'
import { LOCALE_STORAGE_KEY } from './Languages'

export function LocaleRedirect() {
  if (typeof window === 'undefined') return null

  let stored: string | null = null
  try {
    stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  } catch {
    stored = null
  }

  const locale = isLocale(stored ?? undefined)
    ? (stored as Locale)
    : matchLocale(navigator.languages ?? [navigator.language ?? DEFAULT_LOCALE])

  return <Navigate to={pathFor(locale, 'home')} replace />
}
