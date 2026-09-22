import { lazy, Suspense } from 'react'
import { useI18n } from '../i18n'
import { useRichScenes } from '../lib/useCapability'
import { Button } from '../components/Button'
import { SplitWords } from '../components/SplitWords'
import styles from './Hero.module.css'

const OrbitScene = lazy(() =>
  import('../three/OrbitScene').then((m) => ({ default: m.OrbitScene })),
)

export function Hero() {
  const { t, href } = useI18n()
  const rich = useRichScenes()

  return (
    <section className={styles.hero} data-deep>
      <div className={styles.stage}>
        <picture className={styles.poster} data-hidden={rich ? '' : undefined}>
          <source srcSet="/media/hero-poster.avif" type="image/avif" />
          <source srcSet="/media/hero-poster.webp" type="image/webp" />
          <img src="/media/hero-poster.webp" alt="" fetchPriority="high" decoding="async" />
        </picture>

        {rich ? (
          <Suspense fallback={null}>
            <OrbitScene />
          </Suspense>
        ) : null}

        <div className={styles.vignette} aria-hidden="true" />
      </div>

      <div className={styles.body}>
        <div className="shell">
          <p className={`eyebrow ${styles.eyebrow}`}>{t.hero.eyebrow}</p>

          <h1 className={styles.title}>
            <SplitWords text={t.hero.title} delay={160} step={72} />
          </h1>

          <p className={styles.lede}>{t.hero.lede}</p>

          <div className={styles.actions}>
            <Button to={href('pilot')} size="lg">
              {t.hero.primary}
            </Button>
            <Button to={href('pricing')} size="lg" tone="ghost">
              {t.hero.secondary}
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <dl className="shell-wide">
          {t.hero.stats.map((stat, i) => (
            <div key={stat.label} className={styles.stat} style={{ animationDelay: `${900 + i * 110}ms` }}>
              <dt className={`num ${styles.value}`}>
                {stat.value}
                {stat.unit ? <span className={styles.unit}> {stat.unit}</span> : null}
              </dt>
              <dd className={styles.label}>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
