import { Cloud, FileText, Image, Keyboard, TabletSmartphone, Webcam } from 'lucide-react'
import { useI18n } from '../i18n'
import styles from './Limits.module.css'

// In the dictionaries' order: devices, webcam, screenshots, keystrokes, cloud, exam content.
const MARKS = [TabletSmartphone, Webcam, Image, Keyboard, Cloud, FileText]

export function Limits() {
  const { t } = useI18n()

  return (
    <section className={`section ${styles.limits}`}>
      <div className={`shell ${styles.grid}`}>
        <h2 className="h-xl">{t.limits.title}</h2>
        <ul className={styles.list}>
          {t.limits.items.map((item, i) => {
            const Mark = MARKS[i % MARKS.length]
            return (
              <li key={item} className={styles.item}>
                <span className={styles.mark} aria-hidden="true">
                  <Mark size={22} strokeWidth={1.5} />
                </span>
                <span className={styles.text}>{item}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
