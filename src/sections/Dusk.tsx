import { useI18n } from '../i18n'
import { Button } from '../components/Button'
import styles from './Dusk.module.css'

export function Dusk() {
  const { t, href } = useI18n()

  return (
    <section className={styles.dusk} data-deep data-sky="dusk">
      <div className={`shell ${styles.body}`}>
        <h2 className={`h-2xl ${styles.title}`}>{t.cta.title}</h2>
        <p className="lede">{t.cta.body}</p>
        <div className={styles.actions}>
          <Button to={href('pilot')}>{t.cta.primary}</Button>
          <Button to={href('pricing')} tone="link">
            {t.cta.secondary}
          </Button>
        </div>
      </div>
    </section>
  )
}
