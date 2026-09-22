import { useI18n } from '../i18n'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import styles from './FinalCta.module.css'

export function FinalCta() {
  const { t, href } = useI18n()

  return (
    <section className={`section ${styles.cta}`} data-deep>
      <picture className={styles.plate}>
        <source srcSet="/media/wall-4-1600.avif" type="image/avif" />
        <source srcSet="/media/wall-4-1600.webp" type="image/webp" />
        <img src="/media/wall-4-1600.webp" alt="" loading="lazy" decoding="async" />
      </picture>
      <div className={styles.veil} aria-hidden="true" />

      <div className={`shell ${styles.body}`}>
        <Reveal as="p" className="eyebrow">
          {t.cta.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={80} className={styles.title}>
          {t.cta.title}
        </Reveal>
        <Reveal as="p" delay={150} className={styles.lede}>
          {t.cta.body}
        </Reveal>
        <Reveal delay={220} className={styles.actions}>
          <Button to={href('pilot')} size="lg">
            {t.cta.primary}
          </Button>
          <Button to={href('pricing')} size="lg" tone="ghost">
            {t.cta.secondary}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
