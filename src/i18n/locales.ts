export const LOCALES = ['uz', 'ru', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'uz'

export const LOCALE_LABEL: Record<Locale, string> = {
  uz: 'Oʻzbekcha',
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

export type PageKey = 'home' | 'pricing' | 'pilot' | 'install'

export const PAGES: readonly PageKey[] = ['home', 'pricing', 'pilot', 'install'] as const

// Paths are English in every language, so a link reads the same whoever shares it.
const SLUGS: Record<PageKey, string> = {
  home: '',
  pricing: 'pricing',
  pilot: 'pilot',
  install: 'install',
}

export function pathFor(locale: Locale, page: PageKey): string {
  const slug = SLUGS[page]
  return slug ? `/${locale}/${slug}/` : `/${locale}/`
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
