import { useI18n } from '../i18n'
import { Button } from '../components/Button'
import { Seam } from '../components/Seam'
import styles from './Hero.module.css'

export function Hero() {
  const { t, href } = useI18n()

  return (
    <section className={styles.hero} data-deep data-sky="dawn">
      <div className={`shell ${styles.body}`}>
        <h1 className={styles.title}>{t.hero.title}</h1>
        <p className={styles.lede}>{t.hero.lede}</p>
        <div className={styles.actions}>
          <Button to={href('pilot')}>{t.hero.primary}</Button>
          <Button to={href('pricing')} tone="link">
            {t.hero.secondary}
          </Button>
        </div>
      </div>
      <Seam kind="rise" at="bottom" />
    </section>
  )
}
