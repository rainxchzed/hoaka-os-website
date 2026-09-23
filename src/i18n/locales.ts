export const LOCALES = ['uz', 'ru', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'uz'

export const LOCALE_LABEL: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: 'Русский',
  en: 'English',
}

export const LOCALE_SHORT: Record<Locale, string> = {
  uz: 'UZ',
  ru: 'RU',
  en: 'EN',
}

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  uz: 'uz-Latn-UZ',
  ru: 'ru-RU',
  en: 'en',
}

export type PageKey = 'home' | 'pricing' | 'pilot'

export const PAGES: readonly PageKey[] = ['home', 'pricing', 'pilot'] as const

const SLUGS: Record<PageKey, Record<Locale, string>> = {
  home: { uz: '', ru: '', en: '' },
  pricing: { uz: 'narxlar', ru: 'stoimost', en: 'pricing' },
  pilot: { uz: 'sinov', ru: 'pilot', en: 'pilot' },
}

export function pathFor(locale: Locale, page: PageKey): string {
  const slug = SLUGS[page][locale]
  return slug ? `/${locale}/${slug}` : `/${locale}`
}

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale)
}

export const ROUTES = LOCALES.flatMap((locale) =>
  PAGES.map((page) => ({ locale, page, path: pathFor(locale, page) })),
)

export function matchLocale(preferred: readonly string[]): Locale {
  for (const raw of preferred) {
    const tag = raw.toLowerCase()
    if (tag.startsWith('uz')) return 'uz'
    // Kazakh and Kyrgyz readers are likelier to read Russian than Uzbek or English.
    if (tag.startsWith('ru') || tag.startsWith('kk') || tag.startsWith('ky')) return 'ru'
    if (tag.startsWith('en')) return 'en'
  }
  return DEFAULT_LOCALE
}
