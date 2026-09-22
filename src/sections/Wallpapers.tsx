import { useI18n } from '../i18n'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import styles from './Wallpapers.module.css'

const SHOTS = [1, 2, 3, 4] as const

export function Wallpapers() {
  const { t } = useI18n()

  return (
    <section className="section" data-deep>
      <div className="shell">
        <SectionHead
          eyebrow={t.wallpapers.eyebrow}
          title={t.wallpapers.title}
          lede={t.wallpapers.body}
        />
      </div>

      <div className={`shell-wide ${styles.strip}`}>
        {SHOTS.map((n, i) => (
          <Reveal key={n} delay={i * 90} className={styles.frame} variant="fade">
            <picture>
              <source
                srcSet={`/media/wall-${n}-800.avif 800w, /media/wall-${n}-1600.avif 1600w`}
                sizes="(min-width: 62rem) 24vw, (min-width: 40rem) 46vw, 88vw"
                type="image/avif"
              />
              <source
                srcSet={`/media/wall-${n}-800.webp 800w, /media/wall-${n}-1600.webp 1600w`}
                sizes="(min-width: 62rem) 24vw, (min-width: 40rem) 46vw, 88vw"
                type="image/webp"
              />
              <img
                src={`/media/wall-${n}-800.webp`}
                alt={t.wallpapers.alt[i] ?? ''}
                loading="lazy"
                decoding="async"
                width={1600}
                height={896}
              />
            </picture>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
