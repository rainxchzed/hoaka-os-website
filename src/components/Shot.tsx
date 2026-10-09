import screens from '../lib/screens.json'
import type { Locale } from '../i18n/locales'
import styles from './Shot.module.css'

export type ShotName = keyof (typeof screens)['en']

// How scripts/screens.mjs wrote each one: whole windows at two widths, page parts at 1x and 2x.
const WINDOWS: readonly ShotName[] = ['rooms', 'exam', 'devices', 'websites']
const PARTS: readonly ShotName[] = ['setup', 'licence', 'create-room', 'installer', 'enrolled']

type Props = {
  locale: Locale
  name: ShotName
  alt: string
  sizes?: string
  zoom?: boolean
  className?: string
}

export function Shot({ locale, name, alt, sizes, zoom, className }: Props) {
  const [width, height] = screens[locale][name]
  const base = `/media/screens/${locale}/${name}`
  const common = { width, height, alt, loading: 'lazy' as const, decoding: 'async' as const, className: styles.img }

  let img
  let full
  if (WINDOWS.includes(name)) {
    full = `${base}-2400.webp`
    img = (
      <img
        {...common}
        src={`${base}-1280.webp`}
        srcSet={`${base}-1280.webp 1280w, ${full} 2400w`}
        sizes={sizes ?? '(min-width: 84rem) 78rem, 100vw'}
      />
    )
  } else if (PARTS.includes(name)) {
    full = `${base}-2x.webp`
    img = <img {...common} src={`${base}-1x.webp`} srcSet={`${base}-1x.webp 1x, ${full} 2x`} />
  } else {
    full = `${base}-1x.webp`
    img = <img {...common} src={full} />
  }

  return (
    <figure className={[styles.shot, className].filter(Boolean).join(' ')} style={{ maxWidth: `${width}px` }}>
      {zoom ? (
        <a href={full} target="_blank" rel="noopener" className={styles.zoom}>
          {img}
        </a>
      ) : (
        img
      )}
    </figure>
  )
}
